import { NextResponse } from "next/server";
import { getSpotifyTrack } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const track = await getSpotifyTrack();
    return NextResponse.json(
      { track },
      {
        headers: {
          // Shared edge cache: 30s fresh, 60s stale-while-revalidate.
          // Keeps Spotify API calls bounded regardless of visitor traffic.
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      },
    );
  } catch (err) {
    console.error("[/api/now-playing]", err);
    return NextResponse.json(
      { track: null, error: "fetch_failed" },
      { status: 500 },
    );
  }
}
