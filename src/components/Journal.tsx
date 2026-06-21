"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { journalPhotos, journalTrailImages } from "@/content";
import { cn } from "@/lib/cn";
import { ImageTrailCursor } from "./ImageTrailCursor";
import { BendingGallery } from "./BendingGallery";
import { JournalCardCarousel } from "./JournalCardCarousel";

type JournalMode = "static" | "desktop" | "carousel";

export function Journal() {
  const sectionRef = useRef<HTMLElement>(null);

  // Three presentations, resolved on mount and kept in sync on resize (default
  // "static" so SSR and the first client render match — no hydration mismatch):
  //   carousel — narrow viewport OR touch: the swipeable 3D card carousel
  //              (honours reduced-motion internally by swapping instantly).
  //   desktop  — wide + fine pointer + motion: ambient gallery + image-trail.
  //   static   — wide + reduced-motion: the tilted photo collage.
  // Width-based (not just `pointer: coarse`) so resizing a desktop browser into
  // a mobile width — the usual way people test — also shows the carousel.
  const [mode, setMode] = useState<JournalMode>("static");
  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 768px)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (narrow.matches || coarse.matches) setMode("carousel");
      else setMode(reduced.matches ? "static" : "desktop");
    };
    update();
    narrow.addEventListener("change", update);
    coarse.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      narrow.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
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

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative",
        mode === "carousel"
          ? "overflow-x-clip py-24"
          : "min-h-[min(120vh,900px)] overflow-hidden py-48",
      )}
    >
      {/* Desktop: ambient drifting gallery + cursor-driven image-trail. */}
      {mode === "desktop" && (
        <>
          {/* Ambient background: a curved gallery of the same journal photos
              that drifts continuously. The hover image-trail sits on top. */}
          <BendingGallery
            images={journalTrailImages}
            className="absolute inset-0 z-0"
          />
          <ImageTrailCursor
            images={journalTrailImages}
            variant="type2"
            className="absolute inset-0 z-[1]"
          />
        </>
      )}

      {/* Reduced-motion fallback: the static tilted collage. */}
      {mode === "static" &&
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
        ))}

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

      {/* Touch: a swipeable 3D card carousel, stacked below the heading. */}
      {mode === "carousel" && <JournalCardCarousel />}
    </section>
  );
}
