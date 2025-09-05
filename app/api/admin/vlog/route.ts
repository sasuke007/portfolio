import { NextRequest, NextResponse } from "next/server";
import { createVlog } from "@/lib/services/vlog.service";
import { CreateVlog, createVlogSchema } from "@/types/vlog/index";
import { getAllVlogs } from "@/lib/services/vlog.service";

/**
 * POST handler for creating a new vlog
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body using Zod schema
    const createVlogRequest: CreateVlog = createVlogSchema.parse(
      await request.json()
    );
    
    // Call service to create the vlog
    const vlog = await createVlog(createVlogRequest);

    // Return success response with created vlog
    return NextResponse.json({ success: true, vlog }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating vlog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create vlog" },
      { status: 500 }
    );
  }
}

/**
 * GET handler for retrieving all vlogs
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch all vlogs from the database
    const vlogs = await getAllVlogs();
    
    // Return success response with vlogs array
    return NextResponse.json({ success: true, vlogs }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching vlogs:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch vlogs" },
      { status: 500 }
    );
  }
} 