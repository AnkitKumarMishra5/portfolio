
export type UsageEvent = {
  id: string;
  t: string;
  type: string;
  [key: string]: unknown;
};

const env = (name: string) =>
  String(process.env[name] || "").trim().replace(/^["']|["']$/g, "").trim();

const REDIS_URL = (
  env("ANALYTICS_REDIS_URL") ||
  env("UPSTASH_REDIS_REST_URL") ||
  env("KV_REST_API_URL")
).replace(/\/+$/, "");
const REDIS_TOKEN =
  env("ANALYTICS_REDIS_TOKEN") ||
  env("UPSTASH_REDIS_REST_TOKEN") ||
  env("KV_REST_API_TOKEN");
const REDIS_KEY = env("ANALYTICS_REDIS_KEY") || "akm:events";

export const REMOTE = Boolean(REDIS_URL && REDIS_TOKEN);
export const MAX_EVENTS = 50_000;
export const SILENT = env("ANALYTICS") === "off";

const g = globalThis as unknown as { __akmUsageEvents?: UsageEvent[] };
const memory: UsageEvent[] = (g.__akmUsageEvents ??= []);
let cache: { at: number; rows: UsageEvent[] } | null = null;
const CACHE_MS = 2_000;
let writesSinceTrim = 0;

async function redis<T = unknown>(command: (string | number)[]): Promise<T> {
  const res = await fetch(REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const data = (await res.json()) as { result?: T; error?: string };
  if (data.error) throw new Error(data.error);
  return data.result as T;
}

export async function append(event: UsageEvent): Promise<void> {
  if (SILENT) return;
  memory.push(event);
  if (memory.length > MAX_EVENTS) memory.shift();
  cache = null;
  if (!REMOTE) return;
  try {
    await redis(["RPUSH", REDIS_KEY, JSON.stringify(event)]);
    writesSinceTrim += 1;
    if (writesSinceTrim >= 200) {
      writesSinceTrim = 0;
      await redis(["LTRIM", REDIS_KEY, -MAX_EVENTS, -1]);
    }
  } catch (err) {
    console.warn(`[usage] remote write failed: ${(err as Error).message}`);
  }
}

export async function readAll(): Promise<UsageEvent[]> {
  if (!REMOTE) return memory.slice();
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.rows;
  try {
    const rows = await redis<string[]>(["LRANGE", REDIS_KEY, -MAX_EVENTS, -1]);
    const parsed: UsageEvent[] = [];
    for (const row of rows || []) {
      try {
        const e = JSON.parse(row) as UsageEvent;
        if (e && e.t && e.type) parsed.push(e);
      } catch {
      }
    }
    cache = { at: Date.now(), rows: parsed };
    return parsed;
  } catch (err) {
    console.warn(`[usage] remote read failed: ${(err as Error).message}`);
    return memory.slice();
  }
}

export async function purge(): Promise<void> {
  memory.length = 0;
  cache = null;
  if (!REMOTE) return;
  try {
    await redis(["DEL", REDIS_KEY]);
  } catch {
  }
}
