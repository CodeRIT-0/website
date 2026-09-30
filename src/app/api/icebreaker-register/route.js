import { NextResponse } from 'next/server';
import { connect } from "@/src/dbconfig/dbconfig";
import Icebreaker from "@/src/models/icebreakerModel";
import { validateForm } from "@/src/components/IcebreakerForm/validation";
import { findDepartment } from "@/src/components/IcebreakerForm/departments";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, usn, email, branch, questionForClub } = body;

    if (!name || !usn || !email || !branch) {
      return NextResponse.json(
        {
          success: false,
          message: 'All required fields must be filled'
        },
        { status: 400 }
      );
    }

    // Same rules as the form, re-checked here because the browser check can be bypassed
    const fieldErrors = validateForm({ name, usn, email, branch, questionForClub });
    if ([name, usn, email, branch].some((v) => typeof v !== 'string') || Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: Object.values(fieldErrors)[0] || 'Invalid input'
        },
        { status: 400 }
      );
    }

    // One canonical form so 1ms25cs001_t and 1MS25CS001-T count as the same USN
    const cleanUsn = usn.trim().toUpperCase().replace('_', '-');

    await connect();

    const existingUser = await Icebreaker.findOne({
      $or: [{ email: email.toLowerCase() }, { usn: cleanUsn }]
    });

    if (existingUser) {
      if (existingUser.usn === cleanUsn) {
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

    const registrationData = {
      name: name.trim(),
      usn: cleanUsn,
      email: email.trim().toLowerCase(),
      branch: findDepartment(branch).short // always stored as the official short code, e.g. CSE
    };

    if (questionForClub && questionForClub.trim()) {
      registrationData.questionForClub = questionForClub.trim();
    }

    const newRegistration = await Icebreaker.create(registrationData);

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
