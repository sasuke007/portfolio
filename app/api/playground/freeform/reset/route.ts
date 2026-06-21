import { NextResponse } from "next/server";
import {
  lookupSessionByToken,
  readSessionCookieToken,
} from "@/lib/playground/session";
import { resetFreeformSession } from "@/lib/playground/freeform";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const token = await readSessionCookieToken();
    if (!token) {
      return NextResponse.json({ error: "no_session" }, { status: 401 });
    }
    const session = await lookupSessionByToken(token);
    if (!session) {
      return NextResponse.json({ error: "session_expired" }, { status: 401 });
    }
    await resetFreeformSession(session.sessionId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/playground/freeform/reset]", err);
    return NextResponse.json({ error: "reset_failed" }, { status: 500 });
  }
}
