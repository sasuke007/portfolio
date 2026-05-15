"use client";

import { useEffect, useState } from "react";
import { identity, navLinks } from "@/content";
import { cn } from "@/lib/cn";
import { SpotifyPill } from "./SpotifyPill";
import { XPill } from "./XPill";
import { GithubPill } from "./GithubPill";
import { LinkedInLink } from "./LinkedInLink";
import { EmailLink } from "./EmailLink";
import { Tooltip } from "./Tooltip";

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
      className={cn(
        "fixed left-0 right-0 top-0 z-50 backdrop-saturate-150 transition-[background,backdrop-filter] duration-500 ease-soft",
        scrolled
          ? "backdrop-blur-[20px] bg-[linear-gradient(to_bottom,rgba(250,250,250,0.82)_0%,rgba(250,250,250,0.5)_60%,rgba(250,250,250,0)_100%)]"
          : "backdrop-blur-[10px] bg-[linear-gradient(to_bottom,rgba(250,250,250,0.35)_0%,rgba(250,250,250,0)_100%)]",
      )}
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
      }}
    >
      <nav className="mx-auto flex max-w-(--max-width) items-center justify-between px-6 pt-10 pb-8">
        <a
          href="#top"
          className="font-display font-semibold text-[22px] leading-none tracking-display"
        >
          R<span className="text-accent">P</span>
        </a>

        <ul className="hidden gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-underline font-body font-normal text-[12px] uppercase tracking-[0.12em] text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Tooltip label="Email">
            <EmailLink />
          </Tooltip>
          <Tooltip label="LinkedIn">
            <LinkedInLink />
          </Tooltip>
          <Tooltip label="GitHub">
            <GithubPill />
          </Tooltip>
          <Tooltip label="X">
            <XPill />
          </Tooltip>
          <Tooltip label="Spotify">
            <SpotifyPill />
          </Tooltip>
          <a
            href={identity.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-text px-5 py-2 font-body font-normal text-[12px] uppercase tracking-[0.12em] text-bg transition-transform hover:scale-[1.03]"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
