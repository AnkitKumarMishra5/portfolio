type Variant = "grid" | "dots" | "rays";
type Fade = "left" | "right" | "center" | "top";

const fadeClass: Record<Fade, string> = {
  left: "tex-fade-l",
  right: "tex-fade-r",
  center: "tex-fade-c",
  top: "tex-fade-t",
};

export function SectionTexture({
  variant = "grid",
  fade = "center",
  glows = [],
  opacity = 1,
}: {
  variant?: Variant;
  fade?: Fade;
  glows?: { className: string; color?: string; delay?: string }[];
  opacity?: number;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute inset-0 tex-${variant} ${fadeClass[fade]}`}
        style={{ opacity }}
      />
      {glows.map((g, i) => (
        <span
          key={i}
          className={`tex-glow ${g.className}`}
          style={{
            background: `radial-gradient(circle, ${g.color ?? "var(--glow-a)"}, transparent 70%)`,
            animationDelay: g.delay,
          }}
        />
      ))}
    </div>
  );
}
