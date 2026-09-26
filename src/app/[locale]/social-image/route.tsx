import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/brand-mark";

export const runtime = "nodejs";

export async function GET() {
  const font = await readFile(join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"));
  return new ImageResponse(
    <div dir="ltr" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "70px 88px", background: "#FAF7F2", color: "#0F3D32", fontFamily: "Geist" }}>
      <div style={{ width: "57%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 34, fontSize: 34, fontWeight: 400, letterSpacing: -2 }}><BrandMark size={46} /><span>Dopixa</span></div>
        <div style={{ width: 84, height: 5, borderRadius: 4, background: "#FF7F5E" }} />
      </div>
      <div style={{ width: 330, height: 330, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 175, background: "#E7EEE7" }}>
        <div style={{ position: "absolute", width: 270, height: 270, border: "1px solid #B7C9BE", borderRadius: 140 }} />
        <div style={{ position: "absolute", width: 205, height: 205, border: "1px solid #87A994", borderRadius: 110 }} />
        <div style={{ width: 92, height: 92, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 28, background: "#FAF7F2" }}><BrandMark size={76} /></div>
        <div style={{ position: "absolute", width: 26, height: 26, right: 30, bottom: 39, borderRadius: 14, background: "#FF7F5E" }} />
      </div>
    </div>,
    { width: 1200, height: 630, fonts: [{ name: "Geist", data: font, weight: 400 }] },
  );
}
