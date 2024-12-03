import Interview from "@/src/models/interviewModel";
import { connect } from "@/src/dbconfig/dbconfig";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connect();
        
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({
                message: "Interview ID is required",
                success: false
            }, { status: 400 });
        }
      
        const interview = await Interview.findById(id);

        if (!interview) {
            return NextResponse.json({
                message: "Interview not found",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Fetched Interview successfully", 
            success: true,
            interview
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}