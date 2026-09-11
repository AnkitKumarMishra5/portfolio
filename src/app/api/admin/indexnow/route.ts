import { adminAllowed } from "@/lib/analytics/admin";
import { person } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PATHS = ["/", "/resume", "/privacy", "/llms.txt", person.resume];

export async function POST(req: Request) {
  const url = new URL(req.url);
  if (!adminAllowed(url.searchParams.get("token"))) return new Response(null, { status: 404 });

  const key = String(process.env.INDEXNOW_KEY || "").trim();
  if (!key) {
    return Response.json(
      { ok: false, error: "INDEXNOW_KEY is not set on this deployment." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const host = new URL(SITE_URL).host;
  const urlList = PATHS.map((p) => `${SITE_URL}${p}`);

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key, keyLocation: `${SITE_URL}/indexnow-key.txt`, urlList }),
    });
    const ok = res.status === 200 || res.status === 202;
    return Response.json(
      { ok, status: res.status, submitted: ok ? urlList.length : 0, detail: ok ? null : (await res.text()).slice(0, 200) },
      { status: ok ? 200 : 502, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    return Response.json(
      { ok: false, error: (err as Error).message },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
