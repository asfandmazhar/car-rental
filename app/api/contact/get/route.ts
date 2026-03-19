import { connectDB } from "@/config/dbConfig";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import Contact from "@/models/contactModel";
import { NextRequest, NextResponse } from "next/server";

interface TokenUser {
  _id: string;
  isAdmin?: boolean;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const userData = getUserFromToken(request) as TokenUser | null;

    // Not logged in
    if (!userData) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // Not admin
    if (!userData.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(request.url);

    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
    const limit = Math.min(parseInt(searchParams.get("limit") || "5"), 20);

    const skip = (page - 1) * limit;

    // Get contacts
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Total count
    const totalContacts = await Contact.countDocuments();

    const totalPages = Math.ceil(totalContacts / limit);

    return NextResponse.json({
      success: true,
      contacts,
      pagination: {
        totalContacts,
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
