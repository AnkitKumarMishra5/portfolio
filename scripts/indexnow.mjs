#!/usr/bin/env node
const key = process.env.INDEXNOW_KEY;
const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://ankitkumarmishra.is-a.dev").replace(/\/$/, "");
if (!key) {
  console.error("INDEXNOW_KEY is not set. Generate one (any 8-128 hex chars) and set it here and on the deployment.");
  process.exit(1);
}
const host = new URL(site).host;
const urlList = ["/", "/resume", "/privacy", "/AnkitKumarMishraResume.pdf", "/llms.txt"].map((p) => site + p);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${site}/indexnow-key.txt`, urlList }),
});
console.log(`IndexNow ${res.status} ${res.statusText} for ${urlList.length} URLs on ${host}`);
if (res.status === 200 || res.status === 202) process.exit(0);
console.error(await res.text());
process.exit(1);
