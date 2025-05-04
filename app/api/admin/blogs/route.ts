import { NextRequest, NextResponse } from "next/server";
import { getAllBlogs } from "@/lib/services/blog.service";

export async function GET(request: NextRequest) {
  try {
    const blogs = await getAllBlogs();
    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch blogs" },
      { status: 500 }
    );
  }
} 