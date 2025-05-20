import { connect } from "@/src/dbconfig/dbconfig";
import CodeChaseTeam from "@/src/models/codeChaseTeamModel";
import { NextResponse } from "next/server";

// Simple API endpoint that just returns the current count
// No Socket.IO, no caching, just a direct database query
export async function GET() {
  try {
    // Connect to the database
    await connect();
    
    // Get the current count directly from the database
    const count = await CodeChaseTeam.countDocuments();
    const maxRegistrations = 130;
    
    // Return the count with strong cache control headers
    return NextResponse.json({ 
      success: true, 
      count,
      maxRegistrations,
      registrationsOpen: count < maxRegistrations,
      timestamp: new Date().getTime()
    }, { 
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching count:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch count' 
    }, { status: 500 });
  }
}
