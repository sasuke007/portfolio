"use client";

import { tech } from "@/content";
import { cn } from "@/lib/cn";

function Row({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const tripled = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={cn(
          "flex w-max items-center gap-9 py-2.5",
          direction === "left" ? "marquee-left" : "marquee-right",
        )}
      >
        {tripled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="inline-flex items-center gap-9 whitespace-nowrap font-body font-medium text-[14px] -tracking-display text-muted"
          >
            {t}
            <span className="opacity-[0.45]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section className="relative py-10" aria-label="Tech stack marquee">
      <div className="border-y border-border py-2">
        <Row items={tech} direction="left" />
        <Row items={[...tech].reverse()} direction="right" />
      </div>
    </section>
  );
}
