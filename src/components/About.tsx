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
      className="relative mx-auto px-6 py-32 md:py-44"
      style={{ maxWidth: "var(--max-width)" }}
    >
      <SectionLabel index="01" name="INTRODUCTION" />

      <div className="about-head mt-10">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            margin: 0,
          }}
        >
          Building <em style={{ fontStyle: "italic" }}>elegant</em> software{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--color-accent)",
              fontWeight: 400,
            }}
          >
            &
          </em>{" "}
          AI.
        </h2>

        <p
          className="mt-4"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.25rem, 1.8vw, 1.6rem)",
            lineHeight: 1.4,
            margin: 0,
            color: "var(--color-muted)",
            maxWidth: 640,
          }}
        >
          For the people who care about the details.
        </p>

        <div style={{ marginTop: 28, maxWidth: 560 }}>
          <AnimatedRule />
        </div>
      </div>

      <p
        className="about-statement mt-16 max-w-3xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
          lineHeight: 1.4,
          color: "var(--color-text)",
        }}
      >
        I am a{" "}
        <em style={{ fontStyle: "italic" }}>Full Stack Engineer</em> and{" "}
        <em style={{ fontStyle: "italic" }}>Product Builder</em> passionate
        about architecting{" "}
        <em style={{ fontStyle: "italic" }}>elegant, scalable</em> systems —
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
