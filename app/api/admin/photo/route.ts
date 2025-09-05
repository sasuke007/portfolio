import { NextRequest, NextResponse } from "next/server";
import { createPhoto } from "@/lib/services/photo.service";
import { CreatePhoto, createPhotoSchema } from "@/types/photo/index";
import { getAllPhotos } from "@/lib/services/photo.service";

/**
 * POST handler for creating a new photo
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body using Zod schema
    const createPhotoRequest: CreatePhoto = createPhotoSchema.parse(
      await request.json()
    );
    
    // Call service to create the photo
    const photo = await createPhoto(createPhotoRequest);

    // Return success response with created photo
    return NextResponse.json({ success: true, photo }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating photo:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create photo" },
      { status: 500 }
    );
  }
}

/**
 * GET handler for retrieving all photos
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch all photos from the database
    const photos = await getAllPhotos();
    
    // Return success response with photos array
    return NextResponse.json({ success: true, photos }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch photos" },
      { status: 500 }
    );
  }
}