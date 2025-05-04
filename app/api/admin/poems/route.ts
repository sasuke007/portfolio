import { NextRequest, NextResponse } from "next/server";
import { getAllPoems } from "@/lib/services/poem.service";

export async function GET(request: NextRequest) {
  try {
    const poems = await getAllPoems();
    return NextResponse.json({ success: true, poems }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching poems:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch poems" },
      { status: 500 }
    );
  }
} 