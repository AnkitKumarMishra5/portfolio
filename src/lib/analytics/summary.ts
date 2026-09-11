import { readAll, type UsageEvent } from "./store";

export const RANGES = {
  day: { label: "Today", ms: 24 * 3600e3 },
  week: { label: "7 days", ms: 7 * 24 * 3600e3 },
  month: { label: "30 days", ms: 30 * 24 * 3600e3 },
  quarter: { label: "90 days", ms: 90 * 24 * 3600e3 },
  year: { label: "Year", ms: 365 * 24 * 3600e3 },
  all: { label: "All time", ms: Infinity },
} as const;
export type Range = keyof typeof RANGES;
export const isRange = (v: unknown): v is Range => typeof v === "string" && v in RANGES;

export type Tally = [string, number][];

const IST = "Asia/Kolkata";
const SESSION_GAP_MS = 30 * 60e3;

const CONTACT = new Set(["email", "linkedin", "x"]);
const RESUME = new Set(["resume_pdf", "resume_page"]);
const WORK = new Set(["project_live", "project_repo", "github"]);
const CONVERSIONS = new Set([...CONTACT, ...RESUME, ...WORK]);
export const TARGET_LABEL: Record<string, string> = {
  email: "Email",
  linkedin: "LinkedIn",
  github: "GitHub",
  x: "X",
  resume_pdf: "Resume PDF",
  resume_page: "Resume page",
  project_live: "Project, live",
  project_repo: "Project, source",
  external: "Other link",
};

function tally(rows: UsageEvent[], key: string, limit = 12): Tally {
  const counts = new Map<string, number>();
  for (const e of rows) {
    const v = e[key];
    if (typeof v === "string" && v) counts.set(v, (counts.get(v) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

const median = (arr: number[]) => (arr.length ? arr.slice().sort((a, b) => a - b)[Math.floor(arr.length / 2)] : null);
const p75 = (arr: number[]) => (arr.length ? arr.slice().sort((a, b) => a - b)[Math.floor(arr.length * 0.75)] : null);
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);
const numOf = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);
const strOf = (v: unknown) => (typeof v === "string" && v ? v : null);

export type Person = {
  id: string;
  stable: boolean;
  first: string;
  last: string;
  visits: number;
  sessions: number;
  days: number;
  seconds: number;
  scrollPct: number;
  sections: string[];
  paths: string[];
  channel: string | null;
  source: string | null;
  place: string | null;
  device: string | null;
  client: string | null;
  actions: string[];
  targets: string[];
  asked: number;
  standing: { key: string; label: string };
};

function foldPeople(list: UsageEvent[]): Person[] {
  type Acc = Omit<Person, "days" | "sections" | "paths" | "actions" | "targets" | "standing"> & {
    dayset: Set<string>;
    sectionset: Set<string>;
    pathset: Set<string>;
    actionlist: string[];
    targetlist: string[];
    lastVisitAt: number;
  };
  const by = new Map<string, Acc>();
  for (const e of list) {
    const id = strOf(e.person);
    if (!id) continue;
    let p = by.get(id);
    if (!p) {
      p = {
        id,
        stable: id.startsWith("P-"),
        first: e.t,
        last: e.t,
        visits: 0,
        sessions: 0,
        seconds: 0,
        scrollPct: 0,
        channel: null,
        source: null,
        place: null,
        device: null,
        client: null,
        asked: 0,
        dayset: new Set(),
        sectionset: new Set(),
        pathset: new Set(),
        actionlist: [],
        targetlist: [],
        lastVisitAt: 0,
      };
      by.set(id, p);
    }
    if (e.t < p.first) p.first = e.t;
    if (e.t > p.last) p.last = e.t;
    p.dayset.add(e.t.slice(0, 10));
    const at = Date.parse(e.t);
    if (e.type === "visit") {
      p.visits += 1;
      if (at - p.lastVisitAt > SESSION_GAP_MS) p.sessions += 1;
      p.lastVisitAt = at;
      p.pathset.add(strOf(e.path) || "/");
      p.channel ||= strOf(e.channel);
      p.source ||= strOf(e.source);
      p.place = [strOf(e.city), strOf(e.region), strOf(e.country)].filter(Boolean).join(", ") || p.place;
      p.device = strOf(e.device) || p.device;
      p.client = [strOf(e.os), strOf(e.browser)].filter(Boolean).join(" · ") || p.client;
    }
    if (e.type === "leave") {
      p.seconds += numOf(e.seconds) || 0;
      p.scrollPct = Math.max(p.scrollPct, numOf(e.scrollPct) || 0);
      if (Array.isArray(e.sections)) e.sections.forEach((s) => typeof s === "string" && p!.sectionset.add(s));
    }
    if (e.type === "click") {
      const t = strOf(e.target);
      if (t) {
        p.targetlist.push(t);
        p.actionlist.push(strOf(e.label) ? `${TARGET_LABEL[t] || t}: ${e.label}` : TARGET_LABEL[t] || t);
      }
    }
    if (e.type === "ask") p.asked += 1;
  }
  return [...by.values()]
    .map((p) => {
      const days = p.dayset.size;
      const engaged = p.seconds >= 30 || p.scrollPct >= 50 || p.sectionset.size >= 3;
      const targets = [...new Set(p.targetlist)];
      const standing = targets.some((t) => CONTACT.has(t))
        ? { key: "contact", label: "Made contact" }
        : targets.some((t) => RESUME.has(t))
          ? { key: "resume", label: "Took the resume" }
          : targets.some((t) => WORK.has(t))
            ? { key: "work", label: "Opened the work" }
            : p.asked > 0
              ? { key: "asked", label: "Asked a question" }
              : days >= 2
                ? { key: "returned", label: "Came back" }
                : engaged
                  ? { key: "engaged", label: "Read it" }
                  : { key: "bounced", label: "Glanced" };
      return {
        id: p.id,
        stable: p.stable,
        first: p.first,
        last: p.last,
        visits: p.visits,
        sessions: Math.max(p.sessions, 1),
        days,
        seconds: p.seconds,
        scrollPct: p.scrollPct,
        sections: [...p.sectionset],
        paths: [...p.pathset],
        channel: p.channel,
        source: p.source,
        place: p.place,
        device: p.device,
        client: p.client,
        actions: [...new Set(p.actionlist)],
        targets,
        asked: p.asked,
        standing,
      };
    })
    .sort((a, b) => b.last.localeCompare(a.last));
}

export type Activity = {
  id: string;
  t: string;
  type: string;
  person: string | null;
  what: string;
  path: string | null;
  place: string | null;
  source: string | null;
  device: string | null;
};

function activity(list: UsageEvent[], people: Person[], limit = 400): Activity[] {
  const byPerson = new Map(people.map((p) => [p.id, p]));
  return list
    .filter((e) => e.type !== "crawl")
    .slice(-limit)
    .reverse()
    .map((e) => {
      const p = strOf(e.person) ? byPerson.get(String(e.person)) : undefined;
      let what = e.type;
      if (e.type === "visit") what = `opened ${e.path}${e.navType === "reload" ? " (reload)" : ""}`;
      if (e.type === "leave") {
        what = `left after ${fmtSeconds(numOf(e.seconds) || 0)}, ${numOf(e.scrollPct) ?? 0}% scrolled`;
        if (Array.isArray(e.sections) && e.sections.length) what += `, read ${e.sections.length} sections`;
      }
      if (e.type === "click") {
        const t = strOf(e.target) || "";
        what = `clicked ${TARGET_LABEL[t] || t}${strOf(e.label) ? `: ${e.label}` : ""}`;
      }
      if (e.type === "ask") what = `asked: “${strOf(e.question) || ""}”${e.ok ? "" : " (no model)"}`;
      return {
        id: e.id,
        t: e.t,
        type: e.type,
        person: strOf(e.person),
        what,
        path: strOf(e.path),
        place: p?.place ?? [strOf(e.city), strOf(e.country)].filter(Boolean).join(", ") ?? null,
        source: p?.source ?? null,
        device: p ? [p.device, p.client].filter(Boolean).join(" · ") : null,
      };
    });
}

export function fmtSeconds(s: number) {
  if (s < 60) return `${Math.round(s)}s`;
  const m = Math.floor(s / 60);
  const r = Math.round(s % 60);
  return r ? `${m}m ${r}s` : `${m}m`;
}

export type Crawler = { bot: string; kind: string; hits: number; last: string; paths: Tally };

function crawlers(list: UsageEvent[]): Crawler[] {
  const by = new Map<string, { kind: string; hits: number; last: string; rows: UsageEvent[] }>();
  for (const e of list) {
    if (e.type !== "crawl") continue;
    const bot = strOf(e.bot) || "Other bot";
    let c = by.get(bot);
    if (!c) by.set(bot, (c = { kind: strOf(e.kind) || "other", hits: 0, last: e.t, rows: [] }));
    c.hits += 1;
    if (e.t > c.last) c.last = e.t;
    c.rows.push(e);
  }
  return [...by.entries()]
    .map(([bot, c]) => ({ bot, kind: c.kind, hits: c.hits, last: c.last, paths: tally(c.rows, "path", 6) }))
    .sort((a, b) => b.hits - a.hits);
}

export type Summary = Awaited<ReturnType<typeof summarize>>;

export async function summarize(range: Range = "all") {
  const all = await readAll();
  const ms = RANGES[range].ms;
  const cutoff = Number.isFinite(ms) ? Date.now() - ms : -Infinity;
  const list = all.filter((e) => Date.parse(e.t) >= cutoff).sort((a, b) => a.t.localeCompare(b.t));

  const humans = list.filter((e) => e.type !== "crawl" && !e.bot);
  const visits = humans.filter((e) => e.type === "visit");
  const leaves = humans.filter((e) => e.type === "leave");
  const clicks = humans.filter((e) => e.type === "click");
  const asks = humans.filter((e) => e.type === "ask");
  const people = foldPeople(humans);

  const stays = leaves.map((e) => numOf(e.seconds) || 0);
  const scrolls = leaves.map((e) => numOf(e.scrollPct) ?? 0);
  const bounces = leaves.filter((e) => (numOf(e.seconds) || 0) < 10 && (numOf(e.scrollPct) ?? 0) < 25).length;

  const converters = new Set(clicks.filter((e) => CONVERSIONS.has(String(e.target))).map((e) => String(e.person)));
  asks.forEach((e) => converters.add(String(e.person)));

  const opened = new Set(people.map((p) => p.id));
  const engaged = new Set(people.filter((p) => p.seconds >= 30 || p.scrollPct >= 50 || p.sections.length >= 3).map((p) => p.id));
  const reachedContact = new Set(
    people.filter((p) => engaged.has(p.id) && (p.sections.includes("contact") || p.paths.includes("/resume"))).map((p) => p.id)
  );
  const converted = new Set([...converters].filter((id) => opened.has(id)));

  const sectionCounts = new Map<string, number>();
  for (const p of people) p.sections.forEach((s) => sectionCounts.set(s, (sectionCounts.get(s) || 0) + 1));
  const sections: Tally = [...sectionCounts.entries()].sort((a, b) => b[1] - a[1]);

  const days = new Map<string, { day: string; visits: number; people: Set<string>; conversions: number; crawls: number }>();
  for (const e of list) {
    const day = e.t.slice(0, 10);
    let d = days.get(day);
    if (!d) days.set(day, (d = { day, visits: 0, people: new Set(), conversions: 0, crawls: 0 }));
    if (e.type === "crawl") d.crawls += 1;
    else if (!e.bot) {
      if (e.type === "visit") d.visits += 1;
      if (e.person) d.people.add(String(e.person));
      if ((e.type === "click" && CONVERSIONS.has(String(e.target))) || e.type === "ask") d.conversions += 1;
    }
  }
  const perDay = [...days.values()]
    .sort((a, b) => a.day.localeCompare(b.day))
    .slice(-90)
    .map((d) => ({ day: d.day, visits: d.visits, people: d.people.size, conversions: d.conversions, crawls: d.crawls }));

  const hours = Array.from({ length: 24 }, () => 0);
  for (const e of visits) {
    const h = Number(new Date(e.t).toLocaleTimeString("en-GB", { timeZone: IST, hour12: false, hour: "2-digit" }));
    hours[h % 24] += 1;
  }

  const now = Date.now();
  const since = (m: number) => new Set(visits.filter((e) => now - Date.parse(e.t) < m).map((e) => String(e.person))).size;

  const vital = (key: string) => p75(leaves.map((e) => numOf(e[key])).filter((v): v is number => v !== null));

  return {
    range,
    generatedAt: new Date().toISOString(),
    totals: {
      events: list.length,
      visits: visits.length,
      people: people.length,
      today: since(24 * 3600e3),
      lastHour: since(3600e3),
      returning: people.filter((p) => p.days >= 2 || p.sessions >= 2).length,
      medianSeconds: median(stays),
      medianScroll: median(scrolls),
      bouncePct: pct(bounces, leaves.length),
      converters: converted.size,
      conversionPct: pct(converted.size, people.length),
      contacted: people.filter((p) => p.targets.some((t) => CONTACT.has(t))).length,
      tookResume: people.filter((p) => p.targets.some((t) => RESUME.has(t))).length,
      openedWork: people.filter((p) => p.targets.some((t) => WORK.has(t))).length,
      resumeDownloads: clicks.filter((e) => e.target === "resume_pdf").length,
      resumeViews: visits.filter((e) => e.path === "/resume").length,
      emailClicks: clicks.filter((e) => e.target === "email").length,
      linkedinClicks: clicks.filter((e) => e.target === "linkedin").length,
      githubClicks: clicks.filter((e) => e.target === "github" || e.target === "project_repo").length,
      projectClicks: clicks.filter((e) => e.target === "project_live").length,
      asks: asks.length,
      crawls: list.filter((e) => e.type === "crawl").length,
      botVisits: list.filter((e) => e.type === "visit" && e.bot).length,
    },
    funnel: [
      { step: "Opened the site", people: opened.size, pct: opened.size ? 100 : 0 },
      { step: "Read it (30s, half the page, or 3 sections)", people: engaged.size, pct: pct(engaged.size, opened.size) },
      { step: "Reached contact or the resume", people: reachedContact.size, pct: pct(reachedContact.size, opened.size) },
      { step: "Clicked through or asked", people: converted.size, pct: pct(converted.size, opened.size) },
    ],
    vitals: { lcp: vital("lcp"), cls: vital("cls"), inp: vital("inp"), fcp: vital("fcp"), ttfb: vital("ttfb") },
    perDay,
    hours,
    channels: tally(visits, "channel"),
    sources: tally(visits, "source", 15),
    referrers: tally(visits, "ref", 15),
    landing: tally(visits, "path", 8),
    countries: tally(visits, "country", 12),
    cities: tally(
      visits.map((e) => ({ ...e, place: [strOf(e.city), strOf(e.country)].filter(Boolean).join(", ") })),
      "place",
      12
    ),
    devices: tally(visits, "device"),
    os: tally(visits, "os"),
    browsers: tally(visits, "browser"),
    languages: tally(visits, "lang", 8),
    timezones: tally(visits, "tz", 8),
    themes: tally(visits, "theme"),
    sections,
    actions: tally(
      clicks.map((e) => ({ ...e, action: TARGET_LABEL[String(e.target)] || String(e.target) })),
      "action"
    ),
    projects: tally(
      clicks.filter((e) => e.target === "project_live" || e.target === "project_repo"),
      "label"
    ),
    externals: tally(clicks.filter((e) => e.target === "external" || e.target === "github"), "label", 10),
    questions: asks
      .slice(-50)
      .reverse()
      .map((e) => ({ t: e.t, person: strOf(e.person), question: strOf(e.question) || "", ok: Boolean(e.ok), source: strOf(e.source) })),
    crawlers: crawlers(list),
    people,
    activity: activity(humans, people),
  };
}
