"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { SectionLabel } from "./SectionLabel";
import { AnimatedRule } from "./AnimatedRule";
import { identity } from "@/content";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.from(".about-head > *", {
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".about-head",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".about-statement", {
        y: 18,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-statement",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".about-body p", {
        y: 14,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".about-body",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative mx-auto max-w-(--max-width) px-6 py-32 md:py-44"
    >
      <SectionLabel index="01" name="INTRODUCTION" />

      <div className="about-head mt-10">
        <h2 className="m-0 font-display font-normal text-[clamp(2.5rem,6vw,4.2rem)] leading-[1.05] tracking-[-0.015em]">
          Building <em className="italic">elegant</em> software{" "}
          <em className="italic font-normal text-accent">&</em> AI.
        </h2>

        <p className="m-0 mt-4 max-w-160 font-display italic font-normal text-[clamp(1.25rem,1.8vw,1.6rem)] leading-[1.4] text-muted">
          For the people who care about the details.
        </p>

        <div className="mt-7 max-w-140">
          <AnimatedRule />
        </div>
      </div>

      <p className="about-statement mt-16 max-w-3xl font-display font-normal text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.4] text-text">
        I am a <em className="italic">Full Stack Engineer</em> and{" "}
        <em className="italic">Product Builder</em> passionate about
        architecting <em className="italic">elegant, scalable</em> systems —
        and the quiet craft beneath them.
      </p>

      <div className="about-body mt-14 grid gap-10 md:grid-cols-2">
        <p className="body-editorial max-w-md">
          {identity.tagline} I work at the intersection of product, design, and
          deep engineering — taking ideas from a single sketch through to
          shipping software that earns its place.
        </p>
        <p className="body-editorial max-w-md">
          When I&rsquo;m not at a keyboard, you&rsquo;ll find me reading,
          photographing the city at golden hour, or writing about the small
          decisions that compound into great software.
        </p>
      </div>
    </section>
  );
}
