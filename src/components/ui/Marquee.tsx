"use client";

import type { ReactNode } from "react";

export function Marquee({
  children,
  duration = 42,
  reverse = false,
  className = "",
  pauseOnHover = true,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={`marquee-mask relative w-full overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max ${reverse ? "reverse" : ""} ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
