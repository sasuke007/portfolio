import { getYearsOfContributions } from "@/lib/github-contributions";
import { GithubContributionsCarousel } from "./GithubContributionsCarousel";

export async function GithubSection() {
  const result = await getYearsOfContributions();
  if (!result) return null;

  const { yearsData, username } = result;
  const profileUrl = `https://github.com/${username}`;

  const lifetimeTotal = Object.values(yearsData).reduce(
    (sum, cal) => sum + cal.totalContributions,
    0,
  );

  return (
    <section
      id="github"
      className="relative mx-auto max-w-(--max-width) px-6 py-16 md:py-24"
    >
      <h2 className="m-0 max-w-3xl font-display font-normal text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.1] tracking-[-0.015em]">
        <em className="italic font-normal text-accent">
          {lifetimeTotal.toLocaleString()}
        </em>{" "}
        public contributions.
      </h2>

      <div className="mt-12">
        <GithubContributionsCarousel
          yearsData={yearsData}
          profileUrl={profileUrl}
        />
      </div>
    </section>
  );
}
