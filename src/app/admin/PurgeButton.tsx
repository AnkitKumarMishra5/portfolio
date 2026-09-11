"use client";

import { useState } from "react";

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
    <button
      onClick={run}
      disabled={state === "busy"}
      className="mono rounded-full border border-rose-400/40 bg-rose-400/10 px-3.5 py-1.5 text-[11.5px] text-rose-300 transition-colors hover:border-rose-400/70 hover:bg-rose-400/20 disabled:opacity-50"
    >
      {state === "busy" ? "wiping…" : state === "done" ? "wiped" : state === "failed" ? "failed, retry" : "wipe all data"}
    </button>
  );
}
