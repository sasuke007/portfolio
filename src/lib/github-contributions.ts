import {
  ContributionsResponseSchema,
  type ContributionCalendar,
} from "./github-contributions-schema";

export type {
  ContributionCalendar,
  ContributionDay,
  ContributionLevel,
  ContributionWeek,
} from "./github-contributions-schema";

const YEAR_FLOOR = 2020;

const QUERY = /* GraphQL */ `
  query ($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
            }
          }
        }
      }
    }
  }
`;

class GithubContribError extends Error {
  cause?: unknown;
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "GithubContribError";
    this.cause = cause;
  }
}

async function fetchCalendarForYear(
  username: string,
  token: string,
  year: number,
): Promise<ContributionCalendar | null> {
  const now = new Date();
  const currentYear = now.getUTCFullYear();
  const from = `${year}-01-01T00:00:00Z`;
  const to =
    year >= currentYear
      ? now.toISOString()
      : `${year}-12-31T23:59:59Z`;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username, from, to },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new GithubContribError(
        `GraphQL ${year} failed: ${res.status}`,
      );
    }

    const raw = await res.json();
    const parsed = ContributionsResponseSchema.safeParse(raw);
    if (!parsed.success) {
      throw new GithubContribError(
        `schema mismatch for ${year}: ${parsed.error.message}`,
      );
    }

    return parsed.data.data.user.contributionsCollection.contributionCalendar;
  } catch (err) {
    if (err instanceof GithubContribError) {
      console.error(`[github-contributions] ${err.message}`, err.cause ?? "");
    } else {
      console.error("[github-contributions] year", year, err);
    }
    return null;
  }
}

export type YearsData = Record<number, ContributionCalendar>;

export async function getYearsOfContributions(): Promise<{
  yearsData: YearsData;
  username: string;
} | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;
  if (!token || !username) return null;

  const currentYear = new Date().getUTCFullYear();
  const years = Array.from(
    { length: currentYear - YEAR_FLOOR + 1 },
    (_, i) => YEAR_FLOOR + i,
  );

  const results = await Promise.all(
    years.map((year) => fetchCalendarForYear(username, token, year)),
  );

  const yearsData: YearsData = {};
  years.forEach((year, i) => {
    const cal = results[i];
    if (cal) yearsData[year] = cal;
  });

  if (Object.keys(yearsData).length === 0) return null;
  return { yearsData, username };
}
