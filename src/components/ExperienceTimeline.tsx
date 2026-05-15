"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { ExperienceEntry } from "./ExperienceEntry";
import { experience } from "@/content";

export function ExperienceTimeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.from(".timeline-rule", {
        scaleY: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".entry-row", {
        y: 14,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".entry-dot", {
        scale: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.12,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className="relative mt-10">
      {/* Vertical timeline rule */}
      <span
        aria-hidden
        className="timeline-rule pointer-events-none absolute left-[12px] top-2 bottom-2 block w-px origin-top bg-text/[0.18]"
      />

      <ul className="m-0 list-none p-0">
        {experience.map((role, i) => (
          <li
            key={`${role.company}-${role.start}`}
            className="border-t border-border first:border-t-0"
          >
            <ExperienceEntry
              role={role}
              index={i}
              open={openIndex === i}
              onToggleAction={() =>
                setOpenIndex((curr) => (curr === i ? null : i))
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
