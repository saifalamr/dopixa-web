import { NextResponse } from "next/server";

export const runtime = "nodejs";

const limits: Record<string, number> = {
  name: 120, company: 120, businessType: 80, country: 100, email: 254, phone: 80,
  workflow: 2000, improvement: 2000, timeline: 80, budget: 80, preferredLanguage: 2, locale: 2,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validWebhook(raw: string) {
  try {
    const url = new URL(raw);
    if (url.username || url.password || url.hash) return false;
    if (process.env.NODE_ENV !== "development" && url.protocol !== "https:") return false;
    if (["localhost", "127.0.0.1", "::1"].includes(url.hostname) || url.hostname.endsWith(".local")) return false;
    if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.)/.test(url.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

async function readBoundedJson(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16_384) {
      await reader.cancel();
      throw new Error("Request too large");
    }
    text += decoder.decode(value, { stream: true });
  }
  text += decoder.decode();
  return JSON.parse(text) as unknown;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
      if (configuredUrl ? originUrl.origin !== new URL(configuredUrl).origin : !host || originUrl.host !== host) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    } catch {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });

  let body: unknown;
  try { body = await readBoundedJson(request); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
  if (!isRecord(body)) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const fields: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    const value = body[key];
    if (typeof value !== "string" || value.length > limit) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    fields[key] = value.trim();
  }
  if (!["tr", "ar"].includes(fields.locale) || !["tr", "ar"].includes(fields.preferredLanguage)) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  if (!["name", "businessType", "country", "email", "workflow", "improvement", "timeline"].every((key) => fields[key])) return NextResponse.json({ error: "Missing required field" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  if (!webhook || !secret || !validWebhook(webhook)) return NextResponse.json({ error: "Contact delivery is not configured" }, { status: 503 });

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${secret}` },
      body: JSON.stringify(fields),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!upstream.ok) return NextResponse.json({ error: "Contact delivery failed" }, { status: 502 });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Contact delivery failed" }, { status: 502 });
  }
}
