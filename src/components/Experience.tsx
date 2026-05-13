"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { SectionLabel } from "./SectionLabel";
import { experience, type Experience as Role } from "@/content";

function Row({ role }: { role: Role }) {
  return (
    <div className="experience-row grid grid-cols-1 gap-4 py-8 md:grid-cols-[1.1fr_2.4fr_1.5fr] md:items-baseline">
      <div className="flex items-center gap-3">
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: "0.02em",
            color: "var(--color-muted)",
          }}
        >
          {role.start} &mdash; {role.end}
        </span>
        <span
          className="label-pill rounded-full border px-2 py-0.5"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-muted)",
            fontSize: 9,
          }}
        >
          {role.location}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: role.current
            ? "clamp(1.6rem, 2.6vw, 2.25rem)"
            : "clamp(1.25rem, 2vw, 1.7rem)",
          lineHeight: 1.1,
          color: role.current ? "var(--color-text)" : "rgba(26,26,26,0.7)",
          margin: 0,
        }}
      >
        {role.title}
      </h3>

      <p className="label-micro md:text-right" style={{ margin: 0 }}>
        {role.company}
      </p>
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
      className="relative mx-auto px-6 py-32 md:py-44"
      style={{ maxWidth: "var(--max-width)" }}
    >
      <div className="experience-head">
        <SectionLabel index="03" name="EXPERIENCE" />

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
          Professional <em style={{ fontStyle: "italic" }}>Journey</em>.
        </h2>

        <p className="body-editorial mt-6 max-w-xl">
          A decade in code &mdash; from junior contributor to product engineer.
        </p>
      </div>

      <div className="experience-list mt-14">
        {experience.map((role) => (
          <div key={`${role.title}-${role.company}`}>
            <div
              className="experience-rule"
              style={{
                height: 1,
                width: "100%",
                background: "currentColor",
                opacity: 0.18,
                transformOrigin: "left center",
              }}
            />
            <Row role={role} />
          </div>
        ))}
        <div
          className="experience-rule"
          style={{
            height: 1,
            width: "100%",
            background: "currentColor",
            opacity: 0.18,
            transformOrigin: "left center",
          }}
        />
      </div>
    </section>
  );
}
