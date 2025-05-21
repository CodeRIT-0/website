import { NextResponse } from 'next/server';
import { connect } from '@/src/dbconfig/dbconfig';
import CodeChaseTeam from '@/src/models/codeChaseTeamModel';
import { getSocketIO, setRegistrationCount } from '@/src/lib/socket-server';


export async function GET(req) {
  try {
 
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store',
      'X-Accel-Expires': '0',
      'Vary': '*'
    };

   
    await connect();
    
   
    const count = await CodeChaseTeam.countDocuments().exec();
    const maxRegistrations = 120;
    
    
    setRegistrationCount(count);
   
    return NextResponse.json({ 
      success: true, 
      count,
      maxRegistrations,
      registrationsOpen: count < maxRegistrations,
      timestamp: new Date().getTime() 
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
