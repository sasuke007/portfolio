"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { SectionLabel } from "./SectionLabel";
import { achievements, type Achievement } from "@/content";

function Card({ a }: { a: Achievement }) {
  return (
    <article
      className="achievement-card relative flex w-[78vw] max-w-[420px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border md:w-auto md:max-w-none md:shrink"
      style={{
        background: "#ffffff",
        borderColor: "var(--color-border)",
        padding: "2rem",
        minHeight: 400,
        scrollSnapAlign: "start",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-dot-grid) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0",
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <span aria-hidden style={{ fontSize: 22, lineHeight: 1, color: "var(--color-text)" }}>
          &#10026;
        </span>
        <span
          className="label-pill"
          style={{ color: "var(--color-muted)", textAlign: "right", maxWidth: 160 }}
        >
          {a.tag}
        </span>
      </div>

      <div className="relative z-10 mt-auto">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {a.title}
        </h3>
        <div
          className="mt-3 flex items-center gap-3"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
          }}
        >
          <span>{a.year}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{a.organizer}</span>
        </div>
        <p className="body-editorial-tight mt-4 max-w-md">{a.note}</p>
      </div>
    </article>
  );
}

export function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.from(".achievements-head > *", {
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: ".achievements-head",
          start: "top 85%",
        },
      });

      gsap.from(".achievement-card", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".achievements-track",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto px-6 py-32 md:py-44"
      style={{ maxWidth: "var(--max-width)" }}
    >
      <div className="achievements-head">
        <SectionLabel index="04" name="ACHIEVEMENTS" />

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            margin: "32px 0 0 0",
          }}
        >
          Milestones.
        </h2>

        <p className="body-editorial mt-6 max-w-xl">
          Recognition that mattered. Quiet wins worth remembering.
        </p>
      </div>

      <div
        className="achievements-track -mx-6 mt-14 flex gap-6 overflow-x-auto px-6 pb-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
        }}
      >
        {achievements.map((a) => (
          <Card key={a.title} a={a} />
        ))}
      </div>
    </section>
  );
}
