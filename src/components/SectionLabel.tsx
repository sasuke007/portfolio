"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

export function SectionLabel({ index, name }: { index: string; name: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.from(ref.current, {
        x: -20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="label-micro inline-block">
      <span style={{ color: "var(--color-text)" }}>{index}</span>
      <span className="mx-2" style={{ color: "var(--color-muted)" }}>
        /
      </span>
      <span>{name}</span>
    </div>
  );
}
