import { ImageResponse } from "next/og";
import { Mark } from "@/lib/mark";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(<Mark size={512} padding={0.1} />, {
    width: 512,
    height: 512,
  });
}
