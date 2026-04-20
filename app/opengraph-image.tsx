import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ProNEET — Small-batch NEET & JEE coaching, Jaipur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37, 99, 235, 0.35), transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-240px",
            left: "-160px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(249, 115, 22, 0.3), transparent 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "white",
              display: "flex",
            }}
          >
            Pro<span style={{ color: "#2563EB" }}>NEET</span>
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.55)",
              paddingTop: "8px",
              display: "flex",
            }}
          >
            Small-batch NEET &amp; JEE coaching · Jaipur
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "920px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex" }}>20+ years of Physics.</span>
            <span
              style={{
                background:
                  "linear-gradient(90deg, #60A5FA 0%, #F97316 100%)",
                backgroundClip: "text",
                color: "transparent",
                display: "flex",
              }}
            >
              Taught the way you think.
            </span>
          </div>

          <div
            style={{
              fontSize: "24px",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "840px",
              display: "flex",
            }}
          >
            Neeraj Gupta teaches Physics. Vivek Patidar teaches Chemistry.
            30-seat batches. Mansarovar, Jaipur.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "20px",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          <div style={{ display: "flex" }}>1000+ NEET / AIIMS / IIT selections</div>
          <div
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "2px",
              background: "rgba(255,255,255,0.25)",
              display: "flex",
            }}
          />
          <div style={{ display: "flex" }}>Ex-Bansal · Narayana · Excel Physics</div>
          <div
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "2px",
              background: "rgba(255,255,255,0.25)",
              display: "flex",
            }}
          />
          <div style={{ display: "flex" }}>proneetphysics.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
