import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6f8fd",
          color: "#0b1533",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          borderRadius: 14,
        }}
      >
        AK
      </div>
    ),
    { width: 64, height: 64 }
  );
}
