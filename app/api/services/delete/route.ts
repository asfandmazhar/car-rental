import { connectDB } from "@/config/dbConfig";
import Services from "@/models/servicesModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken";
export const dynamic = "force-dynamic";

interface TokenUser {
  _id: string;
  id?: string;
  isAdmin?: boolean;
}

interface DeleteUserBody {
  _id: string;
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const userData = getUserFromToken(request) as TokenUser | null;

    if (!userData) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    if (!userData.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body: DeleteUserBody = await request.json();
    const { _id } = body;

    const deletedService = await Services.findByIdAndDelete(_id);

    if (!deletedService) {
      return NextResponse.json(
        { success: false, message: "Services not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: `Service Deleted from database!`,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
