import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { locales } from "@/lib/content";

export const alt = "Dopixa — Custom software for modern business operations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage() {
  const font = await readFile(join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"));
  return new ImageResponse(
    <div dir="ltr" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "70px 88px", background: "#FAF7F2", color: "#0F3D32", fontFamily: "Geist" }}>
      <div style={{ width: "62%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 74, fontSize: 31, fontWeight: 400, letterSpacing: -2 }}><span style={{ width: 34, height: 34, display: "flex", borderRadius: 10, background: "#0F3D32", borderBottomRightRadius: 3 }} /><span>Dopixa</span></div>
        <div style={{ fontSize: 60, lineHeight: 1.12, fontWeight: 400, letterSpacing: -3 }}>Custom software for modern business.</div>
        <div style={{ marginTop: 25, color: "#66736D", fontSize: 21 }}>Türkiye · Arabic-speaking markets</div>
      </div>
      <div style={{ width: 325, height: 325, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 175, background: "#E7EEE7" }}>
        <div style={{ position: "absolute", width: 265, height: 265, border: "1px solid #B7C9BE", borderRadius: 140 }} />
        <div style={{ position: "absolute", width: 195, height: 195, border: "1px dashed #87A994", borderRadius: 100 }} />
        <div style={{ width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 30, background: "#0F3D32", color: "white", fontSize: 50, fontWeight: 400 }}>D</div>
        <div style={{ position: "absolute", width: 28, height: 28, right: 30, bottom: 39, borderRadius: 14, background: "#FF7F5E" }} />
      </div>
    </div>,
    { ...size, fonts: [{ name: "Geist", data: font, weight: 400 }] },
  );
}
