import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

connectDB();

interface LoginRequestBody {
  email: string;
  password: string;
}

interface JWTPayload {
  id: string;
  fullName: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: LoginRequestBody = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 },
      );
    }

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    // Create JWT payload
    const tokenPayload: JWTPayload = {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    // Sign JWT
    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET as string, {
      expiresIn: "7d",
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    });

    // Set secure HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
