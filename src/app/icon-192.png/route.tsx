import { ImageResponse } from "next/og";
import { Mark, photoSrc } from "@/lib/mark";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(<Mark size={192} src={await photoSrc()} />, { width: 192, height: 192 });
}
