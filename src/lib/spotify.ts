import {
  NowPlayingResponseSchema,
  RecentlyPlayedResponseSchema,
  TokenResponseSchema,
  type SpotifyTrack,
} from "./spotify-schema";

export { SpotifyTrackSchema, type SpotifyTrack } from "./spotify-schema";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

class SpotifyError extends Error {
  cause?: unknown;
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "SpotifyError";
    this.cause = cause;
  }
}

// Module-level token cache — lives across requests within a warm instance.
let tokenCache: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new SpotifyError("Missing Spotify env credentials");
  }

  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.value;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  let res: Response;
  try {
    res = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    });
  } catch (err) {
    throw new SpotifyError("Network error during token refresh", err);
  }

  if (!res.ok) {
    throw new SpotifyError(`Token refresh failed: ${res.status}`);
  }

  let raw: unknown;
  try {
    raw = await res.json();
  } catch (err) {
    throw new SpotifyError("Invalid JSON in token response", err);
  }

  const parsed = TokenResponseSchema.safeParse(raw);
  if (!parsed.success) {
    throw new SpotifyError(
      `Token response schema mismatch: ${parsed.error.message}`,
    );
  }

  const ttlMs = (parsed.data.expires_in ?? 3600) * 1000;
  tokenCache = { value: parsed.data.access_token, expiresAt: now + ttlMs };
  return tokenCache.value;
}

async function fetchNowPlaying(token: string): Promise<SpotifyTrack | null> {
  const res = await fetch(NOW_PLAYING, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 204) return null;
  if (res.status === 401) {
    tokenCache = null;
    throw new SpotifyError("Access token rejected (401)");
  }
  if (!res.ok) {
    throw new SpotifyError(`currently-playing failed: ${res.status}`);
  }

  let raw: unknown;
  try {
    raw = await res.json();
  } catch (err) {
    throw new SpotifyError("Invalid JSON in currently-playing response", err);
  }

  const parsed = NowPlayingResponseSchema.safeParse(raw);
  if (!parsed.success) {
    throw new SpotifyError(
      `currently-playing schema mismatch: ${parsed.error.message}`,
    );
  }

  const item = parsed.data.item;
  if (!item) return null;

  return {
    isPlaying: parsed.data.is_playing,
    title: item.name,
    artist: item.artists.map((a) => a.name).join(", "),
    album: item.album.name,
    albumImage: item.album.images[0]?.url,
    url: item.external_urls.spotify,
    progressMs: parsed.data.progress_ms ?? 0,
    durationMs: item.duration_ms,
  };
}

async function fetchRecentlyPlayed(
  token: string,
): Promise<SpotifyTrack | null> {
  const res = await fetch(RECENTLY_PLAYED, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 401) {
    tokenCache = null;
    throw new SpotifyError("Access token rejected (401)");
  }
  if (!res.ok) {
    throw new SpotifyError(`recently-played failed: ${res.status}`);
  }

  let raw: unknown;
  try {
    raw = await res.json();
  } catch (err) {
    throw new SpotifyError("Invalid JSON in recently-played response", err);
  }

  const parsed = RecentlyPlayedResponseSchema.safeParse(raw);
  if (!parsed.success) {
    throw new SpotifyError(
      `recently-played schema mismatch: ${parsed.error.message}`,
    );
  }

  const item = parsed.data.items[0]?.track;
  if (!item) return null;

  return {
    isPlaying: false,
    title: item.name,
    artist: item.artists.map((a) => a.name).join(", "),
    album: item.album.name,
    albumImage: item.album.images[0]?.url,
    url: item.external_urls.spotify,
  };
}

export async function getSpotifyTrack(): Promise<SpotifyTrack | null> {
  try {
    const token = await getAccessToken();
    const now = await fetchNowPlaying(token);
    if (now) return now;
    const recent = await fetchRecentlyPlayed(token);
    return recent;
  } catch (err) {
    if (err instanceof SpotifyError) {
      console.error(`[spotify] ${err.message}`, err.cause ?? "");
    } else {
      console.error("[spotify] unexpected error", err);
    }
    return null;
  }
}
