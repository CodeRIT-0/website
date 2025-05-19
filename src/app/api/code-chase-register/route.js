import { connect } from "@/src/dbconfig/dbconfig";
import CodeChaseTeam from "@/src/models/codeChaseTeamModel";
import { NextResponse } from "next/server";
import { emitRegistrationCount } from "../socketio/route";

export async function POST(request) {
  try {
    await connect();

   
    const teamCount = await CodeChaseTeam.countDocuments();
    if (teamCount >= 130) {
      return NextResponse.json(
        { message: "Registrations are full. We have reached the limit of 130 teams.", success: false },
        { status: 400 } 
      );
    }

    const reqBody = await request.json();
    const {
      teamName,
      year,
      leaderName,
      leaderUsn,
      leaderMobile,
      member2Name,
      member2Usn,
      member3Name,
      member3Usn,
    } = reqBody;

   
    if (!teamName || !year || !leaderName || !leaderUsn || !leaderMobile || !member2Name || !member2Usn || !member3Name || !member3Usn) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }

  
    const newTeam = new CodeChaseTeam({
      teamName,
      year,
      leaderName,
      leaderUsn: leaderUsn.toUpperCase(), 
      leaderMobile,
      member2Name,
      member2Usn: member2Usn.toUpperCase(),
      member3Name,
      member3Usn: member3Usn.toUpperCase(),
    });


    const savedTeam = await newTeam.save();
    
   
    await emitRegistrationCount();

    return NextResponse.json({
      message: "Team registered successfully for 22 Yards Of Code!",
      success: true,
      team: {
        id: savedTeam._id,
        teamName: savedTeam.teamName,
      },
    });

  } catch (error) {
    console.error("22 Yards Of Code Registration Error:", error.message);

   
    if (error.code === 11000 || error.message.includes('duplicate key') || error.message.includes('already exists') || error.message.includes('already registered')) {
       
        let duplicateField = 'Team Name or USN'; 
        if (error.message.includes('teamName')) {
            duplicateField = 'Team Name';
        } else if (error.message.includes('USN')) {
            duplicateField = 'USN';
        } else if (error.keyValue) {
            duplicateField = Object.keys(error.keyValue)[0];
        }
      return NextResponse.json(
        { message: `${duplicateField} already exists or is registered. Please use a different one.`, success: false },
        { status: 400 }
      );
    } else if (error.message.includes('Duplicate USNs found within the team')) {
        return NextResponse.json(
            { message: error.message, success: false },
            { status: 400 }
        );
    }

 
    return NextResponse.json(
      { message: error.message || "An unexpected error occurred.", success: false },
      { status: 500 }
    );
  }
} 