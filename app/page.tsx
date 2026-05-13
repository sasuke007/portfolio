import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { TechMarquee } from "@/components/TechMarquee";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { Journal } from "@/components/Journal";
import { Tools } from "@/components/Tools";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechMarquee />
      <Projects />
      <Experience />
      <Achievements />
      <Journal />
      <Tools />
      <Contact />
    </>
  );
}
