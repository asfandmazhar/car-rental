import { connectDB } from "@/config/dbConfig";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import Services from "@/models/servicesModel";
import { NextRequest, NextResponse } from "next/server";

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

    const { id, description } = await request.json();

    if (!id || !description?.trim()) {
      return NextResponse.json(
        { success: false, message: "Service ID and description required" },
        { status: 400 },
      );
    }

    if (description.trim().length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: "Description must be at least 3 characters",
        },
        { status: 400 },
      );
    }

    const updatedService = await Services.findByIdAndUpdate(
      id,
      { description: description.trim() },
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
      message: "Description updated successfully",
      data: updatedService,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
