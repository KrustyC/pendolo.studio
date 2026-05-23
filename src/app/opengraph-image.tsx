import { ImageResponse } from "next/og";

export const alt = "Pendolo Studio — Branding, web design and development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#F25C3D",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "60px 70px",
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: "#0D0D0D",
          letterSpacing: "-3px",
          lineHeight: 1,
          marginBottom: 24,
        }}
      >
        Pendolo Studio
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 300,
          color: "#0D0D0D",
          maxWidth: 680,
          lineHeight: 1.4,
        }}
      >
        Branding, web design and development for businesses that value a
        different point of view.
      </div>
    </div>,
    { ...size }
  );
}
