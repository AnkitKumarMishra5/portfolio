import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { person } from "@/lib/data";

export const alt =
  "Ankit Kumar Mishra, Engineering Lead and Full-Stack Engineer across FinTech, RegTech, KYC and compliance, and LLM systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "assets/og-fonts", file));

export default async function OpengraphImage() {
  const [regular, medium, semibold, mono, serifItalic, photo] = await Promise.all([
    font("Geist-Regular.woff"),
    font("Geist-Medium.woff"),
    font("Geist-SemiBold.woff"),
    font("GeistMono-Regular.woff"),
    font("InstrumentSerif-Italic.woff"),
    readFile(join(process.cwd(), "public", person.photo.replace(/^\//, ""))),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#050810",
          backgroundImage:
            "radial-gradient(620px circle at 84% 50%, rgba(47,107,255,0.14), transparent 70%)",
          padding: "64px 72px",
          fontFamily: "Geist",
          color: "#e9eef8",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 640,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Geist Mono",
              fontSize: 16,
              letterSpacing: "0.2em",
              color: "#7a89a4",
            }}
          >
            ANKITKUMARMISHRA.IS-A.DEV
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontWeight: 600,
                fontSize: 94,
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              Ankit Kumar
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Instrument Serif",
                fontStyle: "italic",
                fontSize: 122,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#7fb0ff",
                marginTop: 2,
              }}
            >
              Mishra
            </div>
            <div
              style={{
                display: "flex",
                fontWeight: 500,
                fontSize: 30,
                letterSpacing: "-0.01em",
                color: "#c3cde0",
                marginTop: 26,
              }}
            >
              Engineering Lead · Full-Stack Engineer
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid rgba(148,176,232,0.16)",
              paddingTop: 22,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Geist Mono",
                fontSize: 17,
                letterSpacing: "0.12em",
                color: "#a4b1c8",
              }}
            >
              FINTECH
              <span style={{ color: "#2d69fd", margin: "0 12px" }}>·</span>
              REGTECH
              <span style={{ color: "#2d69fd", margin: "0 12px" }}>·</span>
              KYC &amp; COMPLIANCE
              <span style={{ color: "#2d69fd", margin: "0 12px" }}>·</span>
              LLM SYSTEMS
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 19,
                color: "#7a89a4",
                marginTop: 12,
              }}
            >
              7+ years · {person.role} · 1,000+ developers mentored
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            position: "relative",
            marginLeft: "auto",
            width: 360,
            height: 502,
            borderRadius: 28,
            overflow: "hidden",
            border: "1px solid rgba(148,176,232,0.18)",
            background: "#0f1626",
          }}
        >
          <img
            src={photoSrc}
            width={360}
            height={502}
            alt=""
            style={{ width: 360, height: 502, objectFit: "cover", objectPosition: "50% 30%" }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 280,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "0 26px 24px",
              backgroundImage:
                "linear-gradient(to top, rgba(5,8,16,0.94) 0%, rgba(5,8,16,0.55) 45%, rgba(5,8,16,0) 100%)",
            }}
          >
            <div style={{ display: "flex", fontWeight: 500, fontSize: 21 }}>
              {person.location}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Geist Mono",
                fontSize: 13,
                letterSpacing: "0.14em",
                color: "#a4b1c8",
                marginTop: 6,
              }}
            >
              REMOTE-FIRST · US, UK, EU
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
        { name: "Instrument Serif", data: serifItalic, weight: 400, style: "italic" },
      ],
    }
  );
}
