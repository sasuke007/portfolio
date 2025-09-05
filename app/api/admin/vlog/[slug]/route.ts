import { NextRequest, NextResponse } from "next/server";
import { getVlogByVideoUrl, updateVlog } from "@/lib/services/vlog.service";
import { CreateVlog, VlogDTO } from "@/types/vlog/index";

/**
 * GET request handler to fetch a vlog by video URL
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // The route parameter is named 'slug' but we're using it for the video URL (for compatibility reasons)
    const videoUrl = decodeURIComponent(params.slug);
    
    // Call service to get the vlog
    const vlog = await getVlogByVideoUrl(videoUrl);

    // Return 404 if vlog not found
    if (!vlog) {
      return NextResponse.json(
        { error: "Vlog not found" },
        { status: 404 }
      );
    }

    // Return success response with vlog data
    return NextResponse.json({ success: true, vlog }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching vlog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch vlog" },
      { status: 500 }
    );
  }
}

/**
 * PUT request handler to update a vlog by video URL
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // The route parameter is named 'slug' but we're using it for the video URL (for compatibility reasons)
    const videoUrl = decodeURIComponent(params.slug);
    
    // Parse request body
    const data: CreateVlog = await request.json();
    
    // Call service to update the vlog
    const updatedVlog = await updateVlog(videoUrl, data);

    // Return success response with updated vlog
    return NextResponse.json({ success: true, vlog: updatedVlog }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating vlog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update vlog" },
      { status: 500 }
    );
  }
} 