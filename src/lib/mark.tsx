import type { CSSProperties } from "react";

export const MARK_BG = "#2d69fd";
export const MARK_FG = "#ffffff";

export function Mark({
  size,
  padding = 0,
  radius = 0.22,
}: {
  size: number;
  padding?: number;
  radius?: number;
}) {
  const inset = Math.round(size * padding);
  const box = size - inset * 2;
  const outer: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: padding ? MARK_BG : "transparent",
  };
  const inner: CSSProperties = {
    width: box,
    height: box,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: MARK_BG,
    color: MARK_FG,
    borderRadius: Math.round(box * radius),
    fontSize: Math.round(box * 0.47),
    fontWeight: 700,
    letterSpacing: "-0.06em",
    fontFamily: "sans-serif",
  };
  return (
    <div style={outer}>
      <div style={inner}>AK</div>
    </div>
  );
}
