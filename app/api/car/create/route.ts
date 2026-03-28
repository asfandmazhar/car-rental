import { connectDB } from "@/config/dbConfig";
import Car from "@/models/carModel";
import { NextResponse } from "next/server";
import slugify from "slugify";
export const dynamic = "force-dynamic";

interface RegisterRequestBody {
  images: string[];
  title: string;
  location: string;
  year: number;
  seats: number;
  doors: number;
  suitcaseCapacity: number;
  category: string;
  transmission: string;
  fuelType: string;
  description: string;
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body: RegisterRequestBody = await request.json();

    const {
      images,
      title,
      location,
      year,
      seats,
      doors,
      suitcaseCapacity,
      category,
      transmission,
      fuelType,
      description,
    } = body;

    const cleanTitle = title?.trim();
    const cleanLocation = location?.trim();
    const cleanDescription = description?.trim();

    // Basic validation
    if (
      !Array.isArray(images) ||
      images.length === 0 ||
      !cleanTitle ||
      !cleanLocation ||
      !year ||
      !seats ||
      !doors ||
      !category ||
      !transmission ||
      !fuelType ||
      !cleanDescription
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 },
      );
    }

    if (cleanTitle.length < 3) {
      return NextResponse.json(
        { success: false, message: "Title must be at least 3 characters." },
        { status: 400 },
      );
    }

    if (seats < 1 || doors < 1 || suitcaseCapacity < 0) {
      return NextResponse.json(
        { success: false, message: "Invalid numeric values." },
        { status: 400 },
      );
    }

    // Generate slug
    let slug = slugify(cleanTitle, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Ensure unique slug
    const slugRegex = new RegExp(`^${slug}(-\\d+)?$`, "i");
    const existingSlugs = await Car.find({ slug: slugRegex });

    if (existingSlugs.length > 0) {
      slug = `${slug}-${existingSlugs.length + 1}`;
    }

    const newCar = new Car({
      images,
      title: cleanTitle,
      slug,
      location: cleanLocation,
      year,
      seats,
      doors,
      suitcaseCapacity,
      category,
      transmission: transmission.toLowerCase(),
      fuelType: fuelType.toLowerCase(),
      description: cleanDescription,
    });

    await newCar.save();

    return NextResponse.json(
      {
        success: true,
        message: "Car created successfully",
        data: newCar,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create Car Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
