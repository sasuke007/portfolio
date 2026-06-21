import { NextResponse } from "next/server";
import { scenarios } from "@/lib/playground/scenarios";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    { scenarios },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
