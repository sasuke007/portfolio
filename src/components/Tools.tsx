"use client";

import { SectionLabel } from "./SectionLabel";
import { tools } from "@/content";

function BigRow({
  items,
  direction,
}: {
  items: typeof tools;
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items, ...items];
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        className={direction === "left" ? "marquee-left-slow" : "marquee-right-slow"}
        style={{
          display: "flex",
          width: "max-content",
          alignItems: "center",
          gap: 56,
        }}
      >
        {doubled.map((tool, i) => (
          <span
            key={`${tool.name}-${i}`}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(3rem, 8vw, 7.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              opacity: tool.muted ? 0.18 : 1,
              fontStyle: tool.muted ? "italic" : "normal",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: 56,
            }}
          >
            {tool.name}
            <span aria-hidden style={{ opacity: 0.35, fontStyle: "normal" }}>
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
    <section
      className="relative mx-auto px-6 py-32 md:py-44"
      style={{ maxWidth: "var(--max-width)" }}
    >
      <SectionLabel index="05" name="TOOLS" />

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.015em",
          margin: "32px 0 64px 0",
        }}
      >
        Tools of the <em style={{ fontStyle: "italic" }}>Trade</em>.
      </h2>

      <div className="-mx-6 flex flex-col gap-6">
        <BigRow items={tools} direction="left" />
        <BigRow items={reversed} direction="right" />
      </div>
    </section>
  );
}
