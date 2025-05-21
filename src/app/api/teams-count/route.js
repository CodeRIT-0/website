import { connect } from "@/src/dbconfig/dbconfig";
import CodeChaseTeam from "@/src/models/codeChaseTeamModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
   
    await connect();
    
   
    const count = await CodeChaseTeam.countDocuments();
    const maxRegistrations = 120; 
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const percentageFilled = Math.round((count / maxRegistrations) * 100);
    
    
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
