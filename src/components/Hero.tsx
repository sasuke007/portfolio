"use client";

import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { identity } from "@/content";
import { FluidPhotoReveal } from "./FluidPhotoReveal";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const chevronsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current) return;

      // Initial states
      gsap.set(taglineRef.current, { y: 24, scale: 0.94, opacity: 0 });
      gsap.set(welcomeRef.current, { y: 24, opacity: 0 });

      // Scroll-driven cinematic timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // 0 → 0.35: name zooms gently
      tl.to(
        nameRef.current,
        { scale: 1.15, ease: "none", duration: 0.35 },
        0,
      );
      // 0.35 → 0.55: name continues zoom + fades
      tl.to(
        nameRef.current,
        { scale: 1.3, opacity: 0, ease: "none", duration: 0.2 },
        0.35,
      );

      // 0.37 → 0.47: tagline rises into view, then holds until 0.62
      tl.to(
        taglineRef.current,
        { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.1 },
        0.37,
      );
      // 0.62 → 0.7: tagline exits
      tl.to(
        taglineRef.current,
        { y: -24, scale: 1.05, opacity: 0, ease: "power2.in", duration: 0.08 },
        0.62,
      );

      // 0.7 → 0.8: welcome rises
      tl.to(
        welcomeRef.current,
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.1 },
        0.7,
      );
      // 0.8 → 1: welcome holds on screen before the hero unpins
      tl.to({}, { duration: 0.2 }, 0.8);

      // Chevrons fade as the hero leaves the top
      tl.to(
        chevronsRef.current,
        { opacity: 0, ease: "none", duration: 0.15 },
        0.05,
      );

      // Page-load name reveal (independent of scroll)
      gsap.from(".hero-name-line", {
        yPercent: 100,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.15,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="top" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-multiply bg-size-[200px_200px]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* Layer B — full-bleed WebGL fluid; photo lives in a centered sub-region
            inside the shader, smoke wisps render outside that sub-region. */}
        <FluidPhotoReveal
          src="/profile_photo.jpeg"
          className="absolute inset-0 z-[2]"
        />

        {/* Layer A — Name */}
        <div
          ref={nameRef}
          className="pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center will-change-[transform,opacity] mix-blend-multiply"
        >
          <span className="block overflow-hidden px-[0.06em] py-[0.04em]">
            <span className="hero-name-line block font-display font-normal text-text text-display tracking-display leading-[0.95]">
              {identity.firstName}
            </span>
          </span>
          <span className="block overflow-hidden px-[0.06em] py-[0.04em]">
            <span className="hero-name-line block font-display font-normal text-accent text-display tracking-display leading-[0.95]">
              {identity.lastName}
            </span>
          </span>
        </div>

        {/* Layer C — Tagline */}
        <div
          ref={taglineRef}
          className="pointer-events-none absolute inset-0 z-[4] flex items-center justify-center px-6 text-center will-change-[transform,opacity]"
        >
          <h2 className="max-w-[900px] font-display font-normal text-hero-sub leading-[1.1] tracking-[-0.01em]">
            I build products I{" "}
            <em className="italic text-accent">wish existed</em> in the world.
          </h2>
        </div>

        {/* Layer D — Welcome */}
        <div
          ref={welcomeRef}
          className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center px-6 will-change-[transform,opacity]"
        >
          <p className="font-display italic font-normal text-[clamp(1.4rem,2.6vw,2.4rem)] text-text tracking-[-0.005em]">
            {identity.welcome}
          </p>
        </div>

        {/* Chevrons */}
        <div ref={chevronsRef} aria-hidden className="z-[6]">
          <div className="pointer-events-none absolute bottom-8 left-8">
            <ChevronDown
              size={20}
              strokeWidth={1.25}
              className="chevron-bounce"
            />
          </div>
          <div className="pointer-events-none absolute bottom-8 right-8">
            <ChevronDown
              size={20}
              strokeWidth={1.25}
              className="chevron-bounce"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
