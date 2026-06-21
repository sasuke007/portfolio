import { NextResponse } from "next/server";
import {
  bootstrapSession,
  clearSessionCookie,
  destroySession,
  ipFromRequest,
  lookupSessionByToken,
  readSessionCookieToken,
  setSessionCookie,
  SessionLimitError,
} from "@/lib/playground/session";
import { checkIpLimits } from "@/lib/playground/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const ip = ipFromRequest(req);
    const limit = await checkIpLimits(ip);
    if (!limit.success) {
      return NextResponse.json(
        { error: "rate_limited", reset: limit.reset },
        { status: 429 },
      );
    }
    const session = await bootstrapSession(ip);
    await setSessionCookie(session.sessionId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof SessionLimitError) {
      return NextResponse.json(
        { error: "session_limit_per_ip" },
        { status: 429 },
      );
    }
    console.error("[/api/playground/session POST]", err);
    return NextResponse.json({ error: "bootstrap_failed" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const token = await readSessionCookieToken();
    if (token) {
      const s = await lookupSessionByToken(token);
      if (s) await destroySession(s.sessionId);
    }
    await clearSessionCookie();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/playground/session DELETE]", err);
    return NextResponse.json({ error: "destroy_failed" }, { status: 500 });
  }
}
