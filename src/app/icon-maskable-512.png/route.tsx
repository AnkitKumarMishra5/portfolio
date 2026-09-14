import { ImageResponse } from "next/og";
import { MARK_BG, Mark, photoSrc } from "@/lib/mark";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    <Mark size={512} src={await photoSrc()} padding={0.12} background={MARK_BG} />,
    { width: 512, height: 512 }
  );
}
