import whackiestTeam from "@/src/models/whackiestTeamModel";
import { connect } from "@/src/dbconfig/dbconfig";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
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

    // Declare valid team sizes
    const validTeamSizes = [3, 4]; // Ensure this is declared here

    teamSize = parseInt(teamSize, 10);
    console.log("Parsed Team Size:", teamSize, "Type:", typeof teamSize);

    // Validate team size
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
      !captain?.phoneNumber ||
      !captain?.email ||
      !member1?.usn ||
      !member2?.usn ||
      (teamSize === 4 && !member3?.usn)
    ) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    // Mark captain with __isCaptain flag
    captain.__isCaptain = true;

    if (!captain?.phoneNumber || !captain?.email) {
      console.error("Captain phone number or email is missing or invalid");
      return NextResponse.json(
        { message: "Captain's phone number and email are required", success: false },
        { status: 400 }
      );
    }

    // Additional captain validation (if needed)
    if (!/^[6-9]\d{9}$/.test(captain.phoneNumber)) {
      return NextResponse.json(
        { message: "Invalid phone number format for captain", success: false },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(captain.email)) {
      return NextResponse.json(
        { message: "Invalid email format for captain", success: false },
        { status: 400 }
      );
    }


    // Save the team
    const newTeam = new whackiestTeam({
      teamName,
      teamSize,
      captain,
      member1,
      member2,
      ...(teamSize === 4 && { member3 }),
    });

    const savedTeam = await newTeam.save();

    console.log("Team saved successfully:", savedTeam);

    return NextResponse.json({
      message: "Team registered successfully",
      success: true,
      team: {
        id: savedTeam._id,
        teamName: savedTeam.teamName,
        teamSize: savedTeam.teamSize,
      },
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

