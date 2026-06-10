"use client";

import { useEffect, useState } from "react";
import { RopePill } from "./RopePill";
import {
  GithubCommitSchema,
  type GithubCommit,
} from "@/lib/github-schema";

const POLL_INTERVAL_MS = 5 * 60_000; // 5 minutes
const EXPANDED_WIDTH = 280;

const ResponseSchema = GithubCommitSchema.nullable();

export function GithubPill() {
  const [commit, setCommit] = useState<GithubCommit | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;

    const refresh = async () => {
      try {
        const res = await fetch("/api/github/latest", { cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const json = await res.json();
        const parsed = ResponseSchema.safeParse(json.commit);
        if (!parsed.success) {
          console.warn("[github] response schema mismatch", parsed.error);
          return;
        }
        if (!cancelled) setCommit(parsed.data);
      } catch (err) {
        console.warn("[github] poll failed", err);
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

  if (!commit) return null;

  // Show only the first line of the commit message; trim if too long.
  const firstLine = commit.message.split("\n")[0] ?? commit.message;
  const excerpt =
    firstLine.length > 60 ? `${firstLine.slice(0, 60).trim()}…` : firstLine;

  // Repo display: drop the owner prefix for compactness.
  const repoShort = commit.repo.split("/")[1] ?? commit.repo;

  return (
    <RopePill
      href={commit.url}
      ariaLabel={`Latest commit: ${firstLine} in ${commit.repo}`}
      expandedWidth={EXPANDED_WIDTH}
      iconSrc="/assets/github.svg"
      iconSize={14}
      text={`${excerpt} · ${repoShort} · ${formatRelative(commit.createdAt)}`}
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
