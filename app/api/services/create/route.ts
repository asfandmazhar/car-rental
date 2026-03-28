import { connectDB } from "@/config/dbConfig";
import Services from "@/models/servicesModel";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

interface RegisterRequestBody {
  imgURL: string;
  title: string;
  description: string;
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body: RegisterRequestBody = await request.json();
    const { imgURL, title, description } = body;

    // Trim values
    const cleanTitle = title?.trim();
    const cleanDescription = description?.trim();
    const cleanImgURL = imgURL?.trim();

    // Validate fields
    if (!cleanTitle || !cleanDescription || !cleanImgURL) {
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

    if (cleanDescription.length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Description must be at least 10 characters.",
        },
        { status: 400 },
      );
    }

    // URL validation
    try {
      new URL(cleanImgURL);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid image URL." },
        { status: 400 },
      );
    }

    const newService = new Services({
      imgURL: cleanImgURL,
      title: cleanTitle,
      description: cleanDescription,
    });

    await newService.save();

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        data: newService,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Service creation error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
