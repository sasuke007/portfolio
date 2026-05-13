"use client";

import { tech } from "@/content";

function Row({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const tripled = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
      <div
        className={direction === "left" ? "marquee-left" : "marquee-right"}
        style={{
          display: "flex",
          width: "max-content",
          alignItems: "center",
          gap: 36,
          padding: "10px 0",
        }}
      >
        {tripled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: 14,
              color: "var(--color-muted)",
              whiteSpace: "nowrap",
              letterSpacing: "0.02em",
              display: "inline-flex",
              alignItems: "center",
              gap: 36,
            }}
          >
            {t}
            <span style={{ opacity: 0.45 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section className="relative py-10" aria-label="Tech stack marquee">
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "8px 0",
        }}
      >
        <Row items={tech} direction="left" />
        <Row items={[...tech].reverse()} direction="right" />
      </div>
    </section>
  );
}
