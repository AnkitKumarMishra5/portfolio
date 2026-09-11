import { type NextFetchEvent, type NextRequest, NextResponse, userAgent } from "next/server";
import { identifyBot } from "@/lib/analytics/bots";
import { recordCrawl } from "@/lib/analytics/events";

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const { isBot, ua } = userAgent(request);
  const hit = identifyBot(ua, isBot);
  if (hit) {
    event.waitUntil(
      recordCrawl(request.headers, { ...hit, path: request.nextUrl.pathname }).catch(() => {})
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/resume",
    "/privacy",
    "/llms.txt",
    "/sitemap.xml",
    "/robots.txt",
    "/AnkitKumarMishraResume.pdf",
    "/.well-known/security.txt",
  ],
};
