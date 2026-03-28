import { connectDB } from "@/config/dbConfig";
import Services from "@/models/servicesModel";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    // Fetch services, sorted by newest first
    const services = await Services.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, services }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
