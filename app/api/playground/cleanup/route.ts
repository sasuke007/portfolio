import { NextResponse } from "next/server";
import { cleanupExpiredSessions } from "@/lib/playground/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "cron_disabled" }, { status: 503 });
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { dropped } = await cleanupExpiredSessions();
    return NextResponse.json({ dropped });
  } catch (err) {
    console.error("[/api/playground/cleanup]", err);
    return NextResponse.json({ error: "cleanup_failed" }, { status: 500 });
  }
}
