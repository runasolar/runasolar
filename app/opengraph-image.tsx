import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "RUNA SOLAR — Сонячні станції під ключ у Хмельницькому";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #1A2A1F 0%, #2E5D3A 55%, #234935 100%)",
          color: "#FAFAF7",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Solar panel grid emblem */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#2E5D3A",
              border: "2px solid rgba(232,179,64,0.4)",
              display: "flex",
              flexWrap: "wrap",
              padding: 8,
              gap: 3,
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 2,
                  background: "#E8B340",
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: -0.5,
              display: "flex",
              gap: 8,
            }}
          >
            <span>RUNA</span>
            <span style={{ color: "#E8B340" }}>SOLAR</span>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1,
              textTransform: "uppercase",
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
            }}
          >
            <span>Чиста,</span>
            <span>безпечна,</span>
            <span style={{ color: "#E8B340" }}>відновлювана</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(250,250,247,0.78)",
              lineHeight: 1.3,
              maxWidth: 880,
              display: "flex",
            }}
          >
            Сонячні станції, накопичувачі та ДБЖ під ключ для дому й бізнесу.
            Tier-1 обладнання · Хмельницький та область
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 40,
            paddingTop: 22,
            borderTop: "1px solid rgba(250,250,247,0.15)",
            fontSize: 22,
            color: "rgba(250,250,247,0.7)",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <span>Гарантія 25 років</span>
            <span>·</span>
            <span>Монтаж за 7 днів</span>
            <span>·</span>
            <span>Документи від нас</span>
          </div>
          <div style={{ color: "#E8B340", fontWeight: 600 }}>
            runasolar.in.ua
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
