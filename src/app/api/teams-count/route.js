import { connect } from "@/src/dbconfig/dbconfig";
import CodeChaseTeam from "@/src/models/codeChaseTeamModel";
import { NextResponse } from "next/server";

/**
 * Simple public API endpoint that returns the current team count
 * Can be accessed directly in a browser at /api/teams-count
 */
export async function GET(request) {
  try {
    // Connect to the database
    await connect();
    
    // Get the current count directly from the database
    const count = await CodeChaseTeam.countDocuments();
    const maxRegistrations = 130;
    
    // Get format parameter from URL if present (default to json)
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    
    // Calculate percentage filled
    const percentageFilled = Math.round((count / maxRegistrations) * 100);
    
    // Return data in requested format
    if (format === 'text') {
      return new Response(`${count}/${maxRegistrations} teams registered (${percentageFilled}% filled)`, {
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    } else {
      // Default JSON response
      return NextResponse.json({ 
        success: true, 
        count,
        maxRegistrations,
        percentageFilled,
        remaining: maxRegistrations - count,
        registrationsOpen: count < maxRegistrations,
        timestamp: new Date().getTime()
      }, { 
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }
  } catch (error) {
    console.error('Error fetching count:', error);
    
    // Return error in requested format
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    
    if (format === 'text') {
      return new Response('Error fetching team count', {
        status: 500,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to fetch count' 
      }, { status: 500 });
    }
  }
}
