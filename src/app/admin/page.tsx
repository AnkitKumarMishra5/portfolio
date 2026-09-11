import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adminAllowed } from "@/lib/analytics/admin";
import { PERSISTENT_IDS } from "@/lib/analytics/identity";
import { REMOTE } from "@/lib/analytics/store";
import {
  RANGES,
  type Range,
  type Summary,
  type Tally,
  fmtSeconds,
  isRange,
  summarize,
} from "@/lib/analytics/summary";
import { PurgeButton } from "./PurgeButton";
import { AutoRefresh } from "./AutoRefresh";
import { IndexNowButton } from "./IndexNowButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Usage",
  robots: { index: false, follow: false, noarchive: true },
  referrer: "no-referrer",
};

const IST = "Asia/Kolkata";
const when = (t: string) =>
  new Date(t).toLocaleString("en-IN", { timeZone: IST, day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: false });
const ago = (t: string) => {
  const min = Math.round((Date.now() - Date.parse(t)) / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
};

function Tile({ value, label, note }: { value: React.ReactNode; label: string; note?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-4">
      <p className="text-[26px] font-semibold leading-none tracking-[-0.03em] text-ink">{value}</p>
      <p className="mt-2 text-[12px] leading-snug text-ink-3">{label}</p>
      {note ? <p className="mono mt-1 text-[10.5px] text-ink-4">{note}</p> : null}
    </div>
  );
}

function Bars({ rows, empty = "Nothing in this period." }: { rows: Tally; empty?: string }) {
  if (!rows.length) return <p className="text-[13px] text-ink-4">{empty}</p>;
  const total = rows.reduce((n, [, v]) => n + v, 0);
  return (
    <div className="space-y-1.5">
      {rows.map(([label, n]) => (
        <div key={label} className="flex items-center gap-3">
          <span className="w-40 truncate text-[12.5px] text-ink-2" title={label}>
            {label}
          </span>
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-3">
            <i
              className="block h-full rounded-full"
              style={{ width: `${Math.max(3, Math.round((n / Math.max(total, 1)) * 100))}%`, background: "linear-gradient(90deg, var(--accent), var(--cyan))" }}
            />
          </span>
          <span className="mono w-14 text-right text-[12px] text-ink">
            {n} <span className="text-ink-4">{Math.round((n / Math.max(total, 1)) * 100)}%</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function Panel({ title, hint, children, className = "" }: { title: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-surface/40 p-5 ${className}`}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="label text-[10px]">{title}</h2>
        {hint ? <p className="text-[11.5px] text-ink-4">{hint}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" | "bad" | "accent" }) {
  const cls = {
    neutral: "border-line-2 text-ink-3",
    good: "border-success/40 bg-success-dim text-success-ink",
    warn: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    bad: "border-rose-400/40 bg-rose-400/10 text-rose-300",
    accent: "border-accent/40 bg-accent-dim text-accent-ink",
  }[tone];
  return <span className={`mono inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-[10.5px] ${cls}`}>{children}</span>;
}

const STANDING_TONE: Record<string, "neutral" | "good" | "warn" | "bad" | "accent"> = {
  contact: "good",
  resume: "good",
  work: "accent",
  asked: "accent",
  returned: "accent",
  engaged: "neutral",
  bounced: "warn",
};
const KIND_TONE: Record<string, "neutral" | "good" | "warn" | "bad" | "accent"> = {
  search: "good",
  ai: "accent",
  preview: "warn",
  seo: "neutral",
  other: "neutral",
};

function vitalTone(key: string, v: number | null): "neutral" | "good" | "warn" | "bad" {
  if (v === null) return "neutral";
  const [good, poor] = { lcp: [2500, 4000], cls: [0.1, 0.25], inp: [200, 500], fcp: [1800, 3000], ttfb: [800, 1800] }[key] || [Infinity, Infinity];
  return v <= good ? "good" : v <= poor ? "warn" : "bad";
}
const fmtVital = (key: string, v: number | null) => (v === null ? "—" : key === "cls" ? v.toFixed(3) : v >= 1000 ? `${(v / 1000).toFixed(2)}s` : `${Math.round(v)}ms`);

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  const sp = await searchParams;
  const token = typeof sp.token === "string" ? sp.token : "";
  if (!adminAllowed(token || null)) notFound();

  const range: Range = isRange(sp.range) ? sp.range : "month";
  const s: Summary = await summarize(range);
  const t = s.totals;
  const qs = (r: string) => `?range=${r}${token ? `&token=${encodeURIComponent(token)}` : ""}`;
  const peakDay = Math.max(1, ...s.perDay.map((d) => d.visits));
  const peakHour = Math.max(1, ...s.hours);
  const th = "px-3 pb-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-4 whitespace-nowrap border-b border-line-2";
  const td = "px-3 py-2 align-top border-b border-line text-[12.5px] text-ink-2";

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="label text-[10px]">Usage</p>
          <h1 className="h-display mt-3 text-[clamp(2rem,4.6vw,3rem)] text-ink">Who is reading, and from where.</h1>
          <p className="mono mt-3 text-[11.5px] text-ink-4">
            generated {when(s.generatedAt)} IST · {t.events} events in range ·{" "}
            {REMOTE ? "stored in Redis" : "in memory only: set UPSTASH_REDIS_REST_URL and _TOKEN to keep history across deploys"}
            {PERSISTENT_IDS ? " · persistent ids on" : " · daily-rotating ids"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <nav className="flex flex-wrap gap-1 rounded-full border border-line-2 bg-surface/50 p-1">
            {(Object.keys(RANGES) as Range[]).map((r) => (
              <a
                key={r}
                href={qs(r)}
                aria-current={r === range ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-[12.5px] transition-colors ${r === range ? "bg-accent text-on-accent" : "text-ink-3 hover:text-ink"}`}
              >
                {RANGES[r].label}
              </a>
            ))}
          </nav>
          <AutoRefresh />
          <IndexNowButton token={token} />
          <a href={`/api/admin/stats${qs(range)}`} className="mono rounded-full border border-line-2 px-3.5 py-1.5 text-[11.5px] text-ink-3 hover:text-ink">
            json
          </a>
          <PurgeButton token={token} />
        </div>
      </header>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
        <Tile value={t.visits} label="page views" note={`${t.today} people today · ${t.lastHour} in the last hour`} />
        <Tile value={t.people} label="people" note={`${t.returning} came back`} />
        <Tile value={t.medianSeconds === null ? "—" : fmtSeconds(t.medianSeconds)} label="median time on page" />
        <Tile value={t.medianScroll === null ? "—" : `${t.medianScroll}%`} label="median scroll depth" note={`${t.bouncePct}% bounced`} />
        <Tile value={t.contacted} label="made contact" note={`email, LinkedIn or X · ${t.conversionPct}% of people did something`} />
        <Tile value={t.tookResume} label="took the resume" note={`${t.resumeDownloads} opened the PDF · ${t.resumeViews} read the page`} />
        <Tile value={t.asks} label="questions asked" note={`${t.emailClicks} email clicks · ${t.linkedinClicks} LinkedIn`} />
        <Tile value={t.openedWork} label="opened the work" note={`${t.projectClicks} live demos · ${t.githubClicks} source`} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel title="Trend" hint="page views per day, up to 90 days" className="lg:col-span-2">
          {s.perDay.length ? (
            <>
              <div className="flex h-24 items-end gap-[3px] border-b border-line px-0.5">
                {s.perDay.map((d) => (
                  <div
                    key={d.day}
                    title={`${d.day}: ${d.visits} views, ${d.people} people, ${d.conversions} clicks, ${d.crawls} crawler hits`}
                    className="relative flex-1 rounded-t-sm"
                    style={{ height: `${Math.max(2, Math.round((d.visits / peakDay) * 100))}%`, background: "linear-gradient(180deg, var(--accent), var(--violet))", minWidth: 3 }}
                  />
                ))}
              </div>
              <div className="mono mt-2 flex justify-between text-[10.5px] text-ink-4">
                <span>{s.perDay[0].day}</span>
                <span>{s.perDay[s.perDay.length - 1].day}</span>
              </div>
            </>
          ) : (
            <p className="text-[13px] text-ink-4">No visits recorded yet.</p>
          )}
        </Panel>
        <Panel title="Hour of day" hint="IST">
          <div className="flex h-24 items-end gap-[2px] border-b border-line">
            {s.hours.map((n, h) => (
              <div key={h} title={`${String(h).padStart(2, "0")}:00 · ${n}`} className="flex-1 rounded-t-sm bg-accent/70" style={{ height: `${Math.max(2, Math.round((n / peakHour) * 100))}%` }} />
            ))}
          </div>
          <div className="mono mt-2 flex justify-between text-[10.5px] text-ink-4">
            <span>00</span>
            <span>06</span>
            <span>12</span>
            <span>18</span>
            <span>23</span>
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Funnel" hint="people, each step a subset of the one above" className="lg:col-span-2">
          <div className="space-y-2.5">
            {s.funnel.map((f) => (
              <div key={f.step} className="flex items-center gap-3">
                <span className="w-64 truncate text-[12.5px] text-ink-2 sm:w-80">{f.step}</span>
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                  <i className="block h-full rounded-full bg-accent" style={{ width: `${Math.max(f.people ? 3 : 0, f.pct)}%` }} />
                </span>
                <span className="mono w-20 text-right text-[12px] text-ink">
                  {f.people} <span className="text-ink-4">{f.pct}%</span>
                </span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Core Web Vitals" hint="75th percentile of real visits">
          <div className="grid grid-cols-3 gap-2">
            {(["lcp", "inp", "cls", "fcp", "ttfb"] as const).map((k) => (
              <div key={k} className="rounded-xl border border-line p-3">
                <p className="mono text-[10px] uppercase text-ink-4">{k}</p>
                <p className="mt-1 text-[16px] font-medium text-ink">{fmtVital(k, s.vitals[k])}</p>
                <div className="mt-1.5">
                  <Pill tone={vitalTone(k, s.vitals[k])}>{s.vitals[k] === null ? "no data" : vitalTone(k, s.vitals[k]) === "good" ? "good" : vitalTone(k, s.vitals[k]) === "warn" ? "improve" : "poor"}</Pill>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Panel title="Channel" hint="where visits came from">
          <Bars rows={s.channels} />
        </Panel>
        <Panel title="Source" hint="the site, or a link tag when one is present">
          <Bars rows={s.sources} />
        </Panel>
        <Panel title="Referrer" hint="as the browser reported it">
          <Bars rows={s.referrers} empty="No referrers: direct visits, or links that strip the Referer." />
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Panel title="Country">
          <Bars rows={s.countries} />
        </Panel>
        <Panel title="City" hint="from the host's geo header">
          <Bars rows={s.cities} />
        </Panel>
        <Panel title="Sections reached" hint="people who scrolled a section into view">
          <Bars rows={s.sections} />
        </Panel>
        <Panel title="Actions" hint="outbound clicks">
          <Bars rows={s.actions} empty="No clicks yet." />
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Panel title="Landing page">
          <Bars rows={s.landing} />
        </Panel>
        <Panel title="Projects clicked" hint="live and source, by project">
          <Bars rows={s.projects} empty="No project clicks yet." />
        </Panel>
        <Panel title="Device">
          <Bars rows={s.devices} />
          <div className="mt-4">
            <Bars rows={s.os} />
          </div>
        </Panel>
        <Panel title="Browser">
          <Bars rows={s.browsers} />
          <div className="mt-4">
            <Bars rows={s.languages} />
          </div>
        </Panel>
      </div>

      <Panel title="Crawlers" hint="search engines, AI assistants and link previews that fetched a page" className="mt-4">
        {s.crawlers.length ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Bot</th>
                  <th className={th}>Kind</th>
                  <th className={th}>Hits</th>
                  <th className={th}>Last seen</th>
                  <th className={th}>Paths</th>
                </tr>
              </thead>
              <tbody>
                {s.crawlers.map((c) => (
                  <tr key={c.bot}>
                    <td className={`${td} font-medium text-ink`}>{c.bot}</td>
                    <td className={td}>
                      <Pill tone={KIND_TONE[c.kind] || "neutral"}>{c.kind}</Pill>
                    </td>
                    <td className={`${td} mono`}>{c.hits}</td>
                    <td className={`${td} whitespace-nowrap`} title={when(c.last)}>
                      {ago(c.last)}
                    </td>
                    <td className={`${td} mono text-[11.5px]`}>{c.paths.map(([p, n]) => `${p} ×${n}`).join("  ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[13px] text-ink-4">
            No crawler hits recorded{REMOTE ? " in this period." : ". Crawler hits are written from the edge and need Redis to reach this page."}
          </p>
        )}
      </Panel>

      <Panel title="Questions asked" hint="typed into Ask the page or the source explorer" className="mt-4">
        {s.questions.length ? (
          <ul className="divide-y divide-line">
            {s.questions.map((q, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-2.5">
                <span className="mono w-24 shrink-0 text-[11px] text-ink-4" title={when(q.t)}>
                  {ago(q.t)}
                </span>
                <span className="mono text-[11px] text-accent-ink">{q.person}</span>
                <span className="flex-1 text-[13.5px] text-ink">“{q.question}”</span>
                <span className="flex gap-1.5">
                  <Pill>{q.source}</Pill>
                  {q.ok ? null : <Pill tone="warn">no model</Pill>}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[13px] text-ink-4">Nobody has asked anything yet.</p>
        )}
      </Panel>

      <Panel title="People" hint={PERSISTENT_IDS ? "same browser recognised across days" : "one pseudonym per browser per day; IPs are never stored"} className="mt-4">
        {s.people.length ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Who</th>
                  <th className={th}>Standing</th>
                  <th className={th}>Last seen</th>
                  <th className={th}>Views</th>
                  <th className={th}>Time</th>
                  <th className={th}>Scroll</th>
                  <th className={th}>From</th>
                  <th className={th}>Where</th>
                  <th className={th}>Device</th>
                  <th className={th}>Did</th>
                </tr>
              </thead>
              <tbody>
                {s.people.slice(0, 200).map((p) => (
                  <tr key={p.id} id={p.id}>
                    <td className={`${td} mono text-accent-ink`}>{p.id}</td>
                    <td className={td}>
                      <Pill tone={STANDING_TONE[p.standing.key]}>{p.standing.label}</Pill>
                    </td>
                    <td className={`${td} whitespace-nowrap`} title={`first ${when(p.first)}`}>
                      {when(p.last)}
                    </td>
                    <td className={`${td} mono`}>
                      {p.visits}
                      {p.days > 1 ? <span className="text-ink-4"> · {p.days}d</span> : null}
                    </td>
                    <td className={`${td} mono`}>{p.seconds ? fmtSeconds(p.seconds) : "—"}</td>
                    <td className={`${td} mono`}>{p.scrollPct ? `${p.scrollPct}%` : "—"}</td>
                    <td className={td}>
                      <span className="text-ink">{p.channel || "—"}</span>
                      {p.source && p.source !== "direct" ? <span className="block text-[11px] text-ink-4">{p.source}</span> : null}
                    </td>
                    <td className={td}>{p.place || "—"}</td>
                    <td className={td}>
                      {p.device || "—"}
                      {p.client ? <span className="block text-[11px] text-ink-4">{p.client}</span> : null}
                    </td>
                    <td className={`${td} max-w-[260px]`}>
                      {p.actions.length || p.asked ? (
                        <span className="text-[12px]">
                          {p.actions.join(", ")}
                          {p.asked ? `${p.actions.length ? ", " : ""}asked ${p.asked}` : ""}
                        </span>
                      ) : p.sections.length ? (
                        <span className="text-[11.5px] text-ink-4">read {p.sections.join(", ")}</span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[13px] text-ink-4">No visitors recorded yet.</p>
        )}
      </Panel>

      <Panel title="Activity" hint="newest first, up to 400 events" className="mt-4">
        {s.activity.length ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>When</th>
                  <th className={th}>Who</th>
                  <th className={th}>What</th>
                  <th className={th}>Page</th>
                  <th className={th}>Where</th>
                  <th className={th}>From</th>
                  <th className={th}>Device</th>
                </tr>
              </thead>
              <tbody>
                {s.activity.map((a) => (
                  <tr key={a.id}>
                    <td className={`${td} whitespace-nowrap`} title={a.t}>
                      {when(a.t)}
                    </td>
                    <td className={`${td} mono`}>
                      {a.person ? (
                        <a href={`#${a.person}`} className="text-accent-ink hover:underline">
                          {a.person}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className={`${td} text-ink`}>{a.what}</td>
                    <td className={`${td} mono`}>{a.path || "—"}</td>
                    <td className={td}>{a.place || "—"}</td>
                    <td className={td}>{a.source || "—"}</td>
                    <td className={`${td} text-[11.5px]`}>{a.device || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[13px] text-ink-4">Nothing yet.</p>
        )}
      </Panel>

      <p className="mono mt-10 text-[11px] text-ink-4">
        Pseudonyms starting V- rotate daily and cannot be followed across days. Nothing here identifies a person; see /privacy for what visitors are told.
      </p>
    </main>
  );
}
