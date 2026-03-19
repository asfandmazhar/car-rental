import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";

connectDB();

interface PublicUser {
  fullName: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

// Extend JwtPayload with your user id
interface TokenPayload extends JwtPayload {
  id: string;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }

  try {
    // Verify JWT and typecast
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as TokenPayload;

    const user = await User.findById(decoded.id).select(
      "-password -__v -_id"
    );

    if (!user) {
      return NextResponse.json({ isLoggedIn: false });
    }

    // Cast Mongoose document to PublicUser type
    const publicUser: PublicUser = {
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    return NextResponse.json({ isLoggedIn: true, user: publicUser });
  } catch (err: any) {
    return NextResponse.json({
      isLoggedIn: false,
      message: err.message || "Invalid token",
    });
  }
}
