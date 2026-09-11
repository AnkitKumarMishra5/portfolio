import { userAgent } from "next/server";
import { append, type UsageEvent } from "./store";
import { personId } from "./identity";
import { classify, refHost } from "./channel";

export const str = (v: unknown, max = 40) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;
export const num = (v: unknown, max = 1e6) =>
  typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= max ? Math.round(v * 100) / 100 : null;
export const bool = (v: unknown) => Boolean(v);

export const path = (v: unknown) => {
  const s = str(v, 120);
  if (!s) return "/";
  const clean = s.split("?")[0].split("#")[0];
  return clean.startsWith("/") ? clean : `/${clean}`;
};

let seq = Date.now() % 1_000_000;
const nextId = () => `E-${Date.now().toString(36)}${(seq++ % 1296).toString(36).padStart(2, "0")}`.toUpperCase();

export async function track(type: string, data: Record<string, unknown>): Promise<UsageEvent> {
  const event: UsageEvent = { id: nextId(), t: new Date().toISOString(), type, ...data };
  await append(event);
  return event;
}

export function geo(headers: Headers) {
  const dec = (v: string | null) => {
    if (!v) return null;
    try {
      return decodeURIComponent(v).slice(0, 40);
    } catch {
      return v.slice(0, 40);
    }
  };
  const country = headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry");
  return {
    country: country ? country.slice(0, 2).toUpperCase() : null,
    region: dec(headers.get("x-vercel-ip-country-region")),
    city: dec(headers.get("x-vercel-ip-city")),
  };
}

export function client(headers: Headers) {
  const ua = userAgent({ headers });
  const major = (v?: string) => (v ? v.split(".").slice(0, 1).join(".") : null);
  return {
    device: ua.device.type || "desktop",
    os: ua.os.name ? `${ua.os.name}${major(ua.os.version) ? ` ${major(ua.os.version)}` : ""}` : null,
    browser: ua.browser.name
      ? `${ua.browser.name}${major(ua.browser.version) ? ` ${major(ua.browser.version)}` : ""}`
      : null,
    lang: headers.get("accept-language")?.split(",")[0].slice(0, 12) || null,
    isBot: ua.isBot,
    ua: ua.ua,
  };
}

type Body = Record<string, unknown>;

export async function recordVisit(headers: Headers, body: Body) {
  const { person, stable } = await personId(headers, body.vid);
  const ref = refHost(body.ref);
  const utmSource = str(body.utmSource, 40);
  const { channel, source } = classify({ ref, utmSource });
  const c = client(headers);
  return track("visit", {
    person,
    stable,
    pv: str(body.pv, 16),
    path: path(body.path),
    ref,
    utmSource,
    channel,
    source,
    ...geo(headers),
    device: c.device,
    os: c.os,
    browser: c.browser,
    lang: c.lang,
    bot: c.isBot,
    tz: str(body.tz, 40),
    screen: str(body.screen, 16),
    viewport: str(body.viewport, 16),
    dpr: num(body.dpr, 8),
    theme: str(body.theme, 8),
    reducedMotion: bool(body.reducedMotion),
    touch: bool(body.touch),
    connection: str(body.connection, 12),
    standalone: bool(body.standalone),
    navType: str(body.navType, 16),
    ttfbMs: num(body.ttfbMs, 120_000),
    domReadyMs: num(body.domReadyMs, 120_000),
    loadMs: num(body.loadMs, 120_000),
  });
}

export async function recordLeave(headers: Headers, body: Body) {
  const { person } = await personId(headers, body.vid);
  const seconds = num(body.seconds, 6 * 60 * 60);
  if (seconds === null) return null;
  const vitals = (body.vitals && typeof body.vitals === "object" ? body.vitals : {}) as Body;
  const sections = Array.isArray(body.sections)
    ? body.sections.filter((s): s is string => typeof s === "string").map((s) => s.slice(0, 24)).slice(0, 24)
    : [];
  return track("leave", {
    person,
    pv: str(body.pv, 16),
    path: path(body.path),
    seconds,
    scrollPct: num(body.scrollPct, 100),
    sections,
    lcp: num(vitals.LCP, 120_000),
    cls: num(vitals.CLS, 100),
    inp: num(vitals.INP, 120_000),
    fcp: num(vitals.FCP, 120_000),
    ttfb: num(vitals.TTFB, 120_000),
  });
}

export const CLICK_TARGETS = [
  "email",
  "linkedin",
  "github",
  "x",
  "resume_pdf",
  "resume_page",
  "project_live",
  "project_repo",
  "external",
] as const;
export type ClickTarget = (typeof CLICK_TARGETS)[number];

export async function recordClick(headers: Headers, body: Body) {
  const target = str(body.target, 16);
  if (!target || !(CLICK_TARGETS as readonly string[]).includes(target)) return null;
  const { person } = await personId(headers, body.vid);
  return track("click", {
    person,
    pv: str(body.pv, 16),
    path: path(body.path),
    target,
    label: str(body.label, 60),
  });
}

export async function recordAsk(
  headers: Headers,
  data: { question: string; ok: boolean; source: string; vid?: unknown }
) {
  const { person } = await personId(headers, data.vid);
  return track("ask", {
    person,
    question: data.question.slice(0, 200),
    ok: data.ok,
    source: data.source.slice(0, 16),
    ...geo(headers),
  });
}

export async function recordCrawl(headers: Headers, data: { bot: string; kind: string; path: string }) {
  return track("crawl", {
    bot: data.bot.slice(0, 40),
    kind: data.kind,
    path: path(data.path),
    ua: (headers.get("user-agent") || "").slice(0, 120),
    country: geo(headers).country,
  });
}
