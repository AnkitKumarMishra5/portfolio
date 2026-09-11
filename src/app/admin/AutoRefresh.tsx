"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function AutoRefresh({ seconds = 10 }: { seconds?: number }) {
  const router = useRouter();
  const [on, setOn] = useState(true);
  const [pending, start] = useTransition();

  useEffect(() => {
    if (!on) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") start(() => router.refresh());
    }, seconds * 1000);
    return () => clearInterval(id);
  }, [on, seconds, router]);

  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      className={`mono inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11.5px] transition-colors ${
        on ? "border-accent/40 bg-accent-dim text-accent-ink" : "border-line-2 text-ink-3 hover:text-ink"
      }`}
    >
      <span className={`size-1.5 rounded-full ${on ? "live-dot bg-accent" : "bg-ink-4"}`} />
      {on ? (pending ? "refreshing" : `live · ${seconds}s`) : "paused"}
    </button>
  );
}
