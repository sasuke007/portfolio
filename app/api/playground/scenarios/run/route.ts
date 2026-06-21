import { NextResponse } from "next/server";
import {
  ipFromRequest,
  lookupSessionByToken,
  readSessionCookieToken,
  touchSession,
} from "@/lib/playground/session";
import {
  acquireRunMutex,
  checkIpLimits,
} from "@/lib/playground/ratelimit";
import { scenarioRunBodySchema } from "@/lib/playground/schemas";
import { getScenario } from "@/lib/playground/scenarios";
import { scenarioRunStream } from "@/lib/playground/runner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const ip = ipFromRequest(req);
    const ipLimit = await checkIpLimits(ip);
    if (!ipLimit.success) {
      return NextResponse.json(
        { error: "rate_limited", reset: ipLimit.reset },
        { status: 429 },
      );
    }

    const token = await readSessionCookieToken();
    if (!token) {
      return NextResponse.json({ error: "no_session" }, { status: 401 });
    }
    const session = await lookupSessionByToken(token);
    if (!session) {
      return NextResponse.json({ error: "session_expired" }, { status: 401 });
    }

    const json = await req.json();
    const parsed = scenarioRunBodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "bad_request", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const scenario = getScenario(parsed.data.scenarioId);
    if (!scenario) {
      return NextResponse.json({ error: "unknown_scenario" }, { status: 404 });
    }

    const mutex = await acquireRunMutex(session.sessionId);
    if (!mutex.ok) {
      return NextResponse.json(
        { error: "scenario_already_running" },
        { status: 429 },
      );
    }

    await touchSession(session.sessionId);

    const stream = scenarioRunStream({
      scenario,
      isolation: parsed.data.isolation,
      sessionSchema: session.schema,
    });

    // Wrap the stream so we release the mutex when it finishes.
    const released = stream.pipeThrough(
      new TransformStream({
        async flush() {
          await mutex.release();
        },
      }),
    );

    return new Response(released, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "Cache-Control": "no-store",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[/api/playground/scenarios/run]", err);
    return NextResponse.json({ error: "run_failed" }, { status: 500 });
  }
}
