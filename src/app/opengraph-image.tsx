import { ImageResponse } from "next/og";
import { person } from "@/lib/data";

export const alt =
  "Ankit Kumar Mishra, Engineering Lead and Full-Stack Engineer";
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
          background: "#050810",
          backgroundImage:
            "radial-gradient(900px circle at 6% 0%, rgba(47,107,255,0.28), transparent 58%), radial-gradient(760px circle at 100% 15%, rgba(46,230,168,0.16), transparent 55%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#2f6bff",
              color: "#ffffff",
              fontSize: 19,
              fontWeight: 700,
            }}
          >
            AK
          </div>
          <div style={{ display: "flex", color: "#a4b1c8", fontSize: 22 }}>
            {person.headline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#e9eef8",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Ankit Kumar Mishra
          </div>
          <div
            style={{
              display: "flex",
              color: "#7fb0ff",
              fontSize: 30,
              marginTop: 18,
              letterSpacing: "-0.02em",
            }}
          >
            6+ years shipping production systems end to end.
          </div>
          <div
            style={{
              display: "flex",
              color: "#8e9bb4",
              fontSize: 23,
              marginTop: 12,
            }}
          >
            TypeScript, Node.js, React, PostgreSQL, AWS. Payments, billing, KYC, LLM systems.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            color: "#6d7c97",
            fontSize: 21,
            borderTop: "1px solid rgba(148,176,232,0.16)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex" }}>6+ years</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>75-80% faster APIs</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>1,000+ developers mentored</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
