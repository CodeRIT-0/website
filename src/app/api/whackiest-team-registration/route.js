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

    const { teamName, captain, member1, member2, member3 } = reqBody;
    let { teamSize } = reqBody;

    // Parse teamSize as a number
    teamSize = parseInt(teamSize, 10);
    console.log("Parsed Team Size:", teamSize, "Type:", typeof teamSize);

    // Validate teamSize
    const validTeamSizes = [3, 4];
    if (!validTeamSizes.includes(teamSize)) {
      console.error("Invalid team size");
      return NextResponse.json(
        { message: "Invalid team size", success: false },
        { status: 400 }
      );
    }

    // Validate required fields
    if (
      !teamName ||
      !teamSize ||
      !captain?.usn ||
      !member1?.usn ||
      !member2?.usn ||
      (teamSize === 4 && !member3?.usn)
    ) {
      console.error("Missing required fields");
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    // Prepare the new team document
    const newTeam = new whackiestTeam({
      teamName,
      teamSize,
      captain,
      member1,
      member2,
      ...(teamSize === 4 && { member3 }), // Include member3 only if teamSize is 4
    });

    // Save the new team
    const savedTeam = await newTeam.save();
    console.log("Team saved successfully:", savedTeam);

    return NextResponse.json({
      message: "Team registered successfully",
      success: true,
      team: {
        id: savedTeam._id,
        teamName: savedTeam.teamName,
        teamSize: savedTeam.teamSize,
      }, // Exclude sensitive data like full team details
    });
  } catch (error) {
    console.error("Error in POST handler:", error.message);

    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Team Name or USN already exists", success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}



