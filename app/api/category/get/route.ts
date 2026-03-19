import { connectDB } from "@/config/dbConfig";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import Category from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";

interface TokenUser {
  _id: string;
  isAdmin?: boolean;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
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

    const { searchParams } = new URL(request.url);

    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
    const limit = Math.min(parseInt(searchParams.get("limit") || "5"), 20);
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const filter = search ? { title: { $regex: search, $options: "i" } } : {};

    const categories = await Category.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalCategory = await Category.countDocuments(filter);

    const totalPages = Math.ceil(totalCategory / limit);

    return NextResponse.json({
      success: true,
      data: categories,
      pagination: {
        totalCategory,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
