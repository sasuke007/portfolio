"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Lightweight scroll-into-view reveal used across the /stop-being-shy landing.
 * Mirrors the site's house style (power3.out rise + fade, played once) so the
 * page feels native next to Hero / SectionLabel / AnimatedRule.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: delay / 1000,
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
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
