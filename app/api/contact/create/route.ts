import { connectDB } from "@/config/dbConfig";
import Contact from "@/models/contactModel";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

interface RegisterRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body: RegisterRequestBody = await request.json();
    const { firstName, lastName, email, phoneNumber, message } = body;

    // Validate fields
    if (!firstName || !lastName || !email || !phoneNumber || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 },
      );
    }

    if (firstName.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: "First Name Must be at least 3 characters.",
        },
        { status: 400 },
      );
    }

    if (lastName.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: "Last Name Must be at least 3 characters.",
        },
        { status: 400 },
      );
    }

    if (message.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: "Message Must be at least 3 characters.",
        },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 },
      );
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });

    await newContact.save();

    return NextResponse.json(
      {
        success: true,
        message: "Contact created successfully",
        data: newContact,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact creation error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
