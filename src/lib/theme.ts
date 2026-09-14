export type Theme = "light" | "dark";

type Transition = { ready: Promise<void>; finished: Promise<void> };
type Starter = (update: () => void) => Transition;

const DURATION = 900;
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
let switching = false;

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function commit(next: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

function release() {
  document.documentElement.classList.remove("theme-switching");
  switching = false;
}

export function toggleTheme() {
  if (switching) return;
  switching = true;
  const next: Theme = currentTheme() === "light" ? "dark" : "light";
  const start = (document as unknown as { startViewTransition?: Starter }).startViewTransition;

  if (!start || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    commit(next);
    requestAnimationFrame(() => requestAnimationFrame(release));
    return;
  }

  const transition = start.call(document, () => commit(next));
  transition.ready
    .then(() => {
      const from = next === "light" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
      document.documentElement.animate(
        { clipPath: [from, "inset(0 0 0 0)"] },
        { duration: DURATION, easing: EASE, pseudoElement: "::view-transition-new(root)" }
      );
    })
    .catch(() => {});
  transition.finished.then(release, release);
}
