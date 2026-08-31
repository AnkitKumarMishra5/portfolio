import { Nav } from "@/components/sections/Nav";
import { SectionRail } from "@/components/ui/SectionRail";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Companies } from "@/components/sections/Companies";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { LiveSystems } from "@/components/sections/LiveSystems";
import { Work } from "@/components/sections/Work";
import { Projects } from "@/components/sections/Projects";
import { SourceExplorer } from "@/components/sections/SourceExplorer";
import { AskAI } from "@/components/sections/AskAI";
import { Workflow } from "@/components/sections/Workflow";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Teaching } from "@/components/sections/Teaching";
import { Recognition } from "@/components/sections/Recognition";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { education, experience, person, projects, skillGroups } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: person.name,
      givenName: "Ankit",
      familyName: "Mishra",
      jobTitle: person.role,
      description: person.shortBio,
      email: `mailto:${person.email}`,
      url: SITE_URL,
      image: `${SITE_URL}${person.photo}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      sameAs: [person.linkedin, person.github],
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
      knowsAbout: skillGroups.flatMap((g) => g.items).slice(0, 30),
      hasOccupation: experience.flatMap((c) =>
        c.roles.map((r) => ({
          "@type": "Occupation",
          name: r.title,
          occupationLocation: { "@type": "Place", name: c.location },
        }))
      ),
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: `${person.name} | ${person.headline}`,
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${person.name} | ${person.headline}`,
      description: person.shortBio,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    ...projects.map((p) => ({
      "@type": "SoftwareApplication",
      name: p.name,
      description: p.summary,
      url: p.live,
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
      author: { "@id": `${SITE_URL}/#person` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    })),
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <SectionRail />
      <main>
        <Hero />
        <Ticker />
        <Companies />
        <div className="pt-14 sm:pt-16">
          <Stats />
        </div>
        <About />
        <LiveSystems />
        <Work />
        <Projects />
        <SourceExplorer />
        <AskAI />
        <Workflow />
        <Experience />
        <Skills />
        <Teaching />
        <Recognition />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
