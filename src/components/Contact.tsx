"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { identity, socials } from "@/content";
import { Spline } from "@/components/Spline";

const CONTACT_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function Contact() {
  const linkClass =
    "link-underline inline-flex items-center gap-1 font-display text-[clamp(1.3rem,2.2vw,1.75rem)] text-text";

  // The robot is desktop-only (it crowds/clips on mobile) and its Spline runtime
  // is heavy (~0.5MB), so defer mounting it until the section is near the
  // viewport — keeps it off the initial desktop load and out of mobile entirely.
  // Default false → SSR/first render match (no hydration mismatch).
  const sectionRef = useRef<HTMLElement>(null);
  const [showRobot, setShowRobot] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !window.matchMedia("(min-width: 768px)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowRobot(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative isolate mx-auto max-w-(--max-width) scroll-mt-28 px-6 py-32 md:scroll-mt-32 md:py-44"
    >
      {/* Decorative robot — desktop only (removed on mobile). */}
      {showRobot && (
        <Spline
          scene={CONTACT_SCENE}
          backgroundColor="transparent"
          globalEvents
          decorative
          className="pointer-events-none absolute inset-0 z-0"
        />
      )}

      <div className="relative z-10 grid grid-cols-1 gap-16 md:grid-cols-[2fr_1fr] md:items-end">
        <div>
          <h2 className="m-0 lowercase font-display font-normal text-[clamp(3rem,8vw,6rem)] leading-[1.02] tracking-display">
            <span className="italic">follow</span> the journey
            <span className="text-accent">.</span>
          </h2>

          <p className="body-editorial mt-7 max-w-lg">
            Try Replay Chess, tell me what to build next, or just say hello.
            The next product always starts with a conversation.
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

      <footer className="relative z-10 mt-32 flex items-center justify-between border-t border-border pt-6">
        <p className="label-micro m-0">
          &copy; 2026 {identity.firstName} {identity.lastName}
        </p>
        <p className="label-micro m-0">Built with passion and code</p>
      </footer>
    </section>
  );
}
