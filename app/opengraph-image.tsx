import { ImageResponse } from "next/og";
import { generalConfig } from "@/config/general-config";

export const alt = generalConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#09090b",
        color: "#fafafa",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
          {generalConfig.name}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          {generalConfig.description}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
