"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  SpotifyTrackSchema,
  type SpotifyTrack,
} from "@/lib/spotify-schema";

const POLL_INTERVAL_MS = 60_000;
const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const COLLAPSED_WIDTH = "32px";
const EXPANDED_WIDTH = "224px";

const ResponseSchema = SpotifyTrackSchema.nullable();

export function SpotifyPill() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const wrapRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // ─── Polling ────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;

    const refresh = async () => {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const json = await res.json();
        const parsed = ResponseSchema.safeParse(json.track);
        if (!parsed.success) {
          console.warn("[spotify] response schema mismatch", parsed.error);
          return;
        }
        if (!cancelled) setTrack(parsed.data);
      } catch (err) {
        console.warn("[spotify] poll failed", err);
      }
    };

    const schedule = () => {
      timeoutId = window.setTimeout(async () => {
        await refresh();
        if (!cancelled) schedule();
      }, POLL_INTERVAL_MS);
    };

    refresh().then(() => {
      if (!cancelled) schedule();
    });

    const onVisibility = () => {
      if (document.visibilityState === "visible" && !cancelled) {
        refresh();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // ─── Outside-click collapse on touch ───────────────────────────────────
  useEffect(() => {
    if (!expanded || !isTouch) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (target && wrapRef.current && !wrapRef.current.contains(target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [expanded, isTouch]);

  const handleMouseEnter = () => {
    if (!isTouch) setExpanded(true);
  };
  const handleMouseLeave = () => {
    if (!isTouch) setExpanded(false);
  };
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouch && !expanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  if (!track) return null;

  return (
    <a
      ref={wrapRef}
      href={track.url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-label={`${track.isPlaying ? "Now playing" : "Last played"}: ${track.title} by ${track.artist}`}
      className={cn(
        "relative flex h-8 items-center justify-end overflow-hidden rounded-full bg-text",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bg/30 focus-visible:ring-offset-2",
      )}
      style={{
        width: expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        transition: `width 380ms ${EASE}`,
        willChange: "width",
      }}
    >
      {/* Track text — flex-1, opacity-controlled, single line */}
      <span
        className="min-w-0 flex-1 truncate pl-4 pr-2 font-body text-[12px] leading-none text-bg/95"
        style={{
          opacity: expanded ? 1 : 0,
          transform: expanded ? "translateX(0)" : "translateX(8px)",
          transition: `opacity 280ms ${EASE} ${expanded ? "100ms" : "0ms"}, transform 280ms ${EASE} ${expanded ? "100ms" : "0ms"}`,
          willChange: "opacity, transform",
        }}
      >
        {track.title}
        <span className="text-bg/55"> · </span>
        {track.artist}
      </span>

      {/* Icon circle — always visible, anchored to right */}
      <span
        aria-hidden
        className={cn(
          "mx-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          track.isPlaying ? "bg-bg" : "bg-bg/55",
        )}
      >
        <img
          src="/assets/spotify.svg"
          alt=""
          width={16}
          height={16}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </span>
    </a>
  );
}
