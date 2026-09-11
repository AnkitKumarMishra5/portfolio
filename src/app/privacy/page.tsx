import type { Metadata } from "next";
import Link from "next/link";
import { person } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${person.name}'s portfolio measures visits: no cookies, no third-party trackers, no advertising, and what the "Ask the page" assistant sends to OpenAI.`,
  alternates: { canonical: "/privacy" },
  openGraph: { title: `Privacy | ${person.name}`, url: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
};

const UPDATED = "9 September 2026";

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 text-[19px] font-medium tracking-[-0.01em] text-ink">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-pretty text-[15.5px] leading-[1.7] text-ink-2">{children}</p>;
}
function L({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-ink-2">
          <span aria-hidden className="mt-[10px] size-1 shrink-0 rounded-full bg-accent-ink/60" />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <nav className="mb-12">
        <Link href="/" className="group inline-flex items-center gap-2 text-[13.5px] text-ink-2 transition-colors hover:text-ink">
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">←</span>
          <span className="link-sweep">Back to the portfolio</span>
        </Link>
      </nav>

      <p className="label text-[10px]">Privacy</p>
      <h1 className="h-display mt-4 text-[clamp(2.2rem,6vw,3.2rem)] text-ink">
        What this site knows about your visit.
      </h1>
      <P>
        This is a personal portfolio. It has no accounts, no cookies, no advertising and
        no third-party analytics. It does keep a small first-party record of how it is
        used, so I know whether the site does its job, and this page says exactly what
        that record contains. Last updated {UPDATED}.
      </P>

      <H>What is recorded</H>
      <P>When a page opens, and when it closes, the browser sends a short message to this site only. It contains:</P>
      <L
        items={[
          <>The page you opened and where you came from: the referring site if your browser shares it, and a campaign tag from the link if it happens to carry one.</>,
          <>Your country, region and city, as already resolved by the hosting provider from the connection. Your IP address itself is never stored.</>,
          <>A coarse picture of the device: phone or desktop, operating system and browser family, screen and window size, language, timezone, light or dark theme, and whether reduced motion is on.</>,
          <>How the visit went: how long the tab was visible, how far you scrolled, which sections came into view, and the page’s own speed measurements (Core Web Vitals).</>,
          <>Which of the site’s outbound links you clicked: email, LinkedIn, GitHub, the resume, and the links to my projects.</>,
          <>Questions typed into “Ask the page”, trimmed to 200 characters, so I can see what the page fails to answer.</>,
        ]}
      />

      <H>How visits are counted</H>
      <P>
        Nothing is written to your device. Each request is counted under a pseudonym made
        by hashing your IP address and browser signature together with a secret and the
        current date. That is enough to tell two page views from one person apart from two
        people on the same day, and no more: tomorrow the same browser is a new visitor,
        and the raw address is never kept. This is the same approach privacy-first analytics
        services such as Plausible and Fathom use, and it is why there is no cookie banner.
      </P>

      <H>What is deliberately not collected</H>
      <L
        items={[
          <>No cookies, no local storage identifiers, no cross-site tracking, no fingerprinting (no canvas, audio or font probing).</>,
          <>No third-party scripts of any kind: no Google Analytics, no tag managers, no ad or social pixels.</>,
          <>No IP addresses and no third-party geolocation lookups.</>,
          <>Nothing about you is ever sold, shared or combined with other data. The record exists to answer “is anyone reading this, and from where?”.</>,
        ]}
      />

      <H>“Ask the page”</H>
      <P>
        The assistant on the home page answers from the text of this site. To do that,
        the question you type is sent to OpenAI’s API together with that text. No name,
        email address, identifier or location goes with it. Under OpenAI’s API terms the
        request is not used to train their models. If you would rather not use it, every
        answer it can give is already written on the page.
      </P>

      <H>Your choices</H>
      <L
        items={[
          <>If your browser sends the Global Privacy Control signal or has Do Not Track turned on, this site records nothing at all for your visit.</>,
          <>Content blockers that stop first-party analytics work here too. The site does not try to get around them.</>,
          <>The record is pseudonymous, so I cannot look up an individual visitor. If you want everything about a visit removed anyway, email me with the approximate date and time and I will clear that window.</>,
        ]}
      />

      <H>Retention and legal basis</H>
      <P>
        The log keeps a rolling window of roughly the most recent fifty thousand events;
        older entries drop off automatically. Where the GDPR or UK GDPR applies, the basis
        for this measurement is legitimate interest (Article 6(1)(f)): understanding how a
        personal website is used, with data minimised to the point where no individual is
        identifiable.
      </P>

      <H>Contact</H>
      <P>
        Questions about any of this go to{" "}
        <a href={`mailto:${person.email}`} className="text-accent-ink link-sweep">
          {person.email}
        </a>
        . The site’s source is public at{" "}
        <a href="https://github.com/AnkitKumarMishra5/portfolio" className="text-accent-ink link-sweep" rel="noopener">
          github.com/AnkitKumarMishra5/portfolio
        </a>
        , including the code that does the measuring.
      </P>
    </main>
  );
}
