import { NextResponse } from 'next/server';
import { connect } from '@/src/dbconfig/dbconfig';
import CodeChaseTeam from '@/src/models/codeChaseTeamModel';
import { getSocketIO, setRegistrationCount } from '@/src/lib/socket-server';


export async function GET(req) {
  try {
    // Set cache control headers to prevent caching
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    // Connect to the database
    await connect();
    
    // Force a fresh query with no caching
    const count = await CodeChaseTeam.countDocuments().exec();
    const maxRegistrations = 130;
    
    // Update the in-memory count and emit to all clients
    setRegistrationCount(count);
    
    // Return the latest data with no-cache headers
    return NextResponse.json({ 
      success: true, 
      count,
      maxRegistrations,
      registrationsOpen: count < maxRegistrations,
      timestamp: new Date().getTime() // Add timestamp for debugging
    }, { headers });
  } catch (error) {
    console.error('Error fetching registration count:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch registration count' 
    }, { status: 500 });
  }
}


export const emitRegistrationCount = async () => {
  try {
    const count = await CodeChaseTeam.countDocuments();
    setRegistrationCount(count);
    return count;
  } catch (error) {
    console.error('Error emitting registration count:', error);
    return null;
  }
};
