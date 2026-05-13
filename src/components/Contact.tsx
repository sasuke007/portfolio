"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { identity, socials } from "@/content";

export function Contact() {
  const linkClass =
    "link-underline inline-flex items-center gap-1 font-display text-[clamp(1.3rem,2.2vw,1.75rem)] text-text";

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-(--max-width) px-6 py-32 md:py-44"
    >
      <SectionLabel index="06" name="CONCLUSION" />

      <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-[2fr_1fr] md:items-end">
        <div>
          <h2 className="m-0 lowercase font-display font-normal text-[clamp(3rem,8vw,6rem)] leading-[1.02] tracking-display">
            <span className="italic">let&rsquo;s</span> collaborate
            <span className="text-accent">.</span>
          </h2>

          <p className="body-editorial mt-7 max-w-lg">
            Open to discussing projects, creative ideas, or opportunities to
            build something quietly excellent.
          </p>
        </div>

        <div className="flex flex-col gap-10 md:items-end md:text-right">
          <div>
            <p className="label-micro mb-3">Socials</p>
            <ul className="flex flex-col gap-2 md:items-end">
              <li>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
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
                  className={linkClass}
                >
                  GitHub
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-micro mb-3">Say Hello</p>
            <a
              href={`mailto:${socials.email}`}
              className="link-underline font-display italic text-[clamp(1.3rem,2.2vw,1.75rem)] text-text"
            >
              {socials.email}
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-32 flex items-center justify-between border-t border-border pt-6">
        <p className="label-micro m-0">
          &copy; 2026 {identity.firstName} {identity.lastName}
        </p>
        <p className="label-micro m-0">Built with passion and code</p>
      </footer>
    </section>
  );
}
