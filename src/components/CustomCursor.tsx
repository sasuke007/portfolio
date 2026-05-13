"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    if (!ref.current) return;

    const el = ref.current;
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 1 });

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, [role=button], [data-cursor=hover]")) {
        gsap.to(el, { scale: 2.8, duration: 0.32, ease: "power3.out" });
      }
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, [role=button], [data-cursor=hover]")) {
        gsap.to(el, { scale: 1, duration: 0.32, ease: "power3.out" });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[70]"
      style={{
        width: 20,
        height: 20,
        borderRadius: 9999,
        mixBlendMode: "difference",
        background: "#f5f5f5",
        willChange: "transform",
      }}
    />
  );
}
