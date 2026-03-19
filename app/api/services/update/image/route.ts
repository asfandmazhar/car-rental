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

    const { id, imgURL } = await request.json();

    if (!id || !imgURL?.trim()) {
      return NextResponse.json(
        { success: false, message: "Service ID and image URL required" },
        { status: 400 },
      );
    }

    const updatedService = await Services.findByIdAndUpdate(
      id,
      { imgURL: imgURL.trim() },
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
      message: "Image updated successfully",
      data: updatedService,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
