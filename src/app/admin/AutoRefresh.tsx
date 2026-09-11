"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { BTN, BTN_ON } from "./ui";

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
    <button onClick={() => setOn((v) => !v)} aria-pressed={on} className={on ? BTN_ON : BTN}>
      <span className={`size-[7px] shrink-0 rounded-full ${on ? "live-dot bg-accent" : "bg-ink-4"}`} />
      {on ? (pending ? "Refreshing" : "Live") : "Paused"}
    </button>
  );
}
