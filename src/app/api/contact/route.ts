import { NextResponse } from "next/server";
import { checkContactRateLimit } from "@/lib/contact-rate-limit";

export const runtime = "nodejs";
const contactRecipient = "saifalomari244@gmail.com";
const contactSender = "Dopixa <onboarding@resend.dev>";
const optionalFields = new Set(["company", "phone", "budget", "locale"]);

const limits: Record<string, number> = {
  name: 120, company: 120, businessType: 80, country: 100, email: 254, phone: 80,
  workflow: 2000, improvement: 2000, timeline: 80, budget: 80, preferredLanguage: 2, locale: 2,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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
  const rateLimit = checkContactRateLimit(request);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } });
  }

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
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true }, { status: 200 });

  const fields: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    const value = body[key];
    if (value === undefined && optionalFields.has(key)) {
      fields[key] = "";
      continue;
    }
    if (typeof value !== "string" || value.length > limit) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    fields[key] = value.trim();
  }
  if ((fields.locale && !["tr", "ar"].includes(fields.locale)) || !["tr", "ar"].includes(fields.preferredLanguage)) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  if (!["name", "businessType", "country", "email", "workflow", "improvement", "timeline"].every((key) => fields[key])) return NextResponse.json({ error: "Missing required field" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return NextResponse.json({ ok: false, error: "Contact email is not configured", code: "EMAIL_NOT_CONFIGURED" }, { status: 503 });

  const message = [fields.workflow, fields.improvement].filter(Boolean).join("\n\n");
  const emailText = [
    "New project enquiry from the Dopixa website",
    "",
    `Name: ${fields.name}`,
    `Company: ${fields.company || "Not provided"}`,
    `Email: ${fields.email}`,
    `Phone / WhatsApp: ${fields.phone || "Not provided"}`,
    `Project type: ${fields.businessType}`,
    `Message:\n${message}`,
    fields.locale ? `Locale: ${fields.locale}` : null,
    `Country: ${fields.country}`,
    `Preferred timeline: ${fields.timeline}`,
    `Budget: ${fields.budget || "Not provided"}`,
    `Preferred language: ${fields.preferredLanguage}`,
  ].filter((line): line is string => line !== null).join("\n");

  try {
    const upstream = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: contactSender,
        to: [contactRecipient],
        reply_to: fields.email,
        subject: "New Dopixa project enquiry",
        text: emailText,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!upstream.ok) return NextResponse.json({ ok: false, error: "Email delivery failed", code: "EMAIL_DELIVERY_FAILED" }, { status: 502 });
    return NextResponse.json({ ok: true, message: "Contact request sent" }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Email delivery failed", code: "EMAIL_DELIVERY_FAILED" }, { status: 502 });
  }
}
