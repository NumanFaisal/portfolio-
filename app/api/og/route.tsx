import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Numan Faisal";
  const subtitle = searchParams.get("subtitle") ?? "Full-Stack & AI Engineer";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0B0F",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Gradient blob */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 600,
            height: 400,
            background: "radial-gradient(ellipse, rgba(124,92,255,0.3) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#7C5CFF",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            numanfaisal.dev
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#F4F4F5",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#A1A1AA",
              fontWeight: 400,
              marginTop: 8,
            }}
          >
            {subtitle}
          </div>
        </div>
        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#71717A",
            fontSize: 16,
          }}
        >
          <span>Open to work</span>
          <span>·</span>
          <span>Full-Stack & AI</span>
          <span>·</span>
          <span>Ships fast</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
