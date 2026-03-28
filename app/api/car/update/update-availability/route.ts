import { connectDB } from "@/config/dbConfig";
import Car from "@/models/carModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken";
export const dynamic = "force-dynamic";

interface TokenUser {
  _id: string;
  isAdmin?: boolean;
}

interface UpdateAvailableBody {
  _id: string;
  isAvailable: boolean;
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

    const body: UpdateAvailableBody = await request.json();
    const { _id, isAvailable } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, message: "Car ID is missing" },
        { status: 400 },
      );
    }

    const updatedCar = await Car.findByIdAndUpdate(
      _id,
      { isAvailable },
      { new: true },
    );

    if (!updatedCar) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Availability changed successfully",
      car: updatedCar,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
