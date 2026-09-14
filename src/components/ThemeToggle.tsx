"use client";

import { toggleTheme } from "@/lib/theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      data-theme-toggle
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className={`group relative grid size-9 cursor-pointer place-items-center rounded-full border border-line-2 bg-surface/40 text-ink-2 outline-none transition-[translate,scale,background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:border-line-3 hover:bg-surface-2 hover:text-ink hover:shadow-[0_0_0_4px_var(--accent-dim)] active:translate-y-0 active:scale-90 focus-visible:shadow-[0_0_0_2px_var(--bg),0_0_0_4px_var(--accent)] ${className}`}
    >
      <svg
        className="theme-icon-dark size-[15px] group-hover:rotate-45"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
      <svg
        className="theme-icon-light size-[15px] group-hover:-rotate-12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
