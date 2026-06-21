import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// The Vercel Marketplace install of Upstash Redis provisions
// KV_REST_API_URL and KV_REST_API_TOKEN (not the UPSTASH_REDIS_REST_*
// names the @upstash/redis client looks for via Redis.fromEnv()).
// Read both naming schemes so this works regardless of how Upstash
// was provisioned.
function upstashUrl(): string | undefined {
  return process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
}
function upstashToken(): string | undefined {
  return process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
}

// Graceful degradation: if Upstash isn't configured, every limit check
// returns success. Lets local dev run without the Marketplace integration.
const ENABLED = Boolean(upstashUrl() && upstashToken());

let _redis: Redis | null = null;
function redis(): Redis {
  if (_redis) return _redis;
  _redis = new Redis({
    url: upstashUrl()!,
    token: upstashToken()!,
  });
  return _redis;
}

function makeLimiter(
  prefix: string,
  limiter: ReturnType<typeof Ratelimit.fixedWindow>,
): Ratelimit | null {
  if (!ENABLED) return null;
  return new Ratelimit({
    redis: redis(),
    limiter,
    analytics: false,
    prefix: `pgp:${prefix}`,
  });
}

const ipBurst = makeLimiter("ipBurst", Ratelimit.fixedWindow(10, "10 s"));
const ipHourly = makeLimiter("ipHourly", Ratelimit.fixedWindow(60, "1 h"));
const sessionFreeform = makeLimiter(
  "sessionFreeform",
  Ratelimit.fixedWindow(30, "60 s"),
);

export type LimitResult = {
  success: boolean;
  limit?: number;
  remaining?: number;
  reset?: number; // ms epoch
};

const PASS: LimitResult = { success: true };

export async function checkIpLimits(ip: string): Promise<LimitResult> {
  if (!ENABLED) return PASS;
  const burst = await ipBurst!.limit(ip);
  if (!burst.success) {
    return {
      success: false,
      limit: burst.limit,
      remaining: burst.remaining,
      reset: burst.reset,
    };
  }
  const hourly = await ipHourly!.limit(ip);
  if (!hourly.success) {
    return {
      success: false,
      limit: hourly.limit,
      remaining: hourly.remaining,
      reset: hourly.reset,
    };
  }
  return PASS;
}

export async function checkSessionFreeformLimit(
  sessionId: string,
): Promise<LimitResult> {
  if (!ENABLED) return PASS;
  const r = await sessionFreeform!.limit(sessionId);
  return r.success
    ? PASS
    : {
        success: false,
        limit: r.limit,
        remaining: r.remaining,
        reset: r.reset,
      };
}

/**
 * One-at-a-time mutex per session for scenario runs. Implemented as Redis
 * SET NX with TTL. Returns a `release` fn the caller MUST invoke in finally.
 * If Upstash isn't configured, release is a no-op.
 */
export async function acquireRunMutex(
  sessionId: string,
  ttlSeconds = 15,
): Promise<{ ok: true; release: () => Promise<void> } | { ok: false }> {
  if (!ENABLED) {
    return { ok: true, release: async () => undefined };
  }
  const key = `pgp:runlock:${sessionId}`;
  const acquired = await redis().set(key, "1", { nx: true, ex: ttlSeconds });
  if (acquired !== "OK") return { ok: false };
  return {
    ok: true,
    release: async () => {
      await redis().del(key);
    },
  };
}
