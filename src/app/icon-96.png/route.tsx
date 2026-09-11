import { ImageResponse } from "next/og";
import { Mark } from "@/lib/mark";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(<Mark size={96} />, { width: 96, height: 96 });
}
