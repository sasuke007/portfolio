"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { SectionLabel } from "./SectionLabel";
import { experience, type Experience as Role } from "@/content";
import { cn } from "@/lib/cn";

function Row({ role }: { role: Role }) {
  return (
    <div className="experience-row grid grid-cols-1 gap-4 py-8 md:grid-cols-[1.1fr_2.4fr_1.5fr] md:items-baseline">
      <div className="flex items-center gap-3">
        <span className="font-body font-medium text-[14px] -tracking-display text-muted">
          {role.start} &mdash; {role.end}
        </span>
        <span className="label-pill rounded-full border border-border px-2 py-0.5 text-[9px] text-muted">
          {role.location}
        </span>
      </div>

      <h3
        className={cn(
          "m-0 font-display font-normal leading-[1.1]",
          role.current
            ? "text-[clamp(1.6rem,2.6vw,2.25rem)] text-text"
            : "text-[clamp(1.25rem,2vw,1.7rem)] text-[rgba(26,26,26,0.7)]",
        )}
      >
        {role.title}
      </h3>

      <p className="label-micro m-0 md:text-right">{role.company}</p>
    </div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.from(".experience-head > *", {
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: ".experience-head",
          start: "top 85%",
        },
      });

      gsap.from(".experience-rule", {
        scaleX: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".experience-list",
          start: "top 80%",
        },
      });

      gsap.from(".experience-row", {
        y: 14,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".experience-list",
          start: "top 78%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative mx-auto max-w-(--max-width) px-6 py-32 md:py-44"
    >
      <div className="experience-head">
        <SectionLabel index="03" name="EXPERIENCE" />

        <h2 className="mt-8 font-display font-normal text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.015em]">
          Professional <em className="italic">Journey</em>.
        </h2>

        <p className="body-editorial mt-6 max-w-xl">
          A decade in code &mdash; from junior contributor to product engineer.
        </p>
      </div>

      <div className="experience-list mt-14">
        {experience.map((role) => (
          <div key={`${role.title}-${role.company}`}>
            <div className="experience-rule h-px w-full origin-left bg-current opacity-[0.18]" />
            <Row role={role} />
          </div>
        ))}
        <div className="experience-rule h-px w-full origin-left bg-current opacity-[0.18]" />
      </div>
    </section>
  );
}
