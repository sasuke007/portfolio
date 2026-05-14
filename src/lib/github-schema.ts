import { z } from "zod";

// ─── Raw GitHub API schemas (server-side only) ──────────────────────────────

// The events endpoint returns a truncated PushEvent payload (head SHA, ref, etc.)
// but typically OMITS the `commits` array. We pull the SHA and look up the
// commit separately via /repos/{repo}/commits/{sha}.
export const PushEventSchema = z.object({
  type: z.literal("PushEvent"),
  repo: z.object({ name: z.string() }), // "owner/repo"
  payload: z.object({
    head: z.string(), // SHA of the tip commit
    ref: z.string().optional(),
  }),
  created_at: z.string(),
});

export const EventsArraySchema = z.array(z.unknown());

// Single-commit response from /repos/{owner}/{repo}/commits/{sha}
export const RawCommitSchema = z.object({
  sha: z.string(),
  commit: z.object({
    message: z.string(),
  }),
});

// ─── Normalised, client-safe shape ──────────────────────────────────────────

export const GithubCommitSchema = z.object({
  message: z.string(),
  repo: z.string(), // "owner/repo"
  createdAt: z.string(),
  url: z.string(), // https://github.com/owner/repo/commit/sha
});

export type GithubCommit = z.infer<typeof GithubCommitSchema>;
