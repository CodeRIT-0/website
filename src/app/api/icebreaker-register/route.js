import { connect } from "@/src/dbconfig/dbconfig";
import Icebreaker from "@/src/models/icebreakerModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, usn, questionForClub } = body;

    if (!name || !usn) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and USN are required",
        },
        { status: 400 }
      );
    }

    await connect();

    const existingUser = await Icebreaker.findOne({
      usn: usn.toUpperCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "This USN is already registered",
        },
        { status: 409 }
      );
    }

    const newRegistration = await Icebreaker.create({
      name: name.trim(),
      usn: usn.trim().toUpperCase(),
      questionForClub: questionForClub ? questionForClub.trim() : "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful!",
        data: {
          id: newRegistration._id,
          name: newRegistration.name,
          usn: newRegistration.usn,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "This USN is already registered",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Registration failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
