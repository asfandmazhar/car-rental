import { connectDB } from "@/config/dbConfig";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";
import slugify from "slugify";

interface RegisterRequestBody {
  imgURL: string;
  title: string;
  start: number;
  end: number;
  price: number;
  pricePerKM?: number;
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body: RegisterRequestBody = await request.json();

    const { imgURL, title, start, end, price, pricePerKM } = body;

    // Trim values
    const cleanTitle = title?.trim();
    const cleanImgURL = imgURL?.trim();

    // Validation
    if (
      !cleanTitle ||
      !cleanImgURL ||
      start == null ||
      end == null ||
      price == null
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided." },
        { status: 400 },
      );
    }

    if (cleanTitle.length < 3) {
      return NextResponse.json(
        { success: false, message: "Title must be at least 3 characters." },
        { status: 400 },
      );
    }

    if (start < 0 || end < 0 || price < 0) {
      return NextResponse.json(
        { success: false, message: "Numbers cannot be negative." },
        { status: 400 },
      );
    }

    if (end <= start) {
      return NextResponse.json(
        { success: false, message: "End must be greater than start." },
        { status: 400 },
      );
    }

    // Validate Image URL
    try {
      new URL(cleanImgURL);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid image URL." },
        { status: 400 },
      );
    }

    // Generate slug
    const slug = slugify(cleanTitle, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check duplicate slug
    const existingCategory = await Category.findOne({ slug });

    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category with this title already exists." },
        { status: 409 },
      );
    }

    const newCategory = new Category({
      imgURL: cleanImgURL,
      title: cleanTitle,
      slug,
      start,
      end,
      price,
      pricePerKM: pricePerKM || 0,
    });

    await newCategory.save();

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        data: newCategory,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
