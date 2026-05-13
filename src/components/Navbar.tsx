"use client";

import { useEffect, useState } from "react";
import { identity, navLinks } from "@/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        background: scrolled ? "rgba(250,250,250,0.65)" : "rgba(250,250,250,0.0)",
        borderBottom: scrolled
          ? "1px solid var(--color-border)"
          : "1px solid transparent",
        transition:
          "background 400ms var(--ease-soft), border-color 400ms var(--ease-soft)",
      }}
    >
      <nav
        className="mx-auto flex items-center justify-between px-6 py-5"
        style={{ maxWidth: "var(--max-width)" }}
      >
        <a
          href="#top"
          className="leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: "-0.02em",
          }}
        >
          {identity.monogram}
        </a>

        <ul className="hidden gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-underline"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--color-text)",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={identity.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full px-5 py-2 transition-transform hover:scale-[1.03]"
          style={{
            background: "var(--color-text)",
            color: "var(--color-bg)",
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
