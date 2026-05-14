"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { XTweetSchema, type XTweet } from "@/lib/x-schema";

const POLL_INTERVAL_MS = 3 * 60 * 60_000; // 3 hours
const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const COLLAPSED_WIDTH = "32px";
const EXPANDED_WIDTH = "264px";

const ResponseSchema = XTweetSchema.nullable();

export function XPill() {
  const [tweet, setTweet] = useState<XTweet | null>(null);
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
        const res = await fetch("/api/x/latest", { cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const json = await res.json();
        const parsed = ResponseSchema.safeParse(json.tweet);
        if (!parsed.success) {
          console.warn("[x] response schema mismatch", parsed.error);
          return;
        }
        if (!cancelled) setTweet(parsed.data);
      } catch (err) {
        console.warn("[x] poll failed", err);
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

  if (!tweet) return null;

  const excerpt =
    tweet.text.length > 70 ? `${tweet.text.slice(0, 70).trim()}…` : tweet.text;

  return (
    <a
      ref={wrapRef}
      href={tweet.url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-label={`Latest post: ${tweet.text}`}
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
      {/* Tweet excerpt + relative time */}
      <span
        className="min-w-0 flex-1 truncate pl-4 pr-2 font-body text-[12px] leading-none text-bg/95"
        style={{
          opacity: expanded ? 1 : 0,
          transform: expanded ? "translateX(0)" : "translateX(8px)",
          transition: `opacity 280ms ${EASE} ${expanded ? "100ms" : "0ms"}, transform 280ms ${EASE} ${expanded ? "100ms" : "0ms"}`,
          willChange: "opacity, transform",
        }}
      >
        {excerpt}
        <span className="text-bg/55"> · </span>
        {formatRelative(tweet.createdAt)}
      </span>

      {/* X icon circle — always visible, anchored right */}
      <span
        aria-hidden
        className="mx-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg"
      >
        <img
          src="/assets/x.svg"
          alt=""
          width={14}
          height={14}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </span>
    </a>
  );
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diffMs = Date.now() - then;
  const sec = Math.max(0, Math.floor(diffMs / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  const wk = Math.floor(day / 7);
  if (wk < 5) return `${wk}w ago`;
  const mo = Math.floor(day / 30);
  return `${mo}mo ago`;
}
