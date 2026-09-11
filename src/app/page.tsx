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
import { homeJsonLd, serializeJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }}
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
