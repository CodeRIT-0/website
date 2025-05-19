import { NextResponse } from 'next/server';
import { connect } from '@/src/dbconfig/dbconfig';
import CodeChaseTeam from '@/src/models/codeChaseTeamModel';


export async function GET() {
  try {
    
    await connect();
    
 
    const count = await CodeChaseTeam.countDocuments();
    const maxRegistrations = 130;
    
   
    return NextResponse.json({ 
      success: true, 
      count,
      maxRegistrations,
      registrationsOpen: count < maxRegistrations
    });
  } catch (error) {
    console.error('Registration Count API Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'An error occurred' 
    }, { status: 500 });
  }
}
