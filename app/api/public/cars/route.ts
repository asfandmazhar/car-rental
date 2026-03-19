import { connectDB } from "@/config/dbConfig";
import Car from "@/models/carModel";
import Category from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
    const limit = Math.min(parseInt(searchParams.get("limit") || "5"), 20);

    const search = searchParams.get("search") || "";
    const categorySlug = searchParams.get("category");
    const available = searchParams.get("available");

    const skip = (page - 1) * limit;

    const filter: any = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // CATEGORY FILTER
    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });

      if (category) {
        filter.category = category._id;
      }
    }

    // AVAILABILITY FILTER
    if (available) {
      filter.isAvailable = available === "true";
    }

    const [cars, totalCars] = await Promise.all([
      Car.find(filter)
        .populate("category", "title start end price pricePerKM")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Car.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCars / limit);

    return NextResponse.json({
      success: true,
      data: cars,
      pagination: {
        totalCars,
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
