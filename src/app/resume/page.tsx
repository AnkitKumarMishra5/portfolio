import type { Metadata } from "next";
import Link from "next/link";
import {
  about,
  awards,
  education,
  experience,
  person,
  projects,
  skillGroups,
  teaching,
} from "@/lib/data";
import { SITE_URL, absolute } from "@/lib/site";
import { resumeJsonLd, serializeJsonLd } from "@/lib/jsonld";
import { IconArrowUpRight, IconDownload } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Resume",
  description: `Full resume for ${person.name}: ${person.headline}. Payments, billing, KYC and compliance, API performance, and LLM systems across FinTech and RegTech.`,
  alternates: {
    canonical: "/resume",
    types: { "application/pdf": absolute(person.resume) },
  },
  openGraph: {
    title: `Resume | ${person.name}`,
    description: person.shortBio,
    url: `${SITE_URL}/resume`,
  },
};

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="label mb-6 text-[10px]">{title}</h2>
      {children}
    </section>
  );
}

export default function ResumePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(resumeJsonLd) }}
      />
      <nav className="no-print mb-12 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[13.5px] text-ink-2 transition-colors hover:text-ink"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="link-sweep">Back to the portfolio</span>
        </Link>
        <a
          href={person.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface/50 px-4 py-2 text-[13px] text-ink transition-colors hover:border-line-3"
        >
          <IconDownload className="size-3.5 text-ink-3 transition-transform group-hover:translate-y-0.5" />
          Download PDF
        </a>
      </nav>

      <header>
        <h1 className="h-display text-[clamp(2.2rem,6vw,3.2rem)] text-ink">
          {person.name}
        </h1>
        <p className="mt-3 text-[17px] text-ink-2">{person.headline}</p>
        <p className="mt-1.5 text-[15px] text-ink-3">
          {person.role} at {person.company}, {person.companyLocation}
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
          <li>
            <a href={`mailto:${person.email}`} className="text-accent-ink link-sweep">
              {person.email}
            </a>
          </li>
          <li>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-ink link-sweep"
            >
              linkedin.com/in/ankitkumarmishra
            </a>
          </li>
          <li>
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-ink link-sweep"
            >
              github.com/AnkitKumarMishra5
            </a>
          </li>
          <li className="text-ink-3">{person.location}</li>
        </ul>
      </header>

      <Block title="Summary">
        <div className="space-y-4">
          {about.map((p, i) => (
            <p key={i} className="text-pretty text-[15px] leading-[1.7] text-ink-2">
              {p}
            </p>
          ))}
        </div>
      </Block>

      <Block title="Experience">
        <div className="space-y-9">
          {experience.map((job) => (
            <article key={job.company}>
              <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ink">
                {job.company}{" "}
                <span className="ml-2 text-[14px] font-normal text-ink-3">
                  {job.tenure}
                </span>
              </h3>
              <p className="mt-1 text-[14px] text-ink-2">{job.location}</p>
              <p className="mono mt-1 text-[12.5px] text-ink-4">{job.span}</p>

              <div className="mt-4 space-y-5">
                {job.roles.map((role) => (
                  <div key={role.title}>
                    <p className="text-[15px] font-medium text-ink">
                      {role.title}{" "}
                      <span className="ml-2 text-[13px] font-normal text-ink-4">
                        {role.period}
                      </span>
                    </p>
                    <ul className="mt-2 space-y-2">
                      {role.points.map((point, i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 text-[14.5px] leading-[1.65] text-ink-2"
                        >
                          <span aria-hidden className="mt-[9px] size-1 shrink-0 rounded-full bg-accent-ink/60" />
                          <span className="text-pretty">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[13.5px] text-ink-3">
                Stack: {job.stack.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </Block>

      <Block title="Selected projects">
        <p className="mb-6 text-[13.5px] text-ink-3">
          A selection of my work. More on{" "}
          <a href={person.github} target="_blank" rel="noopener noreferrer" className="text-accent-ink link-sweep">
            GitHub
          </a>
          .
        </p>
        <div className="space-y-7">
          {projects.map((p) => (
            <article key={p.name}>
              <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ink">
                {p.name}
              </h3>
              <p className="mt-2 text-pretty text-[14.5px] leading-[1.65] text-ink-2">
                {p.summary}
              </p>
              <p className="mt-2 text-[13.5px] text-ink-3">
                Stack: {p.stack.join(", ")}
              </p>
              <p className="mt-2 flex flex-wrap gap-x-4 text-[13.5px]">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent-ink"
                >
                  {p.liveLabel}
                  <IconArrowUpRight className="size-3" />
                </a>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent-ink"
                >
                  Source
                  <IconArrowUpRight className="size-3" />
                </a>
              </p>
            </article>
          ))}
        </div>
      </Block>

      <Block title="Skills">
        <dl className="space-y-3.5">
          {skillGroups.map((g) => (
            <div key={g.name} className="sm:flex sm:gap-5">
              <dt className="text-[13.5px] text-ink-4 sm:w-44 sm:shrink-0">
                {g.name}
              </dt>
              <dd className="text-[14.5px] leading-relaxed text-ink-2">
                {g.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title="Teaching">
        <p className="text-[14.5px] leading-[1.65] text-ink-2">
          {teaching.credential} {teaching.copy} Scale:{" "}
          {teaching.stats.map((x) => `${x.value} ${x.label}`).join(", ")}.
          Platforms: {teaching.platforms.join(", ")}.
        </p>
      </Block>

      <Block title="Education">
        <h3 className="text-[16px] font-medium text-ink">{education.degree}</h3>
        <p className="mt-1 text-[14.5px] text-ink-2">
          {education.school}, {education.location}
        </p>
        <p className="mono mt-1 text-[12.5px] text-ink-4">
          {education.year} · {education.grade}
        </p>
      </Block>

      <Block title="Awards">
        <ul className="space-y-2.5">
          {awards.map((a) => (
            <li key={a.title} className="text-[14.5px] leading-relaxed text-ink-2">
              {a.title}. {a.org}, {a.date}.
            </li>
          ))}
        </ul>
      </Block>
    </main>
  );
}
