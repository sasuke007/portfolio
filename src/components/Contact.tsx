"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { identity, socials } from "@/content";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto px-6 py-32 md:py-44"
      style={{ maxWidth: "var(--max-width)" }}
    >
      <SectionLabel index="06" name="CONCLUSION" />

      <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-[2fr_1fr] md:items-end">
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              margin: 0,
              textTransform: "lowercase",
            }}
          >
            <span style={{ fontStyle: "italic" }}>let&rsquo;s</span> collaborate
            <span style={{ color: "var(--color-accent)" }}>.</span>
          </h2>

          <p
            className="body-editorial mt-8 max-w-lg"
            style={{ marginTop: 28 }}
          >
            Open to discussing projects, creative ideas, or opportunities to
            build something quietly excellent.
          </p>
        </div>

        <div className="flex flex-col gap-10 md:items-end md:text-right">
          <div>
            <p className="label-micro" style={{ marginBottom: 12 }}>
              Socials
            </p>
            <ul className="flex flex-col gap-2 md:items-end">
              <li>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)",
                    color: "var(--color-text)",
                  }}
                >
                  LinkedIn
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)",
                    color: "var(--color-text)",
                  }}
                >
                  GitHub
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-micro" style={{ marginBottom: 12 }}>
              Say Hello
            </p>
            <a
              href={`mailto:${socials.email}`}
              className="link-underline"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)",
                fontStyle: "italic",
                color: "var(--color-text)",
              }}
            >
              {socials.email}
            </a>
          </div>
        </div>
      </div>

      <footer
        className="mt-32 flex items-center justify-between pt-6"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <p className="label-micro" style={{ margin: 0 }}>
          &copy; 2026 {identity.firstName} {identity.lastName}
        </p>
        <p className="label-micro" style={{ margin: 0 }}>
          Built with passion and code
        </p>
      </footer>
    </section>
  );
}
