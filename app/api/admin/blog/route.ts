import { NextRequest, NextResponse } from "next/server";
import { createBlog } from "@/lib/services/blog.service";
import { CreateBlog, createBlogSchema } from "@/types/blog";
import { getAllBlogs } from "@/lib/services/blog.service";

export async function POST(request: NextRequest) {
  try {
    const createBlogRequest: CreateBlog = createBlogSchema.parse(
      await request.json()
    );
    const blog = await createBlog(createBlogRequest);

    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create blog post" },
      { status: 500 }
    );
  }
}

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