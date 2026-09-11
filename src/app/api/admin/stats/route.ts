import { adminAllowed } from "@/lib/analytics/admin";
import { isRange, summarize } from "@/lib/analytics/summary";
import { REMOTE } from "@/lib/analytics/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (!adminAllowed(url.searchParams.get("token"))) return new Response(null, { status: 404 });
  const range = url.searchParams.get("range");
  const data = await summarize(isRange(range) ? range : "all");
  return Response.json(
    { ...data, storage: REMOTE ? "redis" : "memory" },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } }
  );
}
