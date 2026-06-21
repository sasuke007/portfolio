"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { journalPhotos, journalTrailImages } from "@/content";
import { cn } from "@/lib/cn";
import { ImageTrailCursor } from "./ImageTrailCursor";

export function Journal() {
  const sectionRef = useRef<HTMLElement>(null);

  // The cursor trail only makes sense with a fine pointer and motion allowed.
  // Default `false` so SSR and the first client render both produce the static
  // collage (no hydration mismatch); capable devices swap to the trail on mount.
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setInteractive(!coarse && !reduced);
  }, []);

  useGSAP(
    () => {
      registerGsap();
      const ctx = sectionRef.current;
      if (!ctx) return;

      ctx.querySelectorAll<HTMLElement>("[data-journal-photo]").forEach(
        (photo) => {
          const distance = Number(photo.dataset.parallax || -80);
          gsap.fromTo(
            photo,
            { y: -distance / 2 },
            {
              y: distance / 2,
              ease: "none",
              scrollTrigger: {
                trigger: ctx,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        },
      );

      gsap.from(".journal-text > *", {
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".journal-text",
          start: "top 80%",
        },
      });

      // Draw the squiggle path
      const path = ctx.querySelector<SVGPathElement>(".journal-squiggle path");
      if (path) {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".journal-squiggle",
              start: "top 85%",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  // One-shot intro: when the section enters view, play a ~1.2s "ghost cursor"
  // sweep that traces the image trail once to hint at the hover effect. It's
  // time-based — NOT coupled to scroll. Dispatching `mousemove` drives the
  // trail; the custom cursor listens on `pointermove`, so the real cursor stays
  // put. If the user starts genuinely moving the mouse over the section, the
  // real cursor takes over and the intro aborts so the two never fight.
  useGSAP(
    () => {
      if (!interactive) return;
      registerGsap();
      const section = sectionRef.current;
      const container =
        section?.querySelector<HTMLElement>("[data-image-trail]");
      if (!section || !container) return;

      let intro: gsap.core.Tween | null = null;
      let lastRealMoveAt = -Infinity;
      let lastX: number | null = null;
      let lastY: number | null = null;

      const playIntro = () => {
        if (intro?.isActive()) return; // already running
        if (performance.now() - lastRealMoveAt < 500) return; // user already engaging
        const proxy = { p: 0 };
        intro = gsap.to(proxy, {
          p: 1,
          duration: 1.2,
          ease: "power1.inOut",
          onUpdate: () => {
            const rect = container.getBoundingClientRect();
            const p = proxy.p;
            const x = rect.left + rect.width * (0.16 + 0.68 * p);
            const y =
              rect.top +
              rect.height * (0.5 + 0.22 * Math.sin(p * Math.PI * 2));
            container.dispatchEvent(
              new MouseEvent("mousemove", {
                clientX: x,
                clientY: y,
                bubbles: true,
              }),
            );
          },
        });
      };

      // A genuine real move over the section means the user is taking over —
      // abort the intro so the two cursors don't fight. Scroll-induced moves
      // keep the same coords, so they're ignored.
      const onRealMove = (e: MouseEvent) => {
        if (!e.isTrusted) return; // ignore our own synthetic events
        if (
          lastX !== null &&
          Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY!) > 2
        ) {
          lastRealMoveAt = performance.now();
          intro?.kill();
          intro = null;
        }
        lastX = e.clientX;
        lastY = e.clientY;
      };
      container.addEventListener("mousemove", onRealMove, { passive: true });

      // Fire when the section scrolls into view (from either direction).
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: playIntro,
        onEnterBack: playIntro,
      });

      return () => {
        container.removeEventListener("mousemove", onRealMove);
        intro?.kill();
        st.kill();
      };
    },
    { scope: sectionRef, dependencies: [interactive] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[min(120vh,900px)] overflow-hidden py-48"
    >
      {/* Cursor-driven image trail on capable devices; the original static
          tilted collage as a graceful fallback on touch / reduced-motion. */}
      {interactive ? (
        <ImageTrailCursor
          images={journalTrailImages}
          variant="type2"
          className="absolute inset-0 z-[1]"
        />
      ) : (
        journalPhotos.map((photo, i) => (
          <div
            key={photo.src}
            data-journal-photo
            data-parallax={photo.parallax}
            className="pointer-events-none absolute bg-white p-2 shadow-[0_22px_50px_-22px_rgba(0,0,0,0.28)] will-change-transform"
            style={{
              ...photo.position,
              width: photo.width,
              zIndex: photo.z,
              transform: `rotate(${photo.rotation}deg)`,
            }}
          >
            <div
              className={cn(
                "relative w-full overflow-hidden",
                i === 1 ? "aspect-3/4" : "aspect-4/5",
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover filter-[grayscale(15%)_contrast(0.95)]"
              />
            </div>
          </div>
        ))
      )}

      <div className="journal-text pointer-events-none relative z-4 mx-auto max-w-180 px-6 text-center">
        <p className="label-micro inline-block">PERSONAL JOURNAL</p>
        <p className="mt-7 font-body font-normal text-[clamp(1.4rem,2.8vw,2.25rem)] tracking-[0.01em] text-text">
          My life in a
        </p>

        <div className="relative inline-block">
          <h2 className="m-0 font-display italic font-normal text-[clamp(4rem,12vw,9rem)] leading-none tracking-display">
            glimpse
          </h2>
          <svg
            aria-hidden
            viewBox="0 0 320 24"
            preserveAspectRatio="none"
            className="journal-squiggle absolute -bottom-3 left-0 right-0 h-4.5 w-full"
          >
            <path
              d="M2 14 C 30 2, 60 22, 90 12 S 150 2, 180 12 S 240 22, 270 12 S 310 4, 318 14"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="body-editorial mx-auto mt-14 max-w-sm">
          Photographs, half-thoughts, and the small things worth saving.
        </p>
      </div>
    </section>
  );
}
