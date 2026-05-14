import { z } from "zod";

// ─── Raw X API schemas (server-side only) ───────────────────────────────────

export const RawTweetSchema = z.object({
  id: z.string(),
  text: z.string(),
  created_at: z.string(),
});

export const RawTweetsResponseSchema = z.object({
  data: z.array(RawTweetSchema).optional(),
  meta: z
    .object({
      result_count: z.number().optional(),
    })
    .optional(),
});

// ─── Normalised, client-safe shape ──────────────────────────────────────────

export const XTweetSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.string(),
  url: z.string(),
});

export type XTweet = z.infer<typeof XTweetSchema>;
