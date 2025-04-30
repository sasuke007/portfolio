import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const data = await request.json();
    const {
      title,
      slug,
      content,
      description,
      category,
      tags,
      is_published,
      author,
      meta_title,
      meta_description,
      meta_keywords,
      published_at,
      priority,
    } = data;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Missing required fields: title, slug, and content are required" },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existingPoem = await prisma.poem.findUnique({
      where: { slug },
    });

    if (existingPoem) {
      return NextResponse.json(
        { error: "A poem with this slug already exists" },
        { status: 400 }
      );
    }

    // Create the poem
    const poem = await prisma.poem.create({
      data: {
        title,
        slug,
        content,
        author: author || "Shrishti Pandit",
        is_published: is_published || false,
      },
    });

    return NextResponse.json({ success: true, poem }, { status: 201 });
  } catch (error) {
    console.error("Error creating poem:", error);
    return NextResponse.json(
      { error: "Failed to create poem" },
      { status: 500 }
    );
  }
} 