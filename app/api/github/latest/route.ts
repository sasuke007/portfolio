import { NextResponse } from "next/server";
import { getLatestCommit } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const commit = await getLatestCommit();
    return NextResponse.json(
      { commit },
      {
        headers: {
          // 5 minutes fresh, 15 minutes stale-while-revalidate.
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
        },
      },
    );
  } catch (err) {
    console.error("[/api/github/latest]", err);
    return NextResponse.json(
      { commit: null, error: "fetch_failed" },
      { status: 500 },
    );
  }
}
