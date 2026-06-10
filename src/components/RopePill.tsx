"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { RopeDangle } from "./RopeDangle";

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const COLLAPSED_WIDTH = "32px";
const CLOSE_GRACE_MS = 220; // lets the cursor travel from icon to hanging pill

/**
 * Shared shell for the navbar social pills.
 *
 * Fine pointers: the icon stays a 32px circle and hovering drops the
 * expanded pill itself below it as a free-flowing rope (RopeDangle). Touch
 * and reduced-motion users get the original in-place width expansion.
 */
export function RopePill({
  href,
  ariaLabel,
  expandedWidth,
  iconSrc,
  iconSize = 14,
  iconMuted = false,
  text,
}: {
  href: string;
  ariaLabel: string;
  expandedWidth: number;
  iconSrc: string;
  iconSize?: number;
  /** Dims the icon circle (e.g. Spotify when nothing is playing). */
  iconMuted?: boolean;
  /** Pill label — flows along the rope on desktop. */
  text: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [ropeMode, setRopeMode] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    // The rope works for touch too (tap to drop, tap away to close) — and
    // unlike the in-place expansion it never overflows a narrow navbar.
    setRopeMode(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  // Outside-tap collapse (touch has no hover to release the pill).
  useEffect(() => {
    if (!expanded || !isTouch) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (target.closest?.("[data-rope-portal]")) return;
      if (anchorRef.current && !anchorRef.current.contains(target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [expanded, isTouch]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const hold = () => {
    window.clearTimeout(closeTimer.current);
    setExpanded(true);
  };
  const release = () => {
    if (isTouch) return; // touch closes via outside-tap, not hover loss
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(
      () => setExpanded(false),
      ropeMode ? CLOSE_GRACE_MS : 0,
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // First tap drops the rope (or expands, reduced-motion); second opens.
    if (isTouch && !expanded) {
      e.preventDefault();
      hold();
    }
  };

  return (
    <>
      <a
        ref={anchorRef}
        href={href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={isTouch ? undefined : hold}
        onMouseLeave={release}
        onClick={handleClick}
        aria-label={ariaLabel}
        className={cn(
          "relative flex h-8 items-center justify-end overflow-hidden rounded-full bg-text",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bg/30 focus-visible:ring-offset-2",
        )}
        style={{
          width:
            !ropeMode && expanded
              ? `min(${expandedWidth}px, calc(100vw - 240px))`
              : COLLAPSED_WIDTH,
          transition: `width 380ms ${EASE}`,
          willChange: "width",
        }}
      >
        {!ropeMode && (
          <span
            className="min-w-0 flex-1 truncate pl-4 pr-2 font-body text-[12px] leading-none text-bg/95"
            style={{
              opacity: expanded ? 1 : 0,
              transform: expanded ? "translateX(0)" : "translateX(8px)",
              transition: `opacity 280ms ${EASE} ${expanded ? "100ms" : "0ms"}, transform 280ms ${EASE} ${expanded ? "100ms" : "0ms"}`,
              willChange: "opacity, transform",
            }}
          >
            {text}
          </span>
        )}
        <span
          aria-hidden
          className={cn(
            "mx-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
            iconMuted ? "bg-bg/55" : "bg-bg",
          )}
        >
          <img
            src={iconSrc}
            alt=""
            width={iconSize}
            height={iconSize}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </span>
      </a>

      {ropeMode && (
        <RopeDangle
          open={expanded}
          anchorEl={anchorRef.current}
          length={expandedWidth}
          href={href}
          ariaLabel={ariaLabel}
          text={text}
          iconSrc={iconSrc}
          iconSize={iconSize}
          iconMuted={iconMuted}
          onHoverChangeAction={(h) => (h ? hold() : release())}
        />
      )}
    </>
  );
}
