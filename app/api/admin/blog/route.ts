import { NextRequest, NextResponse } from "next/server";
import { createBlog } from "@/lib/services/blog.service";
import { CreateBlog, createBlogSchema } from "@/types/blog";

export async function POST(request: NextRequest) {
  try {
    const createBlogRequest: CreateBlog = createBlogSchema.parse(
      request.json()
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
