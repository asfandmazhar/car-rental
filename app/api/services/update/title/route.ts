import { connectDB } from "@/config/dbConfig";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import Services from "@/models/servicesModel";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

interface TokenUser {
  _id: string;
  isAdmin?: boolean;
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const user = getUserFromToken(request) as TokenUser | null;

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id, title } = await request.json();

    if (!id || !title?.trim()) {
      return NextResponse.json(
        { success: false, message: "Service ID and title required" },
        { status: 400 },
      );
    }

    if (title.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Title must be at least 3 characters" },
        { status: 400 },
      );
    }

    const updatedService = await Services.findByIdAndUpdate(
      id,
      { title: title.trim() },
      { new: true },
    );

    if (!updatedService) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Title updated successfully",
      data: updatedService,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
