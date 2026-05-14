import {
  RawTweetsResponseSchema,
  type XTweet,
} from "./x-schema";

export { XTweetSchema, type XTweet } from "./x-schema";

class XError extends Error {
  cause?: unknown;
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "XError";
    this.cause = cause;
  }
}

export async function getLatestTweet(): Promise<XTweet | null> {
  const bearer = process.env.X_BEARER_TOKEN;
  const userId = process.env.X_USER_ID;
  const handle = process.env.X_HANDLE;
  if (!bearer || !userId || !handle) return null;

  try {
    const url = new URL(`https://api.x.com/2/users/${userId}/tweets`);
    url.searchParams.set("max_results", "5");
    url.searchParams.set("exclude", "replies,retweets");
    url.searchParams.set("tweet.fields", "created_at");

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${bearer}` },
      next: { revalidate: 10_800 }, // 3 hours
    });

    if (res.status === 401) {
      throw new XError("Bearer token rejected (401)");
    }
    if (res.status === 429) {
      throw new XError("Rate limited (429)");
    }
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      if (text.includes("CreditsDepleted")) {
        throw new XError("CreditsDepleted");
      }
      throw new XError(`tweets endpoint failed: ${res.status}`);
    }

    let raw: unknown;
    try {
      raw = await res.json();
    } catch (err) {
      throw new XError("Invalid JSON in tweets response", err);
    }

    const parsed = RawTweetsResponseSchema.safeParse(raw);
    if (!parsed.success) {
      throw new XError(`tweets schema mismatch: ${parsed.error.message}`);
    }

    const first = parsed.data.data?.[0];
    if (!first) return null;

    return {
      id: first.id,
      text: first.text,
      createdAt: first.created_at,
      url: `https://x.com/${handle}/status/${first.id}`,
    };
  } catch (err) {
    if (err instanceof XError) {
      console.error(`[x] ${err.message}`, err.cause ?? "");
    } else {
      console.error("[x] unexpected error", err);
    }
    return null;
  }
}
