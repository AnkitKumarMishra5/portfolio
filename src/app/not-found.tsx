import type { Metadata } from "next";
import Link from "next/link";
import { person } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col justify-center px-6 py-24">
      <p className="mono text-[12px] text-accent-ink">404</p>
      <h1 className="h-display mt-4 text-[clamp(2.2rem,6vw,3.6rem)] text-ink">
        That page is not here.
      </h1>
      <p className="mt-5 max-w-xl text-pretty text-[16px] leading-[1.65] text-ink-2">
        Everything on this site lives on one page plus the resume. Pick one of those,
        or email me at{" "}
        <a href={`mailto:${person.email}`} className="text-accent-ink link-sweep">
          {person.email}
        </a>
        .
      </p>
      <nav className="mt-9 flex flex-wrap gap-3 text-[14px]">
        <Link
          href="/"
          className="rounded-full bg-accent px-5 py-3 font-medium text-on-accent"
        >
          Back to the portfolio
        </Link>
        <Link
          href="/resume"
          className="rounded-full border border-line-2 px-5 py-3 text-ink"
        >
          Read the resume
        </Link>
        <Link
          href="/#projects"
          className="rounded-full border border-line-2 px-5 py-3 text-ink"
        >
          See the projects
        </Link>
      </nav>
    </main>
  );
}
