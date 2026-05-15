"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import type { Product } from "@/content";

export function ProductEntry({
  product,
  open,
  onToggleAction,
}: {
  product: Product;
  index: number;
  open: boolean;
  onToggleAction: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!rootRef.current) return;
      const root = rootRef.current;
      const margin = root.querySelector<HTMLElement>(".entry-margin");
      const summary = root.querySelector<HTMLElement>(".entry-summary");
      const description = root.querySelector<HTMLElement>(".entry-description");
      const bullets = root.querySelectorAll<HTMLElement>(".entry-bullet");
      const pills = root.querySelectorAll<HTMLElement>(".entry-pill");

      if (open) {
        const tl = gsap.timeline();
        if (margin) {
          tl.to(
            margin,
            { scaleY: 1, duration: 0.32, ease: "power2.out" },
            0,
          );
        }
        if (summary) {
          tl.fromTo(
            summary,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" },
            0.08,
          );
        }
        if (description) {
          tl.fromTo(
            description,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
            0.14,
          );
        }
        if (bullets.length > 0) {
          tl.fromTo(
            bullets,
            { opacity: 0, x: -8 },
            {
              opacity: 1,
              x: 0,
              duration: 0.32,
              ease: "power2.out",
              stagger: 0.06,
            },
            0.2,
          );
        }
        if (pills.length > 0) {
          tl.fromTo(
            pills,
            { opacity: 0, x: 12 },
            {
              opacity: 1,
              x: 0,
              duration: 0.28,
              ease: "power2.out",
              stagger: 0.04,
            },
            0.32,
          );
        }
      } else {
        const tl = gsap.timeline();
        if (pills.length > 0) {
          tl.to(
            pills,
            {
              opacity: 0,
              x: 12,
              duration: 0.16,
              ease: "power2.in",
              stagger: { each: 0.02, from: "end" },
            },
            0.04,
          );
        }
        if (bullets.length > 0) {
          tl.to(
            bullets,
            {
              opacity: 0,
              x: -8,
              duration: 0.18,
              ease: "power2.in",
              stagger: { each: 0.03, from: "end" },
            },
            0.08,
          );
        }
        if (description) {
          tl.to(
            description,
            { opacity: 0, y: 8, duration: 0.18, ease: "power2.in" },
            0.12,
          );
        }
        if (summary) {
          tl.to(
            summary,
            { opacity: 0, y: 6, duration: 0.18, ease: "power2.in" },
            0.14,
          );
        }
        if (margin) {
          tl.to(
            margin,
            { scaleY: 0, duration: 0.28, ease: "power2.in" },
            0,
          );
        }
      }
    },
    { dependencies: [open], scope: rootRef },
  );

  return (
    <div ref={rootRef} className="experience-entry relative">
      {/* Per-entry dot — anchored to the vertical timeline rule */}
      <span
        aria-hidden
        className="entry-dot pointer-events-none absolute left-[9px] top-[30px] block h-1.5 w-1.5 rounded-full bg-text/40"
      />

      {/* Gold "editor's annotation" margin mark — visible only while expanded */}
      <span
        aria-hidden
        className="entry-margin pointer-events-none absolute left-[14px] top-3 bottom-3 block w-[2px] origin-top scale-y-0 bg-accent"
      />

      {/* Header row — click to toggle */}
      <button
        type="button"
        onClick={onToggleAction}
        aria-expanded={open}
        className="entry-row group block w-full cursor-pointer py-5 pl-9 pr-2 text-left md:pl-14"
      >
        <div className="flex items-center justify-between gap-6">
          {/* LEFT — product name (primary) */}
          <h3
            className={cn(
              "m-0 font-display font-normal leading-[1.1] transition-colors duration-300",
              "text-[clamp(1.4rem,2.4vw,2rem)]",
              open ? "text-accent" : "text-text",
            )}
          >
            {product.name}
          </h3>

          {/* RIGHT — status pill + visit button + chevron */}
          <div className="flex shrink-0 items-center gap-2.5">
            {product.status && (
              <span className="label-pill rounded-full border border-border px-2 py-0.5 text-[9px] text-muted">
                {product.status}
              </span>
            )}
            <a
              href={product.url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open ${product.name}`}
              className="group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-text px-5 py-3 font-body font-medium text-[12px] uppercase tracking-[0.13em] text-bg shadow-[0_4px_16px_-4px_rgba(0,0,0,0.22)] transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.04] hover:shadow-[0_14px_36px_-8px_rgba(0,0,0,0.32)]"
            >
              {product.name}
              <ArrowUpRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
              {/* Soft "shine" sweep on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.18)_50%,transparent_70%)] transition-transform duration-700 ease-out group-hover/cta:translate-x-full"
              />
            </a>
            <span
              aria-hidden
              className="inline-flex h-5 w-5 items-center justify-center text-muted"
              style={{
                transform: open ? "rotate(90deg)" : "rotate(0deg)",
                transition:
                  "transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1)",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M3 1l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </button>

      {/* Expandable panel — animates height via grid-template-rows trick */}
      <div
        className={cn(
          "grid pl-9 transition-[grid-template-rows] duration-[380ms] md:pl-14",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="pb-9 pr-2 pt-1">
            {product.summary && (
              <p className="entry-summary m-0 max-w-2xl font-display font-normal italic leading-[1.45] text-[clamp(1.1rem,1.6vw,1.4rem)] text-text opacity-0">
                &ldquo;{product.summary}&rdquo;
              </p>
            )}

            {product.description && (
              <p className="entry-description m-0 mt-5 max-w-3xl font-body text-[15px] leading-[1.65] text-[rgba(26,26,26,0.78)] opacity-0">
                {product.description}
              </p>
            )}

            {product.features && product.features.length > 0 && (
              <ul className="m-0 mt-6 list-none p-0">
                {product.features.map((f, i) => (
                  <li
                    key={i}
                    className="entry-bullet relative max-w-3xl py-1.5 pl-5 font-body text-[14px] leading-[1.6] text-[rgba(26,26,26,0.78)] opacity-0"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-[14px] h-1 w-1 rounded-full bg-accent"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {product.stack && product.stack.length > 0 && (
              <ul className="m-0 mt-7 flex list-none flex-wrap gap-x-2 gap-y-2 p-0">
                {product.stack.map((s) => (
                  <li
                    key={s}
                    className="entry-pill label-pill rounded-full border border-border px-2.5 py-1 text-[10px] text-muted opacity-0"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
