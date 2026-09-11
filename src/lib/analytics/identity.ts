
const encoder = new TextEncoder();

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function secret(): string {
  const s = String(process.env.ANALYTICS_ID_SECRET || "").trim();
  if (s) return s;
  return "dev-only-secret-set-ANALYTICS_ID_SECRET";
}

async function hmac(key: string, message: string): Promise<Uint8Array> {
  const k = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, encoder.encode(message)));
}

async function shortId(key: string, message: string, length = 5) {
  const digest = await hmac(key, message);
  let out = "";
  for (let i = 0; i < length; i += 1) out += ALPHABET[digest[i] % ALPHABET.length];
  return out;
}

export const PERSISTENT_IDS = process.env.NEXT_PUBLIC_ANALYTICS_PERSISTENT_ID === "1";

const cleanVid = (v: unknown) =>
  typeof v === "string" && /^[a-z0-9]{12,40}$/i.test(v) ? v : null;

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "local"
  );
}

export async function personId(
  headers: Headers,
  vid?: unknown
): Promise<{ person: string; stable: boolean }> {
  const known = PERSISTENT_IDS ? cleanVid(vid) : null;
  if (known) {
    return { person: `P-${await shortId(secret(), `vid|${known}`)}`, stable: true };
  }
  const day = new Date().toISOString().slice(0, 10);
  const ua = headers.get("user-agent") || "";
  const ip = clientIp(headers);
  return {
    person: `V-${await shortId(`${secret()}|${day}`, `${ip}|${ua}`)}`,
    stable: false,
  };
}
