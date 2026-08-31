"use client";

import type { BrandIcon } from "@/lib/brandIcons";

export function BrandMark({
  icon,
  className = "size-[18px]",
}: {
  icon: BrandIcon;
  className?: string;
}) {
  if (!icon.path) {
    return (
      <span
        aria-hidden
        className={`grid shrink-0 place-items-center rounded-[5px] border border-line-2 text-[8.5px] font-semibold text-ink-3 ${className}`}
      >
        {icon.title.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="currentColor"
      role="img"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}
