"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

const NATIVE_SIZE = 100;
const REST_SCALE = 0.24;
const HOVER_SCALE = 0.6;

export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    gsap.set(inner, { xPercent: -58, yPercent: -50, scale: REST_SCALE });

    const onMove = (e: PointerEvent) => {
      wrap.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, [role=button], [data-cursor=hover]")) {
        gsap.to(inner, { scale: HOVER_SCALE, duration: 0.32, ease: "power3.out" });
      }
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, [role=button], [data-cursor=hover]")) {
        gsap.to(inner, { scale: REST_SCALE, duration: 0.32, ease: "power3.out" });
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
      ref={wrapRef}
      aria-hidden
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-70 mix-blend-difference will-change-transform"
    >
      <div
        ref={innerRef}
        className="will-change-transform"
        style={{ width: NATIVE_SIZE, height: NATIVE_SIZE }}
      >
        <svg
          viewBox="0 0 18 18"
          width="100%"
          height="100%"
          fill="#f5f5f5"
          className="block"
          shapeRendering="geometricPrecision"
        >
          <path d="M17.296 11.5694L10.4415 9.06545C10.0431 8.92235 9.61441 9.01658 9.31551 9.31338C9.01671 9.61168 8.92101 10.0429 9.06551 10.4413L11.5704 17.2948C11.7247 17.7191 12.128 18.0004 12.5772 18.0004C12.585 18.0004 12.5918 17.9999 12.5987 17.9999C13.0577 17.9906 13.4591 17.6913 13.5987 17.2543L14.4854 14.4857L17.2559 13.5985C17.6914 13.4589 17.9903 13.057 18 12.599C18.0097 12.141 17.7267 11.7276 17.296 11.5694Z" />
        </svg>
      </div>
    </div>
  );
}
