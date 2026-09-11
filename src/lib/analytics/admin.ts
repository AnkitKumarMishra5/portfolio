import { timingSafeEqual } from "node:crypto";

export function adminAllowed(token: string | null | undefined): boolean {
  const want = process.env.ADMIN_TOKEN;
  if (!want) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(want);
  return a.length === b.length && timingSafeEqual(a, b);
}
