import { connect } from "@/src/dbconfig/dbconfig";
import Icebreaker from "@/src/models/icebreakerModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Returns only the total number of Icebreaker registrations (no personal data).
export async function GET() {
  try {
    await connect();
    const count = await Icebreaker.countDocuments();

    return NextResponse.json(
      { success: true, count },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Error fetching Icebreaker count:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch count" },
      { status: 500 }
    );
  }
}
