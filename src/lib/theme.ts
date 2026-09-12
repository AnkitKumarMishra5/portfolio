export type Theme = "light" | "dark";

type Origin = { x: number; y: number };
type StartViewTransition = (update: () => void) => { ready: Promise<void> };

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function apply(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

export function toggleTheme(origin?: Origin) {
  const next: Theme = currentTheme() === "light" ? "dark" : "light";
  const root = document.documentElement;

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    apply(next);
    return;
  }

  const start = (document as unknown as { startViewTransition?: StartViewTransition }).startViewTransition;

  if (!start) {
    root.classList.add("theme-fade");
    apply(next);
    window.setTimeout(() => root.classList.remove("theme-fade"), 560);
    return;
  }

  const x = origin?.x ?? innerWidth / 2;
  const y = origin?.y ?? innerHeight / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const transition = start.call(document, () => apply(next));
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    })
    .catch(() => {});
}

export function toggleThemeFromButton() {
  const button = document.querySelector<HTMLElement>("[data-theme-toggle]");
  const rect = button?.getBoundingClientRect();
  toggleTheme(rect && rect.width ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined);
}
