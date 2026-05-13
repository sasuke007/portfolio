"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { journalPhotos } from "@/content";

export function Journal() {
  const sectionRef = useRef<HTMLElement>(null);

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
      className="relative overflow-hidden"
      style={{
        padding: "12rem 0",
        minHeight: "min(120vh, 900px)",
      }}
    >
      {journalPhotos.map((photo, i) => (
        <div
          key={photo.src}
          data-journal-photo
          data-parallax={photo.parallax}
          className="pointer-events-none absolute"
          style={{
            ...photo.position,
            width: photo.width,
            zIndex: photo.z,
            transform: `rotate(${photo.rotation}deg)`,
            willChange: "transform",
            background: "#fff",
            padding: 8,
            boxShadow: "0 22px 50px -22px rgba(0,0,0,0.28)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: i === 1 ? "3 / 4" : "4 / 5",
              overflow: "hidden",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{
                objectFit: "cover",
                filter: "grayscale(15%) contrast(0.95)",
              }}
            />
          </div>
        </div>
      ))}

      <div
        className="journal-text relative mx-auto px-6 text-center"
        style={{ maxWidth: 720, zIndex: 4 }}
      >
        <p className="label-micro" style={{ display: "inline-block" }}>
          PERSONAL JOURNAL
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(1.4rem, 2.8vw, 2.25rem)",
            color: "var(--color-text)",
            marginTop: 28,
            letterSpacing: "0.01em",
          }}
        >
          My life in a
        </p>

        <div style={{ position: "relative", display: "inline-block" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(4rem, 12vw, 9rem)",
              lineHeight: 1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            glimpse
          </h2>
          <svg
            aria-hidden
            viewBox="0 0 320 24"
            preserveAspectRatio="none"
            className="journal-squiggle"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "-12px",
              width: "100%",
              height: 18,
            }}
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

        <p className="body-editorial mx-auto mt-12 max-w-sm" style={{ marginTop: 56 }}>
          Photographs, half-thoughts, and the small things worth saving.
        </p>
      </div>
    </section>
  );
}
