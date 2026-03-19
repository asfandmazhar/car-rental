import { connectDB } from "@/config/dbConfig";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET(request) {
  try {
    const userData = getUserFromToken(request);

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

    const totalUsers = await User.countDocuments({});
    const totalAdmin = await User.countDocuments({ isAdmin: true });
    const totalUser = await User.countDocuments({ isAdmin: false });
    const countUser = { totalUsers, totalAdmin, totalUser };

    return NextResponse.json({
      success: true,
      countUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
