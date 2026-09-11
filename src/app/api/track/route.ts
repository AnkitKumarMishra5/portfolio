import { recordClick, recordLeave, recordVisit } from "@/lib/analytics/events";
import { clientIp } from "@/lib/analytics/identity";
import { SILENT } from "@/lib/analytics/store";

export const runtime = "nodejs";

const MAX_BODY = 4096;
const WINDOW_MS = 60_000;
const MAX_PER_IP = 90;
const MAX_GLOBAL = 1500;

const hits = new Map<string, { count: number; resetAt: number }>();
const global = { count: 0, resetAt: 0 };

function allowed(ip: string) {
  const now = Date.now();
  if (now > global.resetAt) {
    global.count = 0;
    global.resetAt = now + WINDOW_MS;
    for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
  }
  if (global.count >= MAX_GLOBAL) return false;
  const e = hits.get(ip);
  if (!e || now > e.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    if (e.count >= MAX_PER_IP) return false;
    e.count += 1;
  }
  global.count += 1;
  return true;
}

const NO_CONTENT = new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (SILENT) return NO_CONTENT;
  if (!allowed(clientIp(req.headers))) return new Response(null, { status: 429 });

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) return new Response(null, { status: 413 });
    body = JSON.parse(raw) as Record<string, unknown>;
    if (!body || typeof body !== "object") throw new Error("shape");
  } catch {
    return new Response(null, { status: 400 });
  }

  try {
    switch (body.type) {
      case "visit":
        await recordVisit(req.headers, body);
        break;
      case "leave":
        await recordLeave(req.headers, body);
        break;
      case "click":
        await recordClick(req.headers, body);
        break;
      default:
        return new Response(null, { status: 400 });
    }
  } catch (err) {
    console.warn(`[usage] record failed: ${(err as Error).message}`);
  }
  return NO_CONTENT;
}
