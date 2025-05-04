import { NextRequest, NextResponse } from "next/server";
import { getPoemBySlug, updatePoem } from "@/lib/services/poem.service";
import { PoemDTO } from "@/types/poem";

// GET request handler to fetch a poem by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const poem = await getPoemBySlug(slug);

    if (!poem) {
      return NextResponse.json(
        { error: "Poem not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, poem }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching poem:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch poem" },
      { status: 500 }
    );
  }
}

// PUT request handler to update a poem by slug
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update the poem
    const updatedPoem = await updatePoem(slug, data);

    return NextResponse.json({ success: true, poem: updatedPoem }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating poem:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update poem" },
      { status: 500 }
    );
  }
} 