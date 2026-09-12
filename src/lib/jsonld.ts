import {
  awards,
  education,
  experience,
  faqs,
  person,
  profiles,
  projects,
  skillGroups,
} from "@/lib/data";
import { SITE_NAME, SITE_URL, absolute } from "@/lib/site";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const BUILT_AT = new Date().toISOString();

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: person.name,
  alternateName: [...person.alternateNames],
  givenName: "Ankit",
  additionalName: "Kumar",
  familyName: "Mishra",
  identifier: person.githubHandle,
  jobTitle: [...person.jobTitles],
  worksFor: { "@type": "Organization", name: person.company },
  description: person.shortBio,
  email: `mailto:${person.email}`,
  url: SITE_URL,
  mainEntityOfPage: SITE_URL,
  image: {
    "@type": "ImageObject",
    url: absolute(person.photo),
    caption: `${person.name}, ${person.headline}`,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  nationality: { "@type": "Country", name: "India" },
  knowsLanguage: ["en", "hi"],
  sameAs: [...profiles],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Phagwara",
      addressRegion: "Punjab",
      addressCountry: "IN",
    },
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: education.degree,
    educationalLevel: "Bachelor's degree",
    recognizedBy: { "@type": "CollegeOrUniversity", name: education.school },
    dateCreated: education.year,
  },
  award: awards.map((a) => `${a.title} (${a.org}, ${a.date})`),
  knowsAbout: skillGroups.flatMap((g) => g.items).slice(0, 40),
  hasOccupation: experience.flatMap((c) =>
    c.roles.map((r) => ({
      "@type": "Occupation",
      name: r.title,
      occupationLocation: { "@type": "Place", name: c.location },
      description: r.points[0],
    }))
  ),
  subjectOf: { "@id": `${SITE_URL}/#profilepage` },
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: [`${person.name} Portfolio`, "ankitkumarmishra.is-a.dev"],
  description: person.shortBio,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
  author: { "@id": PERSON_ID },
  copyrightHolder: { "@id": PERSON_ID },
  copyrightYear: 2026,
};

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    personNode,
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: `${person.name} | ${person.headline}`,
      description: person.seoDescription,
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      isPartOf: { "@id": WEBSITE_ID },
      inLanguage: "en",
      dateCreated: "2026-09-01",
      dateModified: BUILT_AT,
      primaryImageOfPage: absolute(person.photo),
    },
    websiteNode,
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      isPartOf: { "@id": `${SITE_URL}/#profilepage` },
      about: { "@id": PERSON_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    ...projects.map((p) => ({
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#project-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: p.name,
      description: p.summary,
      url: p.live,
      image: absolute(p.shot),
      screenshot: absolute(p.shot),
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
      datePublished: p.year,
      author: { "@id": PERSON_ID },
      creator: { "@id": PERSON_ID },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      isBasedOn: {
        "@type": "SoftwareSourceCode",
        name: `${p.name} source`,
        codeRepository: p.repo,
        programmingLanguage: p.stack[1] === "TypeScript" ? "TypeScript" : "JavaScript",
        author: { "@id": PERSON_ID },
      },
    })),
  ],
};

export const resumeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/resume#webpage`,
      url: `${SITE_URL}/resume`,
      name: `Resume | ${person.name}`,
      description: `Full resume for ${person.name}: ${person.headline}.`,
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      isPartOf: { "@id": WEBSITE_ID },
      inLanguage: "en",
      dateModified: BUILT_AT,
      hasPart: {
        "@type": "DigitalDocument",
        name: `${person.name} Resume (PDF)`,
        url: absolute(person.resume),
        encodingFormat: "application/pdf",
        author: { "@id": PERSON_ID },
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/resume#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: person.name, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Resume", item: `${SITE_URL}/resume` },
      ],
    },
    { ...personNode, subjectOf: undefined },
    websiteNode,
  ],
};
