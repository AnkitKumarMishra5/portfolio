"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { projects } from "@/lib/data";

const ENABLED = process.env.NEXT_PUBLIC_ANALYTICS !== "off";
const PERSISTENT = process.env.NEXT_PUBLIC_ANALYTICS_PERSISTENT_ID === "1";
const ENDPOINT = "/api/track";

type Nav = Navigator & { globalPrivacyControl?: boolean; connection?: { effectiveType?: string } };

function optedOut() {
  const n = navigator as Nav;
  return n.globalPrivacyControl === true || n.doNotTrack === "1";
}

function vid(): string | null {
  if (!PERSISTENT) return null;
  try {
    let v = localStorage.getItem("akm_vid");
    if (!v) {
      v = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => "abcdefghijklmnopqrstuvwxyz0123456789"[b % 36]).join("");
      localStorage.setItem("akm_vid", v);
    }
    return v;
  } catch {
    return null;
  }
}

function send(payload: Record<string, unknown>, urgent = false) {
  const body = JSON.stringify(payload);
  try {
    if (urgent && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
      return;
    }
    fetch(ENDPOINT, { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
  } catch {
  }
}

const projectHosts = new Map(projects.map((p) => [new URL(p.live).host, p.name]));
const repoPaths = new Map(projects.map((p) => [new URL(p.repo).pathname.toLowerCase(), p.name]));

export function classifyLink(href: string): { target: string; label: string | null } | null {
  if (href.startsWith("mailto:")) return { target: "email", label: null };
  let url: URL;
  try {
    url = new URL(href, location.href);
  } catch {
    return null;
  }
  if (url.origin === location.origin) {
    if (url.pathname.endsWith(".pdf")) return { target: "resume_pdf", label: null };
    if (url.pathname === "/resume") return { target: "resume_page", label: null };
    return null;
  }
  const host = url.host.replace(/^www\./, "");
  if (host.endsWith("linkedin.com")) return { target: "linkedin", label: null };
  if (host === "x.com" || host === "twitter.com") return { target: "x", label: null };
  if (host === "github.com") {
    const repo = repoPaths.get(url.pathname.replace(/\/$/, "").toLowerCase());
    return repo ? { target: "project_repo", label: repo } : { target: "github", label: url.pathname.slice(1, 60) || null };
  }
  const project = projectHosts.get(url.host);
  if (project) return { target: "project_live", label: project };
  return { target: "external", label: host };
}

export function Analytics() {
  const pathname = usePathname();
  const vitals = useRef<Record<string, number>>({});
  const active = useRef(false);

  useReportWebVitals((metric) => {
    vitals.current[metric.name] = Math.round(metric.value * 1000) / 1000;
  });

  useEffect(() => {
    if (!ENABLED || !pathname || pathname.startsWith("/admin")) return;
    if (optedOut()) return;
    if (active.current) return;
    active.current = true;

    const pv = Math.random().toString(36).slice(2, 12);
    const path = pathname;
    const params = new URLSearchParams(location.search);
    const base = { pv, path, vid: vid() };

    let visibleSince = document.visibilityState === "visible" ? Date.now() : 0;
    let visibleMs = 0;
    let scrollPct = 0;
    const sections = new Set<string>();

    const timing = () => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (!nav) return {};
      const ms = (v: number) => (v > 0 ? Math.round(v) : undefined);
      return {
        navType: nav.type,
        ttfbMs: ms(nav.responseStart),
        domReadyMs: ms(nav.domContentLoadedEventEnd),
        loadMs: ms(nav.loadEventEnd),
      };
    };

    const visit = () => {
      const n = navigator as Nav;
      send({
        ...base,
        type: "visit",
        ref: document.referrer || null,
        utmSource: params.get("utm_source"),
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: `${screen.width}x${screen.height}`,
        viewport: `${innerWidth}x${innerHeight}`,
        dpr: Math.round(devicePixelRatio * 100) / 100,
        theme: document.documentElement.dataset.theme || null,
        reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
        touch: matchMedia("(pointer: coarse)").matches,
        connection: n.connection?.effectiveType || null,
        standalone: matchMedia("(display-mode: standalone)").matches,
        ...timing(),
      });
    };

    let visitTimer: ReturnType<typeof setTimeout> | undefined;
    const armVisit = () => {
      visitTimer = setTimeout(visit, 600);
    };
    if (document.readyState === "complete") armVisit();
    else addEventListener("load", armVisit, { once: true });

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - innerHeight;
      const pct = max > 0 ? Math.min(100, Math.round(((scrollY || doc.scrollTop) / max) * 100)) : 100;
      if (pct > scrollPct) scrollPct = pct;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.id && sections.add(e.target.id)),
      { threshold: 0.2 }
    );
    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));

    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const hit = classifyLink(a.getAttribute("href") || "");
      if (hit) send({ ...base, type: "click", ...hit }, true);
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);

    const onCustom = (ev: Event) => {
      const d = (ev as CustomEvent<{ target: string; label?: string }>).detail;
      if (d?.target) send({ ...base, type: "click", target: d.target, label: d.label ?? null }, true);
    };
    addEventListener("akm:track", onCustom);

    const leave = () => {
      if (visibleSince) {
        visibleMs += Date.now() - visibleSince;
        visibleSince = 0;
      }
      const seconds = Math.round(visibleMs / 1000);
      if (seconds < 1) return;
      send(
        { ...base, type: "leave", seconds, scrollPct, sections: [...sections], vitals: vitals.current },
        true
      );
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") leave();
      else if (!visibleSince) visibleSince = Date.now();
    };
    addEventListener("visibilitychange", onVisibility);
    addEventListener("pagehide", leave);

    return () => {
      clearTimeout(visitTimer);
      removeEventListener("load", armVisit);
      removeEventListener("scroll", onScroll);
      observer.disconnect();
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
      removeEventListener("akm:track", onCustom);
      removeEventListener("visibilitychange", onVisibility);
      removeEventListener("pagehide", leave);
      leave();
      active.current = false;
    };
  }, [pathname]);

  return null;
}

export function trackAction(target: string, label?: string) {
  try {
    dispatchEvent(new CustomEvent("akm:track", { detail: { target, label } }));
  } catch {
  }
}
