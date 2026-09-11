"use client";

import { useState } from "react";
import { BTN } from "./ui";

export function IndexNowButton({ token }: { token: string }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/indexnow?token=${encodeURIComponent(token)}`, { method: "POST" });
      const data = (await res.json()) as { ok?: boolean; submitted?: number; error?: string; status?: number };
      setMsg(data.ok ? `Sent ${data.submitted}` : data.error ? "No key set" : `Failed ${data.status ?? res.status}`);
    } catch {
      setMsg("Failed");
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
      className={BTN}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      {busy ? "Pinging" : msg ?? "IndexNow"}
    </button>
  );
}
