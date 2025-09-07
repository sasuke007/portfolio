import { NextRequest, NextResponse } from "next/server";
import { getPhotoByImageUrl, updatePhoto } from "@/lib/services/photo.service";
import { CreatePhoto, PhotoEntity } from "@/types/photo/index";

/**
 * GET request handler to fetch a photo by image URL
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // The route parameter is named 'slug' but we're using it for the image URL (for compatibility reasons)
    const imageUrl = decodeURIComponent(params.slug);
    
    // Call service to get the photo
    const photo = await getPhotoByImageUrl(imageUrl);

    // Return 404 if photo not found
    if (!photo) {
      return NextResponse.json(
        { error: "Photo not found" },
        { status: 404 }
      );
    }

    // Return success response with photo data
    return NextResponse.json({ success: true, photo }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching photo:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch photo" },
      { status: 500 }
    );
  }
}

/**
 * PUT request handler to update a photo by image URL
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // The route parameter is named 'slug' but we're using it for the image URL (for compatibility reasons)
    const imageUrl = decodeURIComponent(params.slug);
    
    // Parse request body
    const data: CreatePhoto = await request.json();
    
    // Call service to update the photo
    const updatedPhoto = await updatePhoto(imageUrl, data);

    // Return success response with updated photo
    return NextResponse.json({ success: true, photo: updatedPhoto }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating photo:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update photo" },
      { status: 500 }
    );
  }
} 