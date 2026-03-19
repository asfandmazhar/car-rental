import { connectDB } from "@/config/dbConfig";
import Car from "@/models/carModel";
import { NextResponse } from "next/server";
import slugify from "slugify";

interface UpdateRequestBody {
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();

    const { id } = await params;

    const body: UpdateRequestBody = await request.json();

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

    // validation
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

    const car = await Car.findById(id);

    if (!car) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 404 },
      );
    }

    // update slug if title changed
    let slug = car.slug;

    if (car.title !== cleanTitle) {
      slug = slugify(cleanTitle, {
        lower: true,
        strict: true,
        trim: true,
      });

      const slugRegex = new RegExp(`^${slug}(-\\d+)?$`, "i");
      const existingSlugs = await Car.find({ slug: slugRegex });

      if (existingSlugs.length > 0) {
        slug = `${slug}-${existingSlugs.length + 1}`;
      }
    }

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true },
    );

    return NextResponse.json({
      success: true,
      message: "Car updated successfully",
      data: updatedCar,
    });
  } catch (error) {
    console.error("Update Car Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
