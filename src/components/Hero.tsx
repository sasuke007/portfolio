"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { identity } from "@/content";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const chevronsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current) return;

      // Initial states
      gsap.set(portraitRef.current, { xPercent: 60, scale: 0.78, opacity: 0 });
      gsap.set(taglineRef.current, { y: 24, scale: 0.94, opacity: 0 });
      gsap.set(welcomeRef.current, { y: 24, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // 0 → 0.4: name zooms gently (scale 1 → 1.15), opacity full
      tl.to(
        nameRef.current,
        { scale: 1.15, ease: "none", duration: 0.4 },
        0,
      );
      // 0.4 → 0.7: name continues zoom + fade out
      tl.to(
        nameRef.current,
        { scale: 1.3, opacity: 0, ease: "none", duration: 0.3 },
        0.4,
      );

      // 0 → 0.55: portrait sweeps right→left, fades in then out
      tl.to(
        portraitRef.current,
        {
          xPercent: -60,
          scale: 1.18,
          ease: "none",
          duration: 0.55,
        },
        0,
      );
      tl.to(
        portraitRef.current,
        { opacity: 1, ease: "power2.out", duration: 0.12 },
        0.04,
      );
      tl.to(
        portraitRef.current,
        { opacity: 0, ease: "power2.in", duration: 0.13 },
        0.42,
      );

      // 0.42 → 0.58: tagline rises
      tl.to(
        taglineRef.current,
        { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.16 },
        0.42,
      );
      // 0.6 → 0.72: tagline exits
      tl.to(
        taglineRef.current,
        { y: -24, scale: 1.05, opacity: 0, ease: "power2.in", duration: 0.12 },
        0.6,
      );

      // 0.72 → 0.88: welcome rises
      tl.to(
        welcomeRef.current,
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.16 },
        0.72,
      );

      // Chevrons: fade out as hero leaves
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-1 opacity-[0.04] mix-blend-multiply bg-size-[200px_200px]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* Layer A — Name */}
        <div
          ref={nameRef}
          className="absolute inset-0 z-2 flex flex-col items-center justify-center will-change-[transform,opacity]"
        >
          <span className="block overflow-hidden px-[0.06em] py-[0.04em]">
            <span className="hero-name-line block font-display font-normal text-text text-display tracking-display leading-[0.95]">
              {identity.firstName}
            </span>
          </span>
          <span className="block overflow-hidden px-[0.06em] py-[0.04em]">
            <span className="hero-name-line block font-display font-normal text-text text-display tracking-display leading-[0.95]">
              {identity.lastName}
            </span>
          </span>
        </div>

        {/* Layer B — Portrait */}
        <div
          ref={portraitRef}
          className="absolute inset-0 z-3 flex items-center justify-center will-change-[transform,opacity]"
        >
          <div className="h-[min(34vw,380px)] w-[min(34vw,380px)] overflow-hidden rounded-full shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] filter-[grayscale(20%)_contrast(0.97)]">
            <Image
              src="/profile_photo.jpeg"
              alt={`${identity.firstName} ${identity.lastName}`}
              width={760}
              height={760}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Layer C — Tagline */}
        <div
          ref={taglineRef}
          className="absolute inset-0 z-4 flex items-center justify-center px-6 text-center will-change-[transform,opacity]"
        >
          <h2 className="max-w-[900px] font-display font-normal text-hero-sub leading-[1.1] tracking-[-0.01em]">
            Crafting <em className="italic">{identity.niche}</em> &mdash;{" "}
            <em className="italic">{identity.role}</em>
          </h2>
        </div>

        {/* Layer D — Welcome */}
        <div
          ref={welcomeRef}
          className="absolute inset-0 z-5 flex items-center justify-center px-6 will-change-[transform,opacity]"
        >
          <p className="font-display italic font-normal text-[clamp(1.4rem,2.6vw,2.4rem)] text-text tracking-[-0.005em]">
            {identity.welcome}
          </p>
        </div>

        {/* Chevrons */}
        <div ref={chevronsRef} aria-hidden className="z-6">
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
