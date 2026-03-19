import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken";

interface TokenUser {
  _id: string;
  isAdmin?: boolean;
}

interface UpdateRoleBody {
  _id: string;
  isAdmin: boolean;
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
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body: UpdateRoleBody = await request.json();
    const { _id, isAdmin } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, message: "User ID is missing" },
        { status: 400 },
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { isAdmin },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Role changed successfully",
      user: updatedUser,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
