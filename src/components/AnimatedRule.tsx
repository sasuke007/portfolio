"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

export function AnimatedRule({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.from(ref.current, {
        scaleX: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: delay / 1000,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{
        height: 1,
        width: "100%",
        background: "currentColor",
        opacity: 0.18,
        transformOrigin: "left center",
      }}
    />
  );
}
