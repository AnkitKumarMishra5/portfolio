import { brandIcons, type BrandIcon } from "./brandIcons";

const alias: Record<string, string> = {
  "javascript (es6+)": "javascript",
  "react.js": "react",
  "next.js": "nextdotjs",
  "node.js": "nodedotjs",
  "express.js": "express",
  "tailwind css": "tailwindcss",
  "event-driven architecture": "apachekafka",
  "google cloud (gcp)": "googlecloud",
  "github actions": "githubactions",
  "d3.js": "d3",
  "apache kafka": "apachekafka",
  "solana rpc": "solana",
  "database optimization": "postgresql",
  "next.js 16": "nextdotjs",
  "tailwind v4": "tailwindcss",
  postgres: "postgresql",
};

const byTitle = new Map(brandIcons.map((i) => [i.title.toLowerCase(), i]));
const bySlug = new Map(brandIcons.map((i) => [i.slug, i]));

export function iconFor(name: string): BrandIcon | null {
  const key = name.toLowerCase().trim();
  const slug = alias[key];
  if (slug) return bySlug.get(slug) ?? null;
  return byTitle.get(key) ?? bySlug.get(key.replace(/[^a-z0-9]/g, "")) ?? null;
}
