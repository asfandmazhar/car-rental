import { connectDB } from "@/config/dbConfig";
import Booking from "@/models/bookingModel";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { bookingId } = await request.json();

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { paymentStatus: "paid", status: "confirmed" },
      { new: true },
    );

    if (!updatedBooking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, message: "Booking confirmed" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
