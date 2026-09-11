import { projects } from "@/lib/data";

export type Channel =
  | "LinkedIn"
  | "GitHub"
  | "Search"
  | "AI assistant"
  | "My apps"
  | "Social"
  | "Email"
  | "Resume"
  | "Direct"
  | "Other";

const SEARCH = [
  "google.",
  "bing.com",
  "duckduckgo.com",
  "yahoo.",
  "yandex.",
  "baidu.com",
  "ecosia.org",
  "search.brave.com",
  "startpage.com",
  "qwant.com",
  "kagi.com",
];
const AI = [
  "chatgpt.com",
  "chat.openai.com",
  "openai.com",
  "perplexity.ai",
  "claude.ai",
  "anthropic.com",
  "copilot.microsoft.com",
  "gemini.google.com",
  "bard.google.com",
  "you.com",
  "phind.com",
  "poe.com",
  "mistral.ai",
  "meta.ai",
];
const SOCIAL = [
  "x.com",
  "twitter.com",
  "t.co",
  "facebook.com",
  "instagram.com",
  "reddit.com",
  "news.ycombinator.com",
  "dev.to",
  "medium.com",
  "hashnode.",
  "threads.net",
  "bsky.app",
  "whatsapp.com",
  "telegram.org",
  "t.me",
  "slack.com",
  "discord.com",
  "youtube.com",
];
const EMAIL = ["mail.google.com", "outlook.live.com", "outlook.office.com", "mail.yahoo.com", "mail.proton.me"];

const ownHosts = new Map(
  projects.map((p) => [new URL(p.live).host.toLowerCase(), p.name] as const)
);

export function refHost(referrer: unknown): string | null {
  if (typeof referrer !== "string" || !referrer) return null;
  try {
    const host = new URL(referrer).host.toLowerCase();
    return host.replace(/^www\./, "") || null;
  } catch {
    return null;
  }
}

function channelForHost(host: string): Channel | null {
  if (host.endsWith("linkedin.com") || host === "lnkd.in") return "LinkedIn";
  if (host === "github.com" || host.endsWith(".github.com") || host.endsWith(".github.io")) return "GitHub";
  if (ownHosts.has(host)) return "My apps";
  if (SEARCH.some((s) => host.includes(s))) return "Search";
  if (AI.some((s) => host === s || host.endsWith(`.${s}`))) return "AI assistant";
  if (EMAIL.some((s) => host.includes(s))) return "Email";
  if (SOCIAL.some((s) => host === s || host.endsWith(`.${s}`) || host.includes(s))) return "Social";
  return null;
}

export function classify(input: {
  ref: string | null;
  utmSource?: string | null;
}): { channel: Channel; source: string } {
  const host = input.ref;
  const tag = (input.utmSource || "").trim().slice(0, 40);
  if (!host) return { channel: "Direct", source: tag || "direct" };
  return {
    channel: channelForHost(host) || "Other",
    source: tag || ownHosts.get(host) || host,
  };
}
