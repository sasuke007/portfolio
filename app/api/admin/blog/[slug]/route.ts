import { NextRequest, NextResponse } from "next/server";
import { getBlogBySlug } from "@/lib/services/blog.service";
import { updateBlog } from "@/lib/services/blog.service";
import { BlogDTO, CreateBlog } from "@/types/blog";

// GET request handler to fetch a blog by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Make sure params is not a Promise before accessing slug
    const resolvedParams = params instanceof Promise ? await params : params;
    const slug = resolvedParams.slug;
    
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// PUT request handler to update a blog by slug
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const data: CreateBlog = await request.json();
    const updatedBlog: BlogDTO = await updateBlog(slug, data);

    return NextResponse.json({ success: true, blog: updatedBlog }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update blog" },
      { status: 500 }
    );
  }
} 