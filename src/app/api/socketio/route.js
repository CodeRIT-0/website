import { NextResponse } from 'next/server';
import { connect } from '@/src/dbconfig/dbconfig';
import CodeChaseTeam from '@/src/models/codeChaseTeamModel';
import { getSocketIO, setRegistrationCount } from '@/src/lib/socket-server';


export async function GET(req) {
  try {

    await connect();
    
  
    const count = await CodeChaseTeam.countDocuments();
    const maxRegistrations = 130;
    
    
    setRegistrationCount(count);
    
    
    return NextResponse.json({ 
      success: true, 
      count,
      maxRegistrations,
      registrationsOpen: count < maxRegistrations
    });
  } catch (error) {
    console.error('Socket.IO API Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'An error occurred' 
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
