# ankitkumarmishra

Portfolio and resume. Next.js App Router, TypeScript, Tailwind v4, Motion, Lenis.
Live at [ankitkumarmishra.is-a.dev](https://ankitkumarmishra.is-a.dev).

## What is in here

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | The one-page portfolio, with Person / ProfilePage / WebSite / SoftwareApplication JSON-LD |
| `src/app/resume/` | HTML resume, with WebPage + BreadcrumbList JSON-LD and the PDF as an alternate |
| `src/app/privacy/` | What the site records about a visit, and what "Ask the page" sends to OpenAI |
| `src/app/admin/` | Owner's usage dashboard, gated by `ADMIN_TOKEN` |
| `src/app/api/track/` | Beacon endpoint the page reports visits, clicks and departures to |
| `src/app/api/ask/` | The "Ask the page" assistant, grounded in `src/lib/data.ts` |
| `src/app/llms.txt/` | Plain-text version of the site for LLM assistants |
| `src/app/robots.ts`, `sitemap.ts`, `manifest.ts` | Crawler and install metadata |
| `src/app/icon.svg`, `icon-*.png/`, `apple-icon.tsx` | One brand mark in every size a browser, search engine or home screen asks for |
| `src/lib/data.ts` | Every fact on the site. Change copy here, not in components |
| `src/lib/jsonld.ts` | Structured data, shared by the home and resume pages |
| `src/lib/analytics/` | Event store, visitor pseudonyms, source classification, crawler names, summary math |
| `src/proxy.ts` | Records crawler hits (search engines, AI assistants, link previews) |
| `public/brand/` | Light and dark portfolio cards and the monogram, for READMEs |

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in what you need
npm run dev
```

`npm run build` must pass before a deploy. `npm run lint` runs ESLint.

## Environment

Everything is optional; the site works with none of it set. See `.env.example` for the
full list with explanations. The ones that matter:

- `OPENAI_API_KEY`: turns on the live assistant.
- `ADMIN_TOKEN`: opens `/admin?token=…` in production.
- `ANALYTICS_ID_SECRET`: keys visitor pseudonyms.
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`: keeps usage history across
  deploys. Add the Upstash integration in the Vercel dashboard and they are injected.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`: search
  console ownership.
- `INDEXNOW_KEY`: lets `npm run indexnow` ping Bing, Yandex, Naver and Seznam after a deploy.

## Usage dashboard

`/admin?token=<ADMIN_TOKEN>` shows page views, people, time on page, scroll depth, the
funnel from opening the site to clicking through, where visits came from (LinkedIn,
GitHub, search, the live apps, AI assistants, tagged links), country and city, device and
browser, which sections were read, which projects were clicked, questions typed into the
assistant, Core Web Vitals from real visits, and which crawlers fetched which pages.
`/api/admin/stats?token=…` returns the same as JSON.

Visitors are counted with a daily-rotating hash, so there are no cookies and no consent
banner. See `/privacy`.

## Where visitors come from

The dashboard reads the browser's Referer header and maps known hosts (LinkedIn, GitHub,
search engines, the live apps, AI assistants) to a channel. Links from your own sites must
not use `rel="noreferrer"`, or they arrive as direct visits.
