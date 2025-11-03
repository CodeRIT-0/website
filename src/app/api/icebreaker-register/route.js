import { NextResponse } from 'next/server';
import { connect } from "@/src/dbconfig/dbconfig";
import Icebreaker from "@/src/models/icebreakerModel";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, usn, email, branch, year, programmingInterests, expectations, howDidYouHear, questionForClub } = body;

    if (!name || !usn || !email || !branch || !year || !programmingInterests || !expectations || !howDidYouHear || !questionForClub) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'All required fields must be filled' 
        },
        { status: 400 }
      );
    }

    await connect();

    const existingUser = await Icebreaker.findOne({
      $or: [{ email: email.toLowerCase() }, { usn: usn.toUpperCase() }]
    });

    if (existingUser) {
      if (existingUser.usn === usn.toUpperCase()) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'This USN is already registered. Multiple submissions with the same USN are not allowed.' 
          },
          { status: 409 }
        );
      }
      if (existingUser.email === email.toLowerCase()) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'This email is already registered.' 
          },
          { status: 409 }
        );
      }
    }

    const newRegistration = await Icebreaker.create({
      name: name.trim(),
      usn: usn.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      branch: branch.trim(),
      year: year,
      programmingInterests: programmingInterests.trim(),
      expectations: expectations.trim(),
      howDidYouHear: howDidYouHear.trim(),
      questionForClub: questionForClub.trim()
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Get ready for the game!',
        data: {
          id: newRegistration._id,
          name: newRegistration.name,
          usn: newRegistration.usn
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { 
          success: false, 
          message: errors.join(', ') 
        },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { 
          success: false, 
          message: `This ${field} is already registered` 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again.' 
      },
      { status: 500 }
    );
  }
}
