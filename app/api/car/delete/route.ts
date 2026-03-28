import { connectDB } from "@/config/dbConfig";
import Car from "@/models/carModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken";
export const dynamic = "force-dynamic";

interface TokenUser {
  _id: string;
  id?: string;
  isAdmin?: boolean;
}

interface DeleteUserBody {
  _id: string;
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const userData = getUserFromToken(request) as TokenUser | null;

    // Not logged in
    if (!userData) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // Not admin
    if (!userData.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 },
      );
    }

    const body: DeleteUserBody = await request.json();
    const { _id } = body;

    // Validate id
    if (!_id) {
      return NextResponse.json(
        { success: false, message: "Car ID is required" },
        { status: 400 },
      );
    }

    const deletedCar = await Car.findByIdAndDelete(_id);

    if (!deletedCar) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Car deleted successfully",
      deletedCar,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
