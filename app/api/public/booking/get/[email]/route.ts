import { connectDB } from "@/config/dbConfig";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } },
): Promise<NextResponse> {
  try {
    await connectDB();

    const { email } = await params;
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    const bookings = await Booking.find({ email })
      .populate("carId", "images slug title")
      .populate("category", "slug title");

    if (bookings.length === 0) {
      return NextResponse.json(
        { success: false, message: "No bookings found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
