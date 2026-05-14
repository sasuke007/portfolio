import { z } from "zod";

// ─── Raw Spotify API schemas (used server-side only) ────────────────────────

export const TokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number().optional(),
  token_type: z.string().optional(),
});

const ArtistSchema = z.object({ name: z.string() });
const ImageSchema = z.object({ url: z.string() });
const AlbumSchema = z.object({
  name: z.string(),
  images: z.array(ImageSchema).default([]),
});

const TrackItemSchema = z.object({
  name: z.string(),
  artists: z.array(ArtistSchema),
  album: AlbumSchema,
  duration_ms: z.number(),
  external_urls: z.object({ spotify: z.string() }),
});

export const NowPlayingResponseSchema = z.object({
  is_playing: z.boolean(),
  progress_ms: z.number().nullable().optional(),
  item: TrackItemSchema.nullable().optional(),
});

export const RecentlyPlayedResponseSchema = z.object({
  items: z.array(z.object({ track: TrackItemSchema })),
});

// ─── Normalised, client-safe shape ──────────────────────────────────────────

export const SpotifyTrackSchema = z.object({
  isPlaying: z.boolean(),
  title: z.string(),
  artist: z.string(),
  album: z.string(),
  albumImage: z.string().optional(),
  url: z.string(),
  progressMs: z.number().optional(),
  durationMs: z.number().optional(),
});

export type SpotifyTrack = z.infer<typeof SpotifyTrackSchema>;
