import { connectDB } from "@/config/dbConfig";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken";
export const dynamic = "force-dynamic";

interface TokenUser {
  _id: string;
  isAdmin?: boolean;
}

interface UpdateBookingStatusBody {
  id: string;
  status: string;
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const userData = getUserFromToken(request) as TokenUser | null;

    if (!userData) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    if (!userData.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 },
      );
    }

    const body: UpdateBookingStatusBody = await request.json();
    const { id, status } = body;
    let _id = id;

    if (!_id || !status) {
      return NextResponse.json(
        { success: false, message: "Booking ID or status is missing" },
        { status: 400 },
      );
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      _id,
      { status },
      { new: true },
    );

    if (!updatedBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking status changed successfully",
      booking: updatedBooking,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
