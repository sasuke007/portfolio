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
    <section
      ref={sectionRef}
      id="top"
      style={{ height: "400vh", position: "relative" }}
    >
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 1,
            opacity: 0.04,
            mixBlendMode: "multiply",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            backgroundSize: "200px 200px",
          }}
        />

        {/* Layer A — Name */}
        <div
          ref={nameRef}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 2, willChange: "transform, opacity" }}
        >
          <span
            className="block overflow-hidden"
            style={{ padding: "0.04em 0.06em" }}
          >
            <span
              className="hero-name-line"
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display)",
                fontWeight: 400,
                letterSpacing: "var(--letter-spacing-display)",
                lineHeight: 0.95,
                color: "var(--color-text)",
              }}
            >
              {identity.firstName}
            </span>
          </span>
          <span
            className="block overflow-hidden"
            style={{ padding: "0.04em 0.06em" }}
          >
            <span
              className="hero-name-line"
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display)",
                fontWeight: 400,
                letterSpacing: "var(--letter-spacing-display)",
                lineHeight: 0.95,
                color: "var(--color-text)",
              }}
            >
              {identity.lastName}
            </span>
          </span>
        </div>

        {/* Layer B — Portrait */}
        <div
          ref={portraitRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 3, willChange: "transform, opacity" }}
        >
          <div
            className="overflow-hidden rounded-full"
            style={{
              width: "min(34vw, 380px)",
              height: "min(34vw, 380px)",
              boxShadow: "0 20px 60px -20px rgba(0,0,0,0.35)",
              filter: "grayscale(20%) contrast(0.97)",
            }}
          >
            <Image
              src="/profile_photo.jpeg"
              alt={`${identity.firstName} ${identity.lastName}`}
              width={760}
              height={760}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Layer C — Tagline */}
        <div
          ref={taglineRef}
          className="absolute inset-0 flex items-center justify-center px-6 text-center"
          style={{ zIndex: 4, willChange: "transform, opacity" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "var(--text-hero-sub)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              maxWidth: 900,
            }}
          >
            Crafting{" "}
            <em style={{ fontStyle: "italic" }}>{identity.niche}</em> &mdash;{" "}
            <em style={{ fontStyle: "italic" }}>{identity.role}</em>
          </h2>
        </div>

        {/* Layer D — Welcome */}
        <div
          ref={welcomeRef}
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ zIndex: 5, willChange: "transform, opacity" }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.4rem, 2.6vw, 2.4rem)",
              color: "var(--color-text)",
              letterSpacing: "-0.005em",
            }}
          >
            {identity.welcome}
          </p>
        </div>

        {/* Chevrons */}
        <div ref={chevronsRef} aria-hidden style={{ zIndex: 6 }}>
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
