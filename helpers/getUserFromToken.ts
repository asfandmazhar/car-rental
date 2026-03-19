import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface TokenPayload {
  _id: string;
  email?: string;
  isAdmin?: boolean;
}

export function getUserFromToken(request: NextRequest): TokenPayload | null {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as TokenPayload;

    return decoded;
  } catch (error) {
    return null;
  }
}
