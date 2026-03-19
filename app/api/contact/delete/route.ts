import { connectDB } from "@/config/dbConfig";
import Contact from "@/models/contactModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken";

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

    const body: DeleteUserBody = await request.json();
    const { _id } = body;

    // Validate id
    if (!_id) {
      return NextResponse.json(
        { success: false, message: "Contact ID is required" },
        { status: 400 },
      );
    }

    const deletedContact = await Contact.findByIdAndDelete(_id);

    if (!deletedContact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
      deletedContact,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
