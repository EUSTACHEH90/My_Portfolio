import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} – ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 90,
          color: "#f6efe8",
          background: "linear-gradient(135deg, #3b1a0b 0%, #130a06 60%, #070403 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#ff6a2b" }}>{siteConfig.name}</div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 800, marginTop: 16, lineHeight: 1.05 }}>
          {siteConfig.jobTitle}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#b9a99c", marginTop: 28 }}>
          React · Next.js · Node.js
        </div>
      </div>
    ),
    size,
  );
}