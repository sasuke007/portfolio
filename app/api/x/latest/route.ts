import { NextResponse } from "next/server";
import { getLatestTweet } from "@/lib/x";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const tweet = await getLatestTweet();
    return NextResponse.json(
      { tweet },
      {
        headers: {
          // 3 hours fresh, 6 hours stale-while-revalidate.
          "Cache-Control":
            "public, s-maxage=10800, stale-while-revalidate=21600",
        },
      },
    );
  } catch (err) {
    console.error("[/api/x/latest]", err);
    return NextResponse.json(
      { tweet: null, error: "fetch_failed" },
      { status: 500 },
    );
  }
}
