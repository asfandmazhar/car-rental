import { connectDB } from "@/config/dbConfig";
import Car from "@/models/carModel";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const totalCars = await Car.countDocuments();

    const availableCars = await Car.countDocuments({
      isAvailable: true,
    });

    const unavailableCars = await Car.countDocuments({
      isAvailable: false,
    });

    return NextResponse.json({
      success: true,
      data: {
        totalCars,
        availableCars,
        unavailableCars,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error",
      },
      { status: 500 },
    );
  }
}
