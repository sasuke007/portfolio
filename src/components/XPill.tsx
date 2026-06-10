"use client";

import { useEffect, useState } from "react";
import { RopePill } from "./RopePill";
import { XTweetSchema, type XTweet } from "@/lib/x-schema";

const POLL_INTERVAL_MS = 3 * 60 * 60_000; // 3 hours
const EXPANDED_WIDTH = 264;

const ResponseSchema = XTweetSchema.nullable();

export function XPill() {
  const [tweet, setTweet] = useState<XTweet | null>(null);

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

  if (!tweet) return null;

  const excerpt =
    tweet.text.length > 70 ? `${tweet.text.slice(0, 70).trim()}…` : tweet.text;

  return (
    <RopePill
      href={tweet.url}
      ariaLabel={`Latest post: ${tweet.text}`}
      expandedWidth={EXPANDED_WIDTH}
      iconSrc="/assets/x.svg"
      iconSize={14}
      text={`${excerpt} · ${formatRelative(tweet.createdAt)}`}
    />
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
