"use client";

import { useEffect } from "react";
import Lenis from "lenis";

function targetFromHref(href: string | null) {
  if (!href || href === "#" || !href.startsWith("#")) return null;
  return document.getElementById(decodeURIComponent(href.slice(1)));
}

function marginOf(el: HTMLElement) {
  return parseFloat(getComputedStyle(el).scrollMarginTop) || 90;
}

export function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let frame = 0;
    let cancelled = false;
    const timers: number[] = [];

    const settleHash = () => {
      if (cancelled) return;
      const el = targetFromHref(location.hash);
      if (!el) return;
      const margin = marginOf(el);
      const drift = el.getBoundingClientRect().top - margin;
      if (Math.abs(drift) < 8) return;
      if (lenis) lenis.scrollTo(el, { offset: -margin, immediate: true, force: true });
      else window.scrollTo({ top: window.scrollY + drift, behavior: "instant" });
    };

    if (location.hash) {
      const run = () => requestAnimationFrame(() => requestAnimationFrame(settleHash));
      document.fonts.ready.then(run, run);
      timers.push(window.setTimeout(settleHash, 700));
    }

    const cleanup = () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return cleanup;

    if (window.matchMedia("(pointer: coarse)").matches) {
      const onClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
        const id = anchor?.getAttribute("href") ?? null;
        const target = targetFromHref(id);
        if (!target || !id) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - marginOf(target);
        window.scrollTo({ top, behavior: "smooth" });
        history.replaceState(null, "", id);
      };
      document.addEventListener("click", onClick);
      return () => {
        cleanup();
        document.removeEventListener("click", onClick);
      };
    }

    lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    const instance = lenis;

    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      const id = anchor?.getAttribute("href") ?? null;
      const target = targetFromHref(id);
      if (!target || !id) return;
      e.preventDefault();
      instance.scrollTo(target, { offset: -marginOf(target), duration: 1.35 });
      history.replaceState(null, "", id);
    };

    document.addEventListener("click", onClick);
    return () => {
      cleanup();
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      instance.destroy();
    };
  }, []);

  return null;
}
