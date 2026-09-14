import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { CSSProperties } from "react";
import { person } from "@/lib/data";

export const MARK_BG = "#0a0f1b";

export async function photoSrc() {
  const data = await readFile(join(process.cwd(), "public", person.photo.replace(/^\//, "")));
  return `data:image/jpeg;base64,${data.toString("base64")}`;
}

export function Mark({
  size,
  src,
  padding = 0,
  background = "transparent",
}: {
  size: number;
  src: string;
  padding?: number;
  background?: string;
}) {
  const box = size - Math.round(size * padding) * 2;
  const outer: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background,
  };
  return (
    <div style={outer}>
      <img
        src={src}
        width={box}
        height={box}
        alt=""
        style={{ width: box, height: box, borderRadius: Math.round(box * 0.22), objectFit: "cover" }}
      />
    </div>
  );
}
