import { ImageResponse } from "next/og";
import { MARK_BG, Mark, photoSrc } from "@/lib/mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    <Mark size={180} src={await photoSrc()} padding={0.08} background={MARK_BG} />,
    { ...size }
  );
}
