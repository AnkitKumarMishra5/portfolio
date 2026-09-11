import { adminAllowed } from "@/lib/analytics/admin";
import { purge } from "@/lib/analytics/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const url = new URL(req.url);
  if (!adminAllowed(url.searchParams.get("token"))) return new Response(null, { status: 404 });
  await purge();
  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
