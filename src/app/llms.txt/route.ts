import {
  about,
  availability,
  awards,
  caseStudies,
  education,
  faqs,
  guardrails,
  experience,
  person,
  positioning,
  projects,
  skillGroups,
  stats,
  teaching,
  workflow,
} from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${person.name}

> ${person.shortBio}

${person.headline}. ${person.role} at ${person.company} (${person.companyLocation}). ${person.locationLong}

- Email: ${person.email}
- LinkedIn: ${person.linkedin}
- GitHub: ${person.github}
- X: ${person.x}
- Resume (PDF): ${SITE_URL}${person.resume}
- Resume (HTML): ${SITE_URL}/resume
- Privacy: ${SITE_URL}/privacy

## Common questions

${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## About

${positioning}

${about.join("\n\n")}

## Core numbers

${stats.map((s) => `- ${s.display ?? `${s.prefix ?? ""}${s.value!.toLocaleString("en-US")}${s.suffix ?? ""}`} ${s.label}`).join("\n")}

## Experience

${experience
  .map(
    (c) =>
      `### ${c.company} (${c.tenure})\n${c.span} · ${c.location}\nStack: ${c.stack.join(", ")}\n\n${c.roles
        .map(
          (r) =>
            `**${r.title}** (${r.period}, ${r.duration})\n${r.points.map((p) => `- ${p}`).join("\n")}`
        )
        .join("\n\n")}`
  )
  .join("\n\n")}

## Selected work

${caseStudies
  .map(
    (c) =>
      `### ${c.title}\nWhere: ${c.where}\n${c.context ? `Context: ${c.context}\n` : ""}Did: ${c.did}\nOutcome: ${c.outcome}`
  )
  .join("\n\n")}

## Side projects

A selection of the ones worth reading about. More repositories at ${person.github}.

${projects
  .map(
    (p) =>
      `### ${p.name}\n${p.summary}\n\n${p.detail.join("\n\n")}\n\nStack: ${p.stack.join(", ")}\nLive: ${p.live}\nSource: ${p.repo}`
  )
  .join("\n\n")}

## How I work with AI

${workflow.map((w) => `### ${w.title}\nTools: ${w.tools.join(", ")}\n${w.body}`).join("\n\n")}

### ${guardrails.title}
${guardrails.items.map((i) => `- ${i}`).join("\n")}

## Availability

${availability.status}. ${availability.line}
${availability.modes.map((m) => `- ${m.label}: ${m.detail}`).join("\n")}
${availability.location}

## Skills

${skillGroups.map((g) => `- ${g.name}: ${g.items.join(", ")}`).join("\n")}

## Teaching

${teaching.credential} ${teaching.copy} Scale: ${teaching.stats.map((x) => `${x.value} ${x.label}`).join(", ")}. Platforms: ${teaching.platforms.join(", ")}.

## Education

${education.degree}, ${education.school}, ${education.location}, ${education.year}. ${education.grade}.

## Awards

${awards.map((a) => `- ${a.title}, ${a.org}, ${a.date}`).join("\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
