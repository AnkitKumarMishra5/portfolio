"use client";

import { useState } from "react";
import { BTN_DANGER } from "./ui";

export function PurgeButton({ token }: { token: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "failed">("idle");

  const run = async () => {
    if (!confirm("Wipe every recorded event and start from zero? This cannot be undone.")) return;
    setState("busy");
    try {
      const res = await fetch(`/api/admin/purge?token=${encodeURIComponent(token)}`, { method: "POST" });
      setState(res.ok ? "done" : "failed");
      if (res.ok) setTimeout(() => location.reload(), 600);
    } catch {
      setState("failed");
    }
  };

  return (
    <button onClick={run} disabled={state === "busy"} className={BTN_DANGER}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      </svg>
      {state === "busy" ? "Wiping" : state === "done" ? "Wiped" : state === "failed" ? "Retry" : "Wipe data"}
    </button>
  );
}
