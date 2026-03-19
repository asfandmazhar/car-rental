import { connectDB } from "@/config/dbConfig";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";

interface TokenUser {
  _id: string;
  isAdmin?: boolean;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    // Get user from token
    const userData = getUserFromToken(request) as TokenUser | null;

    if (!userData) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    if (!userData.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(request.url);

    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
    const limit = Math.min(parseInt(searchParams.get("limit") || "5"), 20);
    const search = (searchParams.get("search") || "").trim();

    const skip = (page - 1) * limit;

    // Build search filter
    const filter = search
      ? {
          $or: [
            { "user.name": { $regex: search, $options: "i" } },
            { "car.title": { $regex: search, $options: "i" } },
            { status: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const totalBooking = await Booking.countDocuments(filter);
    const totalPages = Math.ceil(totalBooking / limit);

    if (totalBooking > 0 && page > totalPages) {
      return NextResponse.json(
        { success: false, message: "Page number exceeds total pages" },
        { status: 400 },
      );
    }

    // Fetch bookings with populated user and car fields
    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "carId",
        select: "title slug",
      })
      .lean();

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        totalBooking,
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
