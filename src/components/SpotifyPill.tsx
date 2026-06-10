"use client";

import { useEffect, useState } from "react";
import { RopePill } from "./RopePill";
import {
  SpotifyTrackSchema,
  type SpotifyTrack,
} from "@/lib/spotify-schema";

const POLL_INTERVAL_MS = 60_000;
const EXPANDED_WIDTH = 224;

const ResponseSchema = SpotifyTrackSchema.nullable();

export function SpotifyPill() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);

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

  if (!track) return null;

  return (
    <RopePill
      href={track.url}
      ariaLabel={`${track.isPlaying ? "Now playing" : "Last played"}: ${track.title} by ${track.artist}`}
      expandedWidth={EXPANDED_WIDTH}
      iconSrc="/assets/spotify.svg"
      iconSize={16}
      iconMuted={!track.isPlaying}
      text={`${track.title} · ${track.artist}`}
    />
  );
}
