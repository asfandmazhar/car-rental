import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken";

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

    const body: DeleteUserBody = await request.json();
    const { _id } = body;

    if (userData._id === _id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot delete yourself while logged in",
        },
        { status: 400 },
      );
    }

    const deletedUser = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: `${deletedUser.fullName} is deleted from database!`,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
