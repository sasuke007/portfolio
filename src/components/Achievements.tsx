"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { SectionLabel } from "./SectionLabel";
import { achievements, type Achievement } from "@/content";

function Card({ a }: { a: Achievement }) {
  return (
    <article className="achievement-card relative flex w-[78vw] max-w-105 min-h-100 shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white p-8 md:w-auto md:max-w-none md:shrink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dot-grid opacity-[0.55]"
      />

      <div className="relative z-10 flex items-start justify-between">
        <span aria-hidden className="text-[22px] leading-none text-text">
          &#10026;
        </span>
        <span className="label-pill max-w-40 text-right text-muted">
          {a.tag}
        </span>
      </div>

      <div className="relative z-10 mt-auto">
        <h3 className="m-0 font-display font-normal text-[clamp(2rem,3.2vw,2.8rem)] leading-[1.05] tracking-[-0.01em]">
          {a.title}
        </h3>
        <div className="mt-3 flex items-center gap-3 font-body font-medium text-[12px] uppercase tracking-[0.08em] text-muted">
          <span>{a.year}</span>
          <span className="opacity-50">·</span>
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
      className="relative mx-auto max-w-(--max-width) px-6 py-32 md:py-44"
    >
      <div className="achievements-head">
        <SectionLabel index="04" name="ACHIEVEMENTS" />

        <h2 className="mt-8 font-display font-normal text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.015em]">
          Milestones.
        </h2>

        <p className="body-editorial mt-6 max-w-xl">
          Recognition that mattered. Quiet wins worth remembering.
        </p>
      </div>

      <div className="achievements-track -mx-6 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
        {achievements.map((a) => (
          <Card key={a.title} a={a} />
        ))}
      </div>
    </section>
  );
}
