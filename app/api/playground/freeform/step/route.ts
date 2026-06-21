import { NextResponse } from "next/server";
import {
  ipFromRequest,
  lookupSessionByToken,
  readSessionCookieToken,
  touchSession,
} from "@/lib/playground/session";
import {
  checkIpLimits,
  checkSessionFreeformLimit,
} from "@/lib/playground/ratelimit";
import { freeformStepBodySchema } from "@/lib/playground/schemas";
import { freeformStep } from "@/lib/playground/freeform";

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

    const sessionLimit = await checkSessionFreeformLimit(session.sessionId);
    if (!sessionLimit.success) {
      return NextResponse.json(
        { error: "rate_limited", reset: sessionLimit.reset },
        { status: 429 },
      );
    }

    const json = await req.json();
    const parsed = freeformStepBodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "bad_request", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    await touchSession(session.sessionId);
    const result = await freeformStep(
      session.sessionId,
      session.schema,
      parsed.data,
    );
    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/playground/freeform/step]", err);
    return NextResponse.json({ error: "step_failed" }, { status: 500 });
  }
}
