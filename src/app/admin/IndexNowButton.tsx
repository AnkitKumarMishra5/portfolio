"use client";

import { useState } from "react";

export function IndexNowButton({ token }: { token: string }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/indexnow?token=${encodeURIComponent(token)}`, { method: "POST" });
      const data = (await res.json()) as { ok?: boolean; submitted?: number; error?: string; status?: number };
      setMsg(data.ok ? `sent ${data.submitted} URLs` : data.error || `failed (${data.status ?? res.status})`);
    } catch {
      setMsg("failed");
    } finally {
      setBusy(false);
      setTimeout(() => setMsg(null), 6000);
    }
  };

  return (
    <button
      onClick={run}
      disabled={busy}
      title="Tell Bing, Yandex, Naver and Seznam that these pages changed"
      className="mono rounded-full border border-line-2 px-3.5 py-1.5 text-[11.5px] text-ink-3 transition-colors hover:border-line-3 hover:text-ink disabled:opacity-50"
    >
      {busy ? "pinging…" : msg ?? "ping indexnow"}
    </button>
  );
}
