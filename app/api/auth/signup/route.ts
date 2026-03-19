import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect to MongoDB
connectDB();

interface RegisterRequestBody {
  fullName: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body: RegisterRequestBody = await request.json();
    const { fullName, email, password } = body;

    // Basic validation
    if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (fullName.trim().length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name must be at least 3 characters long.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long.",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists." },
        { status: 409 }
      );
    }

    // Generate username from email
    const username = email.split("@")[0];

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName: fullName.trim(),
      email: email.toLowerCase(),
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // Create JWT payload
    const tokenPayload = {
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    };

    // Sign JWT
    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Account Created Successful.",
    });

    // Set secure HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
