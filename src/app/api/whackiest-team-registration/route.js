import whackiestTeam from "@/src/models/whackiestTeamModel";
import { connect } from "@/src/dbconfig/dbconfig";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connect();

    // Fetch all teams
    const whackiestTeams = await whackiestTeam.find();

    return NextResponse.json({
      message: "Teams fetched successfully",
      success: true,
      whackiestTeams,
    });
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    console.log("Received a POST request");
    await connect();

    const reqBody = await request.json();
    console.log("Request Body:", reqBody);

    const { teamName, teamSize, captain, member1, member2, member3 } = reqBody;

    if (!teamName || !teamSize || !captain || !member1 || !member2 || (teamSize === 4 && !member3)) {
      console.error("Missing required fields");
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }


    const newTeam = new whackiestTeam({
      teamName,
      teamSize,
      captain,
      member1,
      member2,
      member3: teamSize === 4 ? member3 : undefined, // Explicitly set undefined if teamSize is 3
    });


    const savedTeam = await newTeam.save();
    console.log("Team saved successfully:", savedTeam);

    return NextResponse.json({
      message: "Team registered successfully",
      success: true,
      savedTeam,
    });
  } catch (error) {
    console.error("Error in POST handler:", error.message);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}

