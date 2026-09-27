import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAF7F2" }}>
      <div style={{ width: 148, height: 148, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 42, background: "#E9EFE9" }}>
        <BrandMark size={112} />
      </div>
    </div>,
    size,
  );
}
