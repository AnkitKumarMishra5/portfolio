export const person = {
  name: "Ankit Kumar Mishra",
  headline: "Engineering Lead | Full-Stack Engineer",
  role: "Staff Software Engineer",
  company: "TechPassport",
  companyLocation: "London, UK",
  location: "Mangalore, India",
  locationLong:
    "Based in Mangalore, India. Six years inside fully distributed teams, most of them spread across the US, UK and EU.",
  locationShort: "Remote-first. US, UK and EU teams.",
  tagline:
    "Full-Stack Engineer and Engineering Lead. Six years shipping production systems end to end.",
  taglineSub:
    "TypeScript, Node.js, React, Next.js, PostgreSQL, AWS. Payment integrations, subscription billing, KYC and compliance flows, API performance, distributed systems, and LLM applications.",
  shortBio:
    "Full-Stack Engineer and Engineering Lead. Six years in TypeScript, Node.js, React, PostgreSQL and AWS across payments, billing, KYC, compliance and LLM systems.",
  email: "ankit5kumar14@gmail.com",
  linkedin: "https://www.linkedin.com/in/ankitkumarmishra/",
  github: "https://github.com/AnkitKumarMishra5",
  resume: "/AnkitKumarMishraResume.pdf",
  photo: "/ankit.jpg",
} as const;

const industries = ["FinTech", "RegTech", "EdTech", "MediaTech"];

export const heroTags = [
  { label: "Sectors", items: industries },
  {
    label: "AI",
    items: ["LLM apps", "RAG", "AI agents", "Tool calling", "MCP", "Evals"],
  },
];

export const heroRotator = [
  "API performance",
  "real-time multiplayer",
  "payment systems",
  "LLM tool calling",
  "data visualisation",
  "KYC pipelines",
];

export const positioning =
  "I own systems end to end: schema design, API contracts, third-party integrations, performance work, and the on-call that follows. Most of it has been in regulated environments where every change is audited, so I default to idempotent writes, explicit state transitions, structured logging, and tests that prove the numbers reconcile. The same defaults hold whether the system moves money, streams game state, or calls a model.";

export const about: string[] = [
  "I'm a Full-Stack Engineer and Engineering Lead with 6+ years building systems that move money and verify people: payments, billing, KYC and compliance, and the infrastructure underneath them.",
  "Most recently I was a Staff Software Engineer at TechPassport, a London RegTech platform, where I owned the monetization stack end to end. I built it from scratch: Stripe integration, subscription management, and the full billing schema. I also cut API response times by 75 to 80% across the platform's critical endpoints, and I ran the design-to-engineering pipeline in Figma, shipping features from concept to production.",
  "Before that I spent two years at Vested Finance, an investment platform handling live investor funds. I joined as a Software Engineer and was promoted twice in 12 months to Engineering Lead, running the KYC/Compliance and Premium Management squads as de facto product owner. We took onboarding from a single market to global users and unified subscription billing across Stripe, Razorpay, Google Play, and Apple in-app purchases.",
  "Outside work I build with LLMs (tool calling, RAG, agents, MCP) and have mentored 1,000+ developers as a Subject Matter Expert.",
];

type Stat = {
  value?: number;
  display?: string;
  prefix?: string;
  suffix?: string;
  label: string;
  wide?: boolean;
};

export const stats: Stat[] = [
  { value: 6, suffix: "+", label: "years in production engineering" },
  { value: 2, label: "promotions in 12 months" },
  {
    value: 50,
    suffix: "+",
    label: "end-to-end features shipped from concept to production",
  },
  {
    value: 15,
    suffix: "+",
    label: "member cross-functional team led",
  },
  { value: 2, label: "squads run as de facto product owner" },
  {
    value: 5,
    suffix: "+",
    label: "engineer squads led, across companies",
  },
  { value: 50, suffix: "+", label: "batches of live courses taught" },
  { value: 1000, suffix: "+", label: "developers mentored" },
];

export const heroStats = [
  { value: "Staff", label: "most recent level" },
  { value: "0 to 1", label: "monetization stack owned" },
  { value: "4", label: "side projects featured here, all live" },
];

type Role = {
  title: string;
  period: string;
  duration: string;
  points: string[];
};

type Company = {
  company: string;
  location: string;
  tenure: string;
  span: string;
  roles: Role[];
  stack: string[];
};

export const experience: Company[] = [
  {
    company: "TechPassport",
    location: "London, UK (Remote)",
    tenure: "3 yrs 4 mos",
    span: "May 2023 to Sept 2026",
    roles: [
      {
        title: "Staff Software Engineer",
        period: "May 2023 to Sept 2026",
        duration: "3 yrs 4 mos",
        points: [
          "Architected and owned the complete monetization stack from scratch: Stripe payment integration, subscription management, and the full billing schema.",
          "Cut API response times by 75 to 80% through caching strategies, query optimization, and async refactoring across high-traffic endpoints.",
          "Engineered configurable supplier workflows with buyer-driven dynamic forms and complex D3.js relational data visualizations, expanding the product's core analytical capabilities.",
          "Drove the full design-to-engineering pipeline in Figma, with 10+ features shipped end to end from concept to production.",
        ],
      },
    ],
    stack: ["Stripe", "Node.js", "React", "PostgreSQL", "D3.js", "Figma"],
  },
  {
    company: "Vested Finance",
    location: "Berkeley, CA, USA (Remote)",
    tenure: "2 yrs",
    span: "June 2021 to May 2023",
    roles: [
      {
        title: "Engineering Lead",
        period: "June 2022 to May 2023",
        duration: "1 yr",
        points: [
          "Led the KYC/Compliance and Premium Management squads as engineering lead and de facto product owner: scoped roadmaps in the absence of PMs, ran delivery end to end, and owned the platform's entry-point flows.",
          "Extended onboarding from a single market to global users by integrating alternate KYC providers and building region-aware compliance and verification flows, unlocking international expansion.",
          "Shipped money-movement features spanning payment processing, ledger systems, and curated multi-asset investment collections on a platform handling live investor funds.",
          "Owned subscription management across the product, unifying billing across Stripe, Razorpay, and Google Play and Apple in-app purchases.",
          "Set technical direction for a 5+ engineer squad inside a 15+ member cross-functional team: authored system design documents, drove query optimization and structured logging, and mentored engineers through internal training.",
        ],
      },
      {
        title: "Software Engineer, then Senior Software Engineer",
        period: "June 2021 to June 2022",
        duration: "1 yr",
        points: [
          "Promoted twice in 12 months. Built core KYC, onboarding, and payment features across the platform's entry flows before stepping up to lead the squad.",
        ],
      },
    ],
    stack: ["KYC", "Stripe", "Razorpay", "Ledgers", "Node.js", "System design"],
  },
  {
    company: "GiveIndia",
    location: "Bengaluru, India (Remote)",
    tenure: "6 mos",
    span: "Jan 2021 to June 2021",
    roles: [
      {
        title: "Software Engineer",
        period: "Jan 2021 to June 2021",
        duration: "6 mos",
        points: [
          "Shipped UI features across 3+ high-traffic donation platforms and automated notification and database scripts.",
        ],
      },
    ],
    stack: ["React", "Node.js", "Automation"],
  },
  {
    company: "Pratilipi",
    location: "Bengaluru, India (Remote)",
    tenure: "6 mos",
    span: "Aug 2020 to Jan 2021",
    roles: [
      {
        title: "Software Engineer Intern",
        period: "Aug 2020 to Jan 2021",
        duration: "6 mos",
        points: [
          "Built the frontend for the platform's top-rated content discovery feature, serving millions of readers.",
        ],
      },
    ],
    stack: ["React", "Frontend"],
  },
];

export type CaseStudy = {
  id: string;
  title: string;
  where: string;
  tag: string;
  context?: string;
  did: string;
  outcome: string;
  metric?: string;
  metricLabel?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "monetization",
    title: "Monetization stack from zero",
    where: "TechPassport",
    tag: "Payments",
    context: "The platform needed a monetization layer and none existed.",
    did: "Designed the billing schema, integrated Stripe, and built subscription management. I architected it from scratch and own it end to end.",
    outcome: "TechPassport's complete monetization stack, built and run by one owner.",
    metric: "0 to 1",
    metricLabel: "billing schema, Stripe, subscriptions",
  },
  {
    id: "api-speed",
    title: "75 to 80% faster APIs",
    where: "TechPassport",
    tag: "Performance",
    context: "Critical, high-traffic endpoints were too slow.",
    did: "Caching strategies, query optimization, and async refactoring across the hot paths.",
    outcome: "Response times down 75 to 80% on the endpoints that matter most.",
    metric: "75-80%",
    metricLabel: "response time reduction",
  },
  {
    id: "workflows",
    title: "Configurable supplier workflows and relational visualizations",
    where: "TechPassport",
    tag: "Product engineering",
    did: "Built buyer-driven dynamic forms so supplier workflows can be configured per buyer, and complex relational data visualizations in D3.js.",
    outcome: "Expanded the product's core analytical capabilities.",
    metric: "D3.js",
    metricLabel: "relational data visualization",
  },
  {
    id: "figma",
    title: "Figma to production",
    where: "TechPassport",
    tag: "Design engineering",
    did: "Own the design-to-engineering pipeline end to end, from Figma concept through implementation and release.",
    outcome: "10+ features shipped from concept to production.",
    metric: "10+",
    metricLabel: "features shipped end to end",
  },
  {
    id: "kyc",
    title: "Global KYC onboarding",
    where: "Vested Finance",
    tag: "Compliance",
    context: "Onboarding only worked for a single market.",
    did: "Integrated alternate KYC providers and built region-aware compliance and verification flows.",
    outcome: "Onboarding opened to global users, unlocking the platform's international expansion.",
    metric: "1 to many",
    metricLabel: "markets served",
  },
  {
    id: "money",
    title: "Money movement on live investor funds",
    where: "Vested Finance",
    tag: "FinTech",
    did: "Shipped payment processing, ledger systems, and curated multi-asset investment collections on a platform handling real investor money.",
    outcome: "Production money-movement features where correctness is non-negotiable.",
    metric: "Live funds",
    metricLabel: "real investor money",
  },
  {
    id: "billing",
    title: "One billing layer, four providers",
    where: "Vested Finance",
    tag: "Billing",
    did: "Unified subscription management across Stripe, Razorpay, Google Play, and Apple in-app purchases.",
    outcome: "A single subscription model across web and mobile.",
    metric: "4",
    metricLabel: "billing providers unified",
  },
  {
    id: "lead",
    title: "Leading without a PM",
    where: "Vested Finance",
    tag: "Leadership",
    did: "Led the KYC/Compliance and Premium Management squads as Engineering Lead and de facto product owner. Scoped roadmaps, ran delivery end to end, and owned the platform's entry-point flows. Set technical direction for a 5+ engineer squad inside a 15+ member cross-functional team: system design documents, query optimization, structured logging, and internal training.",
    outcome: "Promoted twice in 12 months; recognized with the company's \"Owning the Problem\" award (Jan 2023).",
    metric: "2 in 12",
    metricLabel: "promotions in 12 months",
  },
];

export type Project = {
  name: string;
  kicker: string;
  summary: string;
  detail: string[];
  highlights: { label: string; value: string }[];
  stack: string[];
  live: string;
  liveLabel: string;
  repo: string;
  year: string;
  shot: string;
  shotAlt: string;
  shotMobile?: string;
  shotMobileAlt?: string;
  shotMobileLabel?: string;
};

export const projects: Project[] = [
  {
    name: "Crypto Trading App",
    kicker: "A Solana terminal that settles on mainnet",
    summary:
      "A Solana trading terminal that executes real swaps on mainnet. Not a paper-trading simulator.",
    detail: [
      "Discovery and analysis: trending tokens from live market data (Birdeye), token search (DexScreener), OHLCV candlestick charts, a live swap feed, holder concentration, on-chain safety heuristics (mint and freeze authority, liquidity depth, pair age), and optional OpenAI risk summaries.",
      "Execution: the server fetches Jupiter quotes and builds unsigned versioned transactions. The user signs with a Privy embedded wallet in the browser. The transaction is broadcast over RPC and confirmed on-chain. API keys stay server-side.",
      "There is no application database. Market state comes from providers and balances live on-chain.",
    ],
    highlights: [
      { label: "Execution", value: "Real swaps, confirmed on-chain" },
      { label: "Signing", value: "Privy embedded wallet, keys server-side" },
      { label: "Safety", value: "Mint and freeze authority, liquidity, pair age" },
      { label: "State", value: "No app database, on-chain balances" },
    ],
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Privy", "Solana RPC", "Jupiter", "Birdeye", "DexScreener", "OpenAI"],
    live: "https://crypto-trading-app-akm.vercel.app",
    liveLabel: "crypto-trading-app-akm.vercel.app",
    repo: "https://github.com/AnkitKumarMishra5/crypto-trading-app",
    year: "2026",
    shot: "/shots/crypto-trade.jpg",
    shotAlt:
      "The Crypto Trading App trading view with a candlestick price chart, market cap and liquidity stats, a safety and rug check panel, and an AI token intel summary",
  },
  {
    name: "Game Night",
    kicker: "Real-time party games, one room code away",
    summary:
      "Real-time multiplayer party games in a browser tab. One person creates a room, everyone else types the five-letter code, and the table plays on their own phones. No download, no account.",
    detail: [
      "An authoritative Node and Socket.IO server sends per-player state snapshots, so no client ever holds information its player should not see.",
      "The client is a zero-build vanilla JavaScript PWA. Five games ship with it, including social deduction, a co-operative counting puzzle, and an AI-judged rule-guessing game.",
      "LLM game logic is hardened against prompt injection, and 232 end-to-end checks drive real socket clients against the server.",
    ],
    highlights: [
      { label: "Server", value: "Authoritative, per-player snapshots" },
      { label: "Client", value: "Zero-build vanilla JS PWA" },
      { label: "Tests", value: "232 end-to-end checks on real sockets" },
      { label: "LLM", value: "Game logic hardened against injection" },
    ],
    stack: ["Node.js", "Socket.IO", "Vanilla JS", "PWA", "OpenAI", "Render"],
    live: "https://gamenightapp.onrender.com/",
    liveLabel: "gamenightapp.onrender.com",
    repo: "https://github.com/AnkitKumarMishra5/gamenightapp",
    year: "2026",
    shot: "/shots/gamenight.jpg",
    shotMobile: "/shots/gamenight-mobile.jpg",
    shotMobileLabel: "every phone is a seat",
    shotMobileAlt:
      "Game Night on a phone: enter a name, then create a room or join with a five-letter code",
    shotAlt:
      "The Game Night landing screen, where a player enters a name and either creates a room or joins with a code",
  },
  {
    name: "Outlay",
    kicker: "Every card you hold, reconciled every month",
    summary:
      "An expense tracker, validator and analyser for Indian credit card statements. It opens the password-protected PDF your bank emails you, checks its arithmetic, and turns a wallet of cards into one screen.",
    detail: [
      "Statements arrive locked. Outlay derives the password from the cardholder profile, trying fourteen issuer patterns in a preference order, and learns a new template from any password typed once, so the next card at that issuer opens unprompted. The file is unlocked and read in memory and never written to disk.",
      "Extraction is deterministic, with no model involved. Twelve checks then run before anything is persisted, the important one comparing computed debit and credit totals against the totals the bank printed, so a half-read statement announces itself instead of quietly skewing a year of numbers. The check record is stored with the statement.",
      "Every account is a tenant. Name, date of birth, card digits and statement passwords are sealed with AES-256-GCM under a key derived per account, so a leak scoped to one account cannot unseal another.",
      "The only optional model call rereads merchant names when the category rules get them wrong, metered at two runs per card per month.",
    ],
    highlights: [
      { label: "Passwords", value: "14 derived patterns, new ones learned" },
      { label: "Verification", value: "12 checks against the printed totals" },
      { label: "Encryption", value: "AES-256-GCM, per-account keys" },
      { label: "Statements", value: "Parsed in memory, never written to disk" },
    ],
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Postgres", "pdf.js", "Recharts", "Neon", "Vercel"],
    live: "https://outlay-expense-tracker.vercel.app/",
    liveLabel: "outlay-expense-tracker.vercel.app",
    repo: "https://github.com/AnkitKumarMishra5/outlay-expense-tracker",
    year: "2026",
    shot: "/shots/outlay.jpg",
    shotAlt:
      "The Outlay dashboard: nineteen cards ranked by spend, headline totals, a bills panel showing seventeen of nineteen settled this cycle, a spend trend chart and a category split donut",
    shotMobile: "/shots/outlay-mobile.jpg",
    shotMobileLabel: "the whole wallet, in a pocket",
    shotMobileAlt:
      "Outlay on a phone: the featured credit card above a list of cards ranked by spend, each with its due date and outstanding amount",
  },
  {
    name: "Investor Copilot",
    kicker: "Private markets, answered in plain language",
    summary:
      "A conversational assistant for private-markets investors. Ask about holdings, MOIC, DPI, RVPI, fees, capital calls, distributions, and statements in plain language.",
    detail: [
      "The core design rule: the model never invents a number. OpenAI tool calling handles intent and data access, all financial math runs in a deterministic compute layer over structured ledger data, and every answer returns the source rows plus a calculation trace.",
      "It handles multi-currency reporting (USD, GBP, EUR, AED), multi-round positions, partial capital calls, write-offs, down rounds, and partial secondaries.",
      "A golden-number eval suite verifies the compute layer without any model calls.",
    ],
    highlights: [
      { label: "Numbers", value: "Deterministic compute layer, not the model" },
      { label: "Auditability", value: "Source rows plus calculation trace" },
      { label: "Currencies", value: "USD, GBP, EUR, AED" },
      { label: "Testing", value: "Golden-number eval suite" },
    ],
    stack: ["Next.js", "TypeScript", "OpenAI tool calling", "Tailwind", "Vercel"],
    live: "https://investor-copilot.vercel.app",
    liveLabel: "investor-copilot.vercel.app",
    repo: "https://github.com/AnkitKumarMishra5/investor-copilot",
    year: "2026",
    shot: "/shots/investor-copilot.jpg",
    shotAlt:
      "Investor Copilot answering a portfolio question with total commitment, contributed and outstanding amounts broken down by sector, cited sources, and a link to show the math across nine source rows",
  },
];

export const skillGroups = [
  { name: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "HTML5", "CSS3"] },
  { name: "Front-end", items: ["React.js", "Next.js", "Angular", "Redux", "React Native", "Tailwind CSS", "Vite", "Jest", "D3.js"] },
  { name: "Back-end", items: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Microservices", "Event-Driven Architecture", "Kafka"] },
  { name: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Supabase", "Database optimization"] },
  { name: "Cloud and DevOps", items: ["AWS", "Google Cloud (GCP)", "Docker", "CI/CD", "GitHub Actions", "Firebase", "Vercel"] },
  { name: "AI and LLM", items: ["Generative AI", "LLM APIs (OpenAI, Anthropic, Gemini)", "RAG", "Vector databases", "AI agents", "Tool calling", "MCP", "Evals", "Prompt engineering", "n8n"] },
  { name: "Architecture", items: ["System design", "Distributed systems", "Performance optimization", "Full-stack development"] },
  { name: "Leadership", items: ["Technical leadership", "Engineering management", "Cross-functional teams", "Agile/Scrum"] },
  { name: "Design workflow", items: ["Figma (design-to-engineering pipeline)"] },
  { name: "Also used in projects", items: ["Solana RPC", "Jupiter", "Privy", "Birdeye", "DexScreener"] },
];

export const domains = [
  {
    name: "Range",
    items: [
      "Web apps and design systems",
      "REST and GraphQL APIs",
      "Real-time and event-driven systems",
      "Data visualisation",
      "LLM products and agents",
      "Mobile with React Native",
    ],
  },
  {
    name: "Depth: payments and billing",
    items: ["Stripe", "Razorpay", "Google Play and Apple in-app purchases", "Subscription management", "Billing schemas", "Payment gateways", "Ledger systems"],
  },
  {
    name: "Depth: KYC and compliance",
    items: ["KYC provider integration", "Region-aware verification and compliance flows", "Onboarding for global users", "RegTech workflows"],
  },
  { name: "Industries", items: industries },
];

export const teaching = {
  kicker: "Mentoring",
  title: "Leading engineers is the job.",
  accent: "Teaching is where I got good at it.",
  copy: "I'm an engineer first. Teaching live courses across 50+ batches and 1:1 coaching sessions is why I can take someone from stuck to shipping, write a review that teaches rather than blocks, and set technical direction a squad will actually follow.",
  credential:
    "Subject Matter Expert and lead instructor across several engineering schools.",
  stats: [
    { value: "50+", label: "batches of live courses taught" },
    { value: "50-100", label: "engineers per batch" },
    { value: "1,000+", label: "developers mentored" },
  ],
  platforms: ["Codecademy", "Coding Ninjas", "Masai School", "Cuvette", "AccioJob"],
};

export const education = {
  school: "Lovely Professional University",
  location: "Phagwara, Punjab",
  degree: "B.Tech in Computer Science and Engineering",
  year: "2020",
  grade: "CGPA 9.07/10",
};

export const awards = [
  { title: "Awarded for Driving Ownership Culture (\"Owning the Problem\")", org: "Vested Finance", date: "Jan 2023" },
  { title: "1st Runner Up, All India Research Competition, Zonal Round", org: "IIT Kanpur", date: "Mar 2020" },
  { title: "2nd Runner Up, GEEKFIESTA 24-hour coding hackathon", org: "GeeksforGeeks", date: "Nov 2019" },
];

export const navLinks = [
  { href: "#about", label: "About", priority: true },
  { href: "#systems", label: "Systems", priority: false },
  { href: "#work", label: "Work", priority: true },
  { href: "#projects", label: "Projects", priority: true },
  { href: "#source", label: "Source", priority: false },
  { href: "#ask", label: "Ask", priority: true },
  { href: "#workflow", label: "How I ship", priority: false },
  { href: "#experience", label: "Experience", priority: false },
  { href: "#contact", label: "Contact", priority: true },
];

export const companies = [
  { name: "TechPassport", detail: "RegTech, London", years: "2023 to 2026" },
  { name: "Vested Finance", detail: "Investing, Berkeley", years: "2021 to 2023" },
  { name: "GiveIndia", detail: "Donations, Bengaluru", years: "2021" },
  { name: "Pratilipi", detail: "Storytelling, Bengaluru", years: "2020 to 2021" },
];

export type TermLine =
  | { kind: "cmd"; text: string }
  | { kind: "step"; label: string; value: string; tone?: "ok" | "info" }
  | { kind: "sub"; text: string }
  | { kind: "done"; text: string };

export type Scenario = {
  id: string;
  tab: string;
  title: string;
  blurb: string;
  lines: TermLine[];
};

export const scenarios: Scenario[] = [
  {
    id: "payments",
    tab: "Payments",
    title: "A subscription payment, posted to the ledger",
    blurb:
      "Signature check, idempotency, then a double-entry posting. The parts that decide whether the money is right.",
    lines: [
      { kind: "cmd", text: "replay --event invoice.payment_succeeded" },
      { kind: "step", label: "stripe signature", value: "verified", tone: "ok" },
      { kind: "step", label: "idempotency key", value: "new", tone: "info" },
      { kind: "step", label: "subscription", value: "active", tone: "ok" },
      { kind: "step", label: "ledger posting", value: "double entry", tone: "info" },
      { kind: "sub", text: "debit   accounts_receivable    1,240.00 GBP" },
      { kind: "sub", text: "credit  revenue_subscriptions  1,240.00 GBP" },
      { kind: "step", label: "invoice", value: "marked paid", tone: "ok" },
      { kind: "done", text: "balanced, committed" },
    ],
  },
  {
    id: "kyc",
    tab: "KYC",
    title: "One applicant, routed by region",
    blurb:
      "The same onboarding call, resolved against the rules of whichever market the applicant is in.",
    lines: [
      { kind: "cmd", text: "onboarding verify --applicant applicant.json" },
      { kind: "step", label: "region", value: "resolved", tone: "ok" },
      { kind: "step", label: "provider", value: "selected by region", tone: "info" },
      { kind: "step", label: "document check", value: "pass", tone: "ok" },
      { kind: "step", label: "liveness", value: "pass", tone: "ok" },
      { kind: "step", label: "sanctions screen", value: "clear", tone: "ok" },
      { kind: "sub", text: "watchlists + PEP, no match" },
      { kind: "step", label: "risk band", value: "low", tone: "info" },
      { kind: "done", text: "approved, account opened" },
    ],
  },
  {
    id: "crypto",
    tab: "Crypto",
    title: "A swap, quoted to confirmed on mainnet",
    blurb:
      "The server quotes and builds the transaction, the user signs it in the browser, the chain settles it. API keys never leave the server.",
    lines: [
      { kind: "cmd", text: "swap --from SOL --to USDC" },
      { kind: "step", label: "jupiter quote", value: "received", tone: "info" },
      { kind: "step", label: "safety checks", value: "mint, freeze, liquidity", tone: "ok" },
      { kind: "step", label: "transaction", value: "built unsigned", tone: "info" },
      { kind: "sub", text: "the server builds it, only the user can sign it" },
      { kind: "step", label: "signature", value: "Privy wallet, in browser", tone: "ok" },
      { kind: "step", label: "broadcast", value: "sent over RPC", tone: "info" },
      { kind: "done", text: "confirmed on-chain, settled on mainnet" },
    ],
  },
  {
    id: "ai",
    tab: "AI",
    title: "A question about money, answered without guessing",
    blurb:
      "The model routes and explains. It never does the arithmetic. That runs in code, and every figure carries its rows.",
    lines: [
      { kind: "cmd", text: 'ask "what is my portfolio MOIC?"' },
      { kind: "step", label: "intent", value: "holdings.performance", tone: "info" },
      { kind: "step", label: "tool call", value: "get_allocations()", tone: "info" },
      { kind: "step", label: "tool call", value: "compute_moic()", tone: "info" },
      { kind: "sub", text: "arithmetic runs in the compute layer, not the model" },
      { kind: "step", label: "answer", value: "MOIC 2.41x", tone: "ok" },
      { kind: "step", label: "citations", value: "9 source rows", tone: "ok" },
      { kind: "done", text: "returned with a calculation trace" },
    ],
  },
];

export const availability = {
  status: "Available now",
  line: "Available immediately, and taking conversations for the next role.",
  modes: [
    {
      label: "Full-time",
      detail: "Full Stack Engineer, Frontend Engineer, Backend Engineer, Platform Engineer, Forward Deployed Engineer, Engineering Lead, Technical Lead or Engineering Manager. Senior and Staff levels both work.",
    },
    {
      label: "Contract and part-time",
      detail: "Scoped delivery on payments, billing, KYC and compliance, frontend or backend rebuilds, API performance, or an LLM feature that needs to be right.",
    },
    {
      label: "Fractional CTO",
      detail: "Technical direction, architecture review, hiring and code review for teams without a senior engineering lead.",
    },
  ],
  location: "Remote-first, worldwide. Open to relocating to the UK or the EU.",
};

export const aiSuggestions = [
  "What has he actually shipped in payments?",
  "How did he cut API response times?",
  "What roles is he open to?",
  "What is the most interesting thing he has built?",
];

type WorkflowStep = {
  id: string;
  step: string;
  title: string;
  tools: string[];
  body: string;
};

export const workflow: WorkflowStep[] = [
  {
    id: "spec",
    step: "01",
    title: "I write the spec",
    tools: ["Spec Kit", "specify", "plan", "tasks"],
    body: "Before any code, I write the spec myself: what the system does, what it must not do, and how I will know it works. It is version controlled and it is the contract. The agent plans against that, not a prompt I typed once.",
  },
  {
    id: "agents",
    step: "02",
    title: "Agents draft, I review every diff",
    tools: ["Claude Code", "Codex CLI", "Cursor"],
    body: "Agents run the implementation passes. I read every diff line by line the way I review a pull request, and nothing merges that I cannot explain. Different agents suit different passes, so I move between them.",
  },
  {
    id: "extend",
    step: "03",
    title: "I teach it once, then reuse it",
    tools: ["Skills", "MCP", "Connectors", "Plugins"],
    body: "I author the Skills that package expertise for a repeated task. MCP servers and connectors give the agent scoped access to the systems it needs. Plugins bundle the lot so a workflow travels with the repo.",
  },
  {
    id: "context",
    step: "04",
    title: "Context lives in the repo",
    tools: ["AGENTS.md", "CLAUDE.md", "transcripts"],
    body: "The rules I set sit in AGENTS.md and CLAUDE.md, committed next to the code. Specs and session transcripts land as markdown, so the reasoning behind a decision survives the chat window and is reviewable months later.",
  },
  {
    id: "automate",
    step: "05",
    title: "The repeatable parts run themselves",
    tools: ["n8n", "GitHub Actions"],
    body: "Once a flow stops being interesting it becomes an n8n workflow or a CI job, with the checks that catch it when it drifts. Anything I have done by hand three times is a candidate.",
  },
];

export const guardrails = {
  title: "What never gets delegated",
  items: [
    "Schema design and API contracts",
    "Anything touching auth, money movement or a ledger",
    "Migrations and other irreversible changes",
    "The final diff review before merge",
    "Production incidents and the postmortem after",
  ],
};

type DiffLine = { kind: "ctx" | "add" | "del" | "note"; text: string };

export const reviewDiff = {
  file: "search/suppliers.ts",
  branch: "agent/supplier-lookup-n-plus-one",
  approved: false,
  lines: [
    { kind: "ctx", text: "export async function listSuppliers(where: Filter) {" },
    { kind: "del", text: "  const rows = await db.supplier.findMany({ where });" },
    { kind: "del", text: "  for (const row of rows) {" },
    { kind: "del", text: "    row.contacts = await db.contact.findMany({" },
    { kind: "del", text: "      where: { supplierId: row.id }," },
    { kind: "add", text: "  const rows = await db.supplier.findMany({" },
    { kind: "add", text: "    where," },
    { kind: "add", text: "    include: { contacts: true }," },
    { kind: "add", text: "  });" },
    { kind: "add", text: "" },
    { kind: "add", text: "  return cache.wrap(cacheKey(where), rows, TTL);" },
    { kind: "ctx", text: "}" },
    { kind: "note", text: "240 round trips became 1. This is where the 75 to 80% came from." },
  ] as DiffLine[],
};


export const profileLog = [
  "[boot]  resolving engineer profile ...",
  "[ok]    name         Ankit Kumar Mishra",
  "[ok]    title        Full-Stack Engineer",
  "[ok]    years        6",
  "[ok]    based        Mangalore, India",
  "[ok]    remote       US, UK, EU",
  "",
  "[scan]  depth ...",
  "[ok]      payments   Stripe, Razorpay, IAP",
  "[ok]      billing    schema, subs, ledgers",
  "[ok]      kyc        region-aware checks",
  "[ok]      compliance RegTech onboarding",
  "",
  "[scan]  range ...",
  "[ok]      web        React, Next.js",
  "[ok]      api        REST, GraphQL, events",
  "[ok]      realtime   Socket.IO, authoritative",
  "[ok]      ai         RAG, MCP, evals",
  "",
  "[perf]  latency      -75 to 80% hot paths",
  "[team]  team         15+ members, 2 squads",
  "[edu]   mentored     1,000+ developers",
  "",
  "[ok]    available    true",
  "[hint]  reach        ankit5kumar14@gmail.com",
  "",
];


type SourceFile = {
  folder: string | null;
  name: string;
  code: string;
  cmd: string;
  out: string[];
};

export const sourceFiles: SourceFile[] = [
  {
    folder: "profile",
    name: "me.json",
    cmd: "profile --resolve",
    out: [
      "[boot]  resolving engineer profile ...",
      "[ok]    name         Ankit Kumar Mishra",
      "[ok]    years        6",
      "[ok]    based        Mangalore, India",
      "[ok]    available    true",
    ],
    code: `{
  "name": "Ankit Kumar Mishra",
  "title": "Full-Stack Engineer and Engineering Lead",
  "based": "Mangalore, India",
  "years": 6,
  "depth": ["payments", "billing", "KYC", "compliance"],
  "range": ["web apps", "APIs", "real-time", "LLM products"],
  "available": true
}`,
  },
  {
    folder: "profile",
    name: "principles.json",
    cmd: "rules --check",
    out: [
      "[scan]  reading principles.json ...",
      "[ok]    spec before code",
      "[ok]    idempotent writes, explicit transitions",
      "[ok]    nothing merges unexplained",
      "[warn]  on-call is not a handoff",
    ],
    code: `{
  "specFirst": "The spec comes before the code.",
  "writes": "Idempotent. Explicit state transitions.",
  "review": "Nothing merges that I cannot explain.",
  "observability": "Structured logging beats a debugger at 3am.",
  "tests": "They prove the numbers reconcile.",
  "onCall": "Part of the job, not a handoff."
}`,
  },
  {
    folder: "work",
    name: "experience.json",
    cmd: "tenure --summary",
    out: [
      "[calc]  summing tenures ...",
      "[ok]    TechPassport     3 yrs 4 mos",
      "[ok]    Vested Finance   2 yrs     (2 promotions)",
      "[ok]    GiveIndia        6 mos",
      "[ok]    Pratilipi        6 mos",
      "[ok]    total            6 yrs+",
    ],
    code: `[
  {
    "company": "TechPassport",
    "tenure": "3 yrs 4 mos",
    "role": "Staff Software Engineer",
    "owned": ["monetization stack", "Stripe", "billing schema"],
    "shipped": "API latency down 75-80%"
  },
  {
    "company": "Vested Finance",
    "tenure": "2 yrs",
    "role": "Engineering Lead",
    "squads": ["KYC/Compliance", "Premium Management"],
    "promotions": 2
  },
  { "company": "GiveIndia", "tenure": "6 mos" },
  { "company": "Pratilipi", "tenure": "6 mos" }
]`,
  },
  {
    folder: "work",
    name: "billing.json",
    cmd: "billing providers --list",
    out: [
      "[scan]  enumerating providers ...",
      "[ok]    stripe          subscriptions, invoices",
      "[ok]    razorpay        India rails",
      "[ok]    google play     in-app purchase",
      "[ok]    apple iap       in-app purchase",
      "[ok]    reconciled      one subscription state",
    ],
    code: `{
  "problem": "Four billing providers, one subscription truth.",
  "providers": ["Stripe", "Razorpay", "Google Play", "Apple IAP"],
  "unified": ["plans", "renewals", "cancellations", "refunds"],
  "surfaces": ["web", "iOS", "Android"],
  "ledger": "double entry, posted in one transaction",
  "result": "a single subscription state, whatever the customer paid with"
}`,
  },
  {
    folder: "work",
    name: "kyc.json",
    cmd: "onboarding verify --region auto",
    out: [
      "[net]   resolving applicant region ...",
      "[ok]    region          resolved",
      "[ok]    provider        selected by region",
      "[ok]    documents       pass",
      "[ok]    liveness        pass",
      "[ok]    sanctions       clear (watchlists + PEP)",
      "[done]  approved, account opened",
    ],
    code: `{
  "problem": "Onboarding only worked for a single market.",
  "built": [
    "alternate KYC provider integrations",
    "region-aware compliance and verification flows"
  ],
  "checks": ["documents", "liveness", "sanctions", "watchlists + PEP"],
  "outcome": "global onboarding, unlocking international expansion",
  "constraint": "live investor funds, every change audited"
}`,
  },
  {
    folder: "projects",
    name: "crypto-trading.json",
    cmd: "swap --quote SOL/USDC",
    out: [
      "[net]   fetching Jupiter quote ...",
      "[ok]    quote           received",
      "[ok]    transaction     built unsigned, server-side",
      "[ok]    signature       Privy wallet, in the browser",
      "[ok]    broadcast       RPC, confirmed on-chain",
      "[done]  settled on mainnet, not a simulator",
    ],
    code: `{
  "name": "Crypto Trading App",
  "what": "a Solana terminal that settles on mainnet",
  "execution": "Jupiter quotes, unsigned versioned transactions",
  "signing": "Privy embedded wallet, API keys stay server-side",
  "safety": ["mint authority", "freeze authority", "liquidity depth", "pair age"],
  "database": "none, market state from providers, balances on-chain",
  "live": "crypto-trading-app-akm.vercel.app"
}`,
  },
  {
    folder: "projects",
    name: "gamenight.json",
    cmd: "npm run test:e2e",
    out: [
      "[run]   driving real socket clients ...",
      "[ok]    rooms           create, join, rejoin",
      "[ok]    snapshots       per-player, no leaked state",
      "[ok]    llm judge       injection attempts rejected",
      "[ok]    checks          232 passed, 0 failed",
      "[done]  no client trusted",
    ],
    code: `{
  "name": "Game Night",
  "what": "real-time multiplayer party games in a browser tab",
  "server": "authoritative Node + Socket.IO, per-player snapshots",
  "client": "zero-build vanilla JS PWA, no download, no account",
  "games": 5,
  "llm": "game logic hardened against prompt injection",
  "tests": "232 end-to-end checks on real sockets",
  "live": "gamenightapp.onrender.com"
}`,
  },
  {
    folder: "projects",
    name: "investor-copilot.json",
    cmd: 'ask "what is my portfolio MOIC?"',
    out: [
      "[ok]    intent          holdings.performance",
      "[ok]    tool call       get_allocations()",
      "[ok]    tool call       compute_moic()",
      "[info]  arithmetic runs in code, not the model",
      "[ok]    answer          MOIC 2.41x, 9 source rows",
      "[done]  returned with a calculation trace",
    ],
    code: `{
  "name": "Investor Copilot",
  "what": "a conversational assistant for private-markets investors",
  "rule": "the model never invents a number",
  "math": "deterministic compute layer over structured ledger data",
  "answers": "source rows plus a calculation trace, every time",
  "currencies": ["USD", "GBP", "EUR", "AED"],
  "evals": "golden-number suite, verified without model calls",
  "live": "investor-copilot.vercel.app"
}`,
  },
  {
    folder: "teaching",
    name: "mentorship.json",
    cmd: "mentorship --stats",
    out: [
      "[calc]  summing batches ...",
      "[ok]    course batches  50+",
      "[ok]    batch size      50-100 engineers",
      "[ok]    mentored        1,000+ developers",
      "[ok]    platforms       5",
      "[done]  still taking mentees",
    ],
    code: `{
  "role": "Subject Matter Expert and lead instructor",
  "batches": "live courses across 50+ batches",
  "batchSize": "50-100 engineers per batch",
  "mentored": "1,000+ developers",
  "platforms": ["Codecademy", "Coding Ninjas", "Masai School", "Cuvette", "AccioJob"],
  "why": "it is why I can take someone from stuck to shipping"
}`,
  },
  {
    folder: "stack",
    name: "stack.json",
    cmd: "stack --tree",
    out: [
      "[scan]  walking stack.json ...",
      "[ok]    languages      4",
      "[ok]    runtime        3",
      "[ok]    data           4",
      "[ok]    cloud          4",
      "[ok]    ai             5",
    ],
    code: `{
  "languages": ["TypeScript", "JavaScript", "Python", "SQL"],
  "runtime": ["Node.js", "Express", "Next.js"],
  "data": ["PostgreSQL", "MongoDB", "Redis", "Kafka"],
  "cloud": ["AWS", "GCP", "Docker", "Vercel"],
  "ai": ["OpenAI", "Anthropic", "RAG", "MCP", "evals"],
  "leading": ["system design", "code review", "mentoring"]
}`,
  },
  {
    folder: null,
    name: "contact.json",
    cmd: "contact --ping",
    out: [
      "[net]   resolving inbox ...",
      "[ok]    email          ankit5kumar14@gmail.com",
      "[ok]    reply window   same day, usually",
      "[ok]    open to        full-time, contract, fractional",
      "[done]  say hello",
    ],
    code: `{
  "email": "ankit5kumar14@gmail.com",
  "linkedin": "in/ankitkumarmishra",
  "github": "AnkitKumarMishra5",
  "openTo": ["full-time", "contract", "fractional"],
  "responds": "same day, usually"
}`,
  },
];

export const agentTranscript = [
  { role: "user", text: "what has Ankit actually shipped in payments?" },
  { role: "think", text: "Reading data.ts ..." },
  { role: "tool", text: "grep \"billing\" src/lib/data.ts  ·  6 matches" },
  { role: "think", text: "Cross-checking experience.json ..." },
  {
    role: "agent",
    text: "He owns the monetization stack at TechPassport. Stripe, subscription management and the billing schema, built from zero.",
  },
  { role: "user", text: "and the latency number?" },
  { role: "think", text: "Fetching the case study ..." },
  { role: "tool", text: "read work/experience.json" },
  {
    role: "agent",
    text: "75 to 80% off the critical endpoints. Caching, query shape, async refactoring on the hot paths.",
  },
  { role: "think", text: "Anything on leadership?" },
  { role: "tool", text: "read teaching/mentorship.json" },
  {
    role: "agent",
    text: "Two squads without a PM, inside a 15+ member cross-functional team. 1,000+ engineers mentored.",
  },
  { role: "done", text: "Done. 3 sources cited." },
];


