import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  try {
    if (type === "autocomplete") {
      const input = searchParams.get("input");
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input || "")}&key=${apiKey}`,
      );
      return NextResponse.json(res.data.predictions);
    }

    if (type === "distance") {
      const origin = searchParams.get("origin");
      const destination = searchParams.get("destination");
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin || "")}&destinations=${encodeURIComponent(destination || "")}&key=${apiKey}`,
      );
      return NextResponse.json(res.data);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Google Data" },
      { status: 500 },
    );
  }
}
