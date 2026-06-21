import { z } from "zod";

export const isoLevelSchema = z.enum([
  "READ UNCOMMITTED",
  "READ COMMITTED",
  "REPEATABLE READ",
  "SERIALIZABLE",
]);

export const scenarioIdSchema = z.enum([
  "dirty-read",
  "non-repeatable-read",
  "phantom-read",
  "lost-update",
  "write-skew",
]);

export const txIdSchema = z.enum(["T1", "T2"]);

export const scenarioRunBodySchema = z.object({
  scenarioId: scenarioIdSchema,
  isolation: isoLevelSchema,
});
export type ScenarioRunBody = z.infer<typeof scenarioRunBodySchema>;

export const freeformStepBodySchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("begin"),
    tx: txIdSchema,
    isolation: isoLevelSchema,
  }),
  z.object({
    action: z.literal("sql"),
    tx: txIdSchema,
    sql: z.string().min(1).max(4096),
  }),
  z.object({
    action: z.literal("commit"),
    tx: txIdSchema,
  }),
  z.object({
    action: z.literal("rollback"),
    tx: txIdSchema,
  }),
]);
export type FreeformStepBody = z.infer<typeof freeformStepBodySchema>;
