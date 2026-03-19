import { connectDB } from "@/config/dbConfig";
import Car from "@/models/carModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
): Promise<NextResponse> {
  try {
    await connectDB();

    const { slug } = await params; // no need for await here

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Car slug is required" },
        { status: 400 },
      );
    }

    // Use findOne for slug, not findById
    const car = await Car.findOne({ slug }).populate("category", "title");

    if (!car) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: car,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
