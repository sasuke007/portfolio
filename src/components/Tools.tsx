"use client";

import { tools } from "@/content";
import { cn } from "@/lib/cn";

function BigRow({
  items,
  direction,
}: {
  items: typeof tools;
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className={cn(
          "flex w-max items-center gap-8",
          direction === "left" ? "marquee-left-slow" : "marquee-right-slow",
        )}
      >
        {doubled.map((tool, i) => (
          <span
            key={`${tool.name}-${i}`}
            className={cn(
              "inline-flex items-center gap-8 whitespace-nowrap font-display font-normal text-[clamp(1.6rem,3.8vw,3.5rem)] leading-none tracking-display text-text",
              tool.muted ? "italic opacity-[0.18]" : "opacity-100",
            )}
          >
            {tool.name}
            <span aria-hidden className="not-italic opacity-[0.35]">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Tools() {
  const reversed = [...tools].reverse();

  return (
    <section className="relative mx-auto max-w-(--max-width) px-6 py-24 md:py-32">
      <h2 className="mb-10 font-display font-normal text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.015em]">
        Tools of the <em className="italic">Trade</em>.
      </h2>

      <div className="-mx-6 flex flex-col gap-3">
        <BigRow items={tools} direction="left" />
        <BigRow items={reversed} direction="right" />
      </div>
    </section>
  );
}
