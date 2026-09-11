
type Kind = "search" | "ai" | "preview" | "seo" | "other";

const KNOWN: [RegExp, string, Kind][] = [
  [/Google-Extended/i, "Google-Extended", "ai"],
  [/GoogleOther/i, "GoogleOther", "search"],
  [/Googlebot|Google-InspectionTool|Storebot-Google|APIs-Google|Mediapartners-Google/i, "Googlebot", "search"],
  [/bingbot|BingPreview/i, "Bingbot", "search"],
  [/DuckDuckBot|DuckDuckGo/i, "DuckDuckBot", "search"],
  [/DuckAssistBot/i, "DuckAssistBot", "ai"],
  [/YandexBot|YandexImages/i, "YandexBot", "search"],
  [/Baiduspider/i, "Baiduspider", "search"],
  [/Applebot-Extended/i, "Applebot-Extended", "ai"],
  [/Applebot/i, "Applebot", "search"],
  [/Yeti|NaverBot/i, "Naver", "search"],
  [/SeznamBot/i, "SeznamBot", "search"],
  [/OAI-SearchBot/i, "OAI-SearchBot", "ai"],
  [/ChatGPT-User/i, "ChatGPT-User", "ai"],
  [/GPTBot/i, "GPTBot", "ai"],
  [/Claude-SearchBot/i, "Claude-SearchBot", "ai"],
  [/Claude-User/i, "Claude-User", "ai"],
  [/ClaudeBot|anthropic-ai/i, "ClaudeBot", "ai"],
  [/Perplexity-User/i, "Perplexity-User", "ai"],
  [/PerplexityBot/i, "PerplexityBot", "ai"],
  [/Bytespider/i, "Bytespider", "ai"],
  [/CCBot/i, "CCBot", "ai"],
  [/Amazonbot/i, "Amazonbot", "ai"],
  [/meta-externalagent|meta-externalfetcher/i, "Meta AI", "ai"],
  [/cohere-ai/i, "cohere-ai", "ai"],
  [/YouBot/i, "YouBot", "ai"],
  [/MistralAI-User/i, "MistralAI-User", "ai"],
  [/LinkedInBot/i, "LinkedInBot", "preview"],
  [/facebookexternalhit|Facebot/i, "Facebook", "preview"],
  [/Twitterbot/i, "X (Twitterbot)", "preview"],
  [/Slackbot|Slack-ImgProxy/i, "Slackbot", "preview"],
  [/WhatsApp/i, "WhatsApp", "preview"],
  [/TelegramBot/i, "Telegram", "preview"],
  [/Discordbot/i, "Discord", "preview"],
  [/iMessage|Applebot.*Safari/i, "iMessage", "preview"],
  [/Embedly|Iframely|redditbot/i, "Link preview", "preview"],
  [/AhrefsBot/i, "AhrefsBot", "seo"],
  [/SemrushBot/i, "SemrushBot", "seo"],
  [/MJ12bot/i, "Majestic", "seo"],
  [/DotBot/i, "DotBot", "seo"],
  [/Screaming Frog/i, "Screaming Frog", "seo"],
  [/PetalBot/i, "PetalBot", "search"],
  [/Chrome-Lighthouse|PageSpeed|GTmetrix/i, "Lighthouse", "seo"],
  [/vercel-screenshot|Vercel/i, "Vercel", "other"],
];

export function identifyBot(ua: string, isBot: boolean): { bot: string; kind: Kind } | null {
  for (const [re, bot, kind] of KNOWN) if (re.test(ua)) return { bot, kind };
  if (isBot) {
    const m = ua.match(/([A-Za-z][A-Za-z0-9_-]{2,30})(?:bot|spider|crawler)/i);
    return { bot: m ? m[0] : "Other bot", kind: "other" };
  }
  return null;
}
