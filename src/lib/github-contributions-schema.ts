import { z } from "zod";

export const ContributionLevelSchema = z.enum([
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
]);

export type ContributionLevel = z.infer<typeof ContributionLevelSchema>;

const ContributionDaySchema = z.object({
  contributionCount: z.number(),
  contributionLevel: ContributionLevelSchema,
  date: z.string(),
});

const ContributionWeekSchema = z.object({
  contributionDays: z.array(ContributionDaySchema),
});

const ContributionCalendarSchema = z.object({
  totalContributions: z.number(),
  weeks: z.array(ContributionWeekSchema),
});

export const ContributionsResponseSchema = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: ContributionCalendarSchema,
      }),
    }),
  }),
});

export type ContributionDay = z.infer<typeof ContributionDaySchema>;
export type ContributionWeek = z.infer<typeof ContributionWeekSchema>;
export type ContributionCalendar = z.infer<typeof ContributionCalendarSchema>;
