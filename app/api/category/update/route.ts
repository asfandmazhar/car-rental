import { connectDB } from "@/config/dbConfig";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import Category from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
export const dynamic = "force-dynamic";

interface TokenUser {
  _id: string;
  isAdmin?: boolean;
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const user = getUserFromToken(request) as TokenUser | null;
    if (!user)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    if (!user.isAdmin)
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 },
      );

    const body = await request.json();
    const { id, title, imgURL, start, end, price, pricePerKM } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Category ID is required" },
        { status: 400 },
      );
    }

    const updateData: any = {};

    // Only update provided fields
    if (title?.trim()) {
      if (title.trim().length < 3) {
        return NextResponse.json(
          { success: false, message: "Title must be at least 3 characters" },
          { status: 400 },
        );
      }
      updateData.title = title.trim();
      updateData.slug = slugify(title.trim(), { lower: true, strict: true });
    }

    if (imgURL?.trim()) {
      try {
        new URL(imgURL.trim());
      } catch {
        return NextResponse.json(
          { success: false, message: "Invalid image URL" },
          { status: 400 },
        );
      }
      updateData.imgURL = imgURL.trim();
    }

    if (start !== undefined) {
      if (typeof start !== "number" || start < 0) {
        return NextResponse.json(
          { success: false, message: "Start must be a positive number" },
          { status: 400 },
        );
      }
      updateData.start = start;
    }

    if (end !== undefined) {
      if (typeof end !== "number" || end < 0) {
        return NextResponse.json(
          { success: false, message: "End must be a positive number" },
          { status: 400 },
        );
      }
      updateData.end = end;
    }

    if (price !== undefined) {
      if (typeof price !== "number" || price < 0) {
        return NextResponse.json(
          { success: false, message: "Price must be a positive number" },
          { status: 400 },
        );
      }
      updateData.price = price;
    }

    if (pricePerKM !== undefined) {
      if (typeof pricePerKM !== "number" || pricePerKM < 0) {
        return NextResponse.json(
          { success: false, message: "Price per KM must be a positive number" },
          { status: 400 },
        );
      }
      updateData.pricePerKM = pricePerKM;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid fields to update" },
        { status: 400 },
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCategory) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("PUT category error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
