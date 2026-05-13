"use client";

import { SectionLabel } from "./SectionLabel";
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
          "flex w-max items-center gap-14",
          direction === "left" ? "marquee-left-slow" : "marquee-right-slow",
        )}
      >
        {doubled.map((tool, i) => (
          <span
            key={`${tool.name}-${i}`}
            className={cn(
              "inline-flex items-center gap-14 whitespace-nowrap font-display font-normal text-[clamp(3rem,8vw,7.5rem)] leading-none tracking-display text-text",
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
    <section className="relative mx-auto max-w-(--max-width) px-6 py-32 md:py-44">
      <SectionLabel index="05" name="TOOLS" />

      <h2 className="mt-8 mb-16 font-display font-normal text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.015em]">
        Tools of the <em className="italic">Trade</em>.
      </h2>

      <div className="-mx-6 flex flex-col gap-6">
        <BigRow items={tools} direction="left" />
        <BigRow items={reversed} direction="right" />
      </div>
    </section>
  );
}
