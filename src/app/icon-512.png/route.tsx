import { ImageResponse } from "next/og";
import { Mark, photoSrc } from "@/lib/mark";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(<Mark size={512} src={await photoSrc()} />, { width: 512, height: 512 });
}
