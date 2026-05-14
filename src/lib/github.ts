import {
  EventsArraySchema,
  PushEventSchema,
  RawCommitSchema,
  type GithubCommit,
} from "./github-schema";

export { GithubCommitSchema, type GithubCommit } from "./github-schema";

class GithubError extends Error {
  cause?: unknown;
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "GithubError";
    this.cause = cause;
  }
}

const COMMON_HEADERS = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
});

export async function getLatestCommit(): Promise<GithubCommit | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;
  if (!token || !username) return null;

  try {
    const eventsRes = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=30`,
      {
        headers: COMMON_HEADERS(token),
        next: { revalidate: 300 }, // 5 minutes
      },
    );

    if (eventsRes.status === 401) {
      throw new GithubError("Token rejected (401)");
    }
    if (eventsRes.status === 403) {
      throw new GithubError("Forbidden / rate limited (403)");
    }
    if (!eventsRes.ok) {
      throw new GithubError(`events endpoint failed: ${eventsRes.status}`);
    }

    let raw: unknown;
    try {
      raw = await eventsRes.json();
    } catch (err) {
      throw new GithubError("Invalid JSON in events response", err);
    }

    const arrParsed = EventsArraySchema.safeParse(raw);
    if (!arrParsed.success) {
      throw new GithubError(
        `events response not an array: ${arrParsed.error.message}`,
      );
    }

    // Find the first PushEvent.
    let push: { repo: string; sha: string; createdAt: string } | null = null;
    for (const event of arrParsed.data) {
      const parsed = PushEventSchema.safeParse(event);
      if (!parsed.success) continue;
      push = {
        repo: parsed.data.repo.name,
        sha: parsed.data.payload.head,
        createdAt: parsed.data.created_at,
      };
      break;
    }
    if (!push) return null;

    // Look up the commit's message — the events payload omits it.
    const commitRes = await fetch(
      `https://api.github.com/repos/${push.repo}/commits/${push.sha}`,
      {
        headers: COMMON_HEADERS(token),
        next: { revalidate: 300 },
      },
    );

    if (!commitRes.ok) {
      throw new GithubError(`commit endpoint failed: ${commitRes.status}`);
    }

    const commitRaw = await commitRes.json();
    const commitParsed = RawCommitSchema.safeParse(commitRaw);
    if (!commitParsed.success) {
      throw new GithubError(
        `commit response shape mismatch: ${commitParsed.error.message}`,
      );
    }

    // GitHub commit messages can be multi-line; show just the first line.
    const firstLine = commitParsed.data.commit.message.split("\n", 1)[0].trim();

    return {
      message: firstLine,
      repo: push.repo,
      createdAt: push.createdAt,
      url: `https://github.com/${push.repo}/commit/${push.sha}`,
    };
  } catch (err) {
    if (err instanceof GithubError) {
      console.error(`[github] ${err.message}`, err.cause ?? "");
    } else {
      console.error("[github] unexpected error", err);
    }
    return null;
  }
}
