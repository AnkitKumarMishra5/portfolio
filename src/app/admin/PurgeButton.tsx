"use client";

import { useState } from "react";

export function PurgeButton({ token }: { token: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "failed">("idle");
  const run = async () => {
    if (!confirm("Delete every recorded event? This cannot be undone.")) return;
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
    <button
      onClick={run}
      disabled={state === "busy"}
      className="mono rounded-full border border-line-2 px-3.5 py-1.5 text-[11.5px] text-ink-3 transition-colors hover:border-line-3 hover:text-ink disabled:opacity-50"
    >
      {state === "busy" ? "clearing…" : state === "done" ? "cleared" : state === "failed" ? "failed, retry" : "start over"}
    </button>
  );
}
