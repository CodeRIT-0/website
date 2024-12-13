import Company from "@/src/models/companyModel";
import Interview from "@/src/models/interviewModel";

import { connect } from "@/src/dbconfig/dbconfig";

import { NextResponse } from "next/server";

export async function GET(request){
    try{
        await connect();
        
        
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');

        if (!name) {
            return NextResponse.json({
                message: "Company name is required",
                success: false
            }, { status: 400 });
        }
      
        const company = await Company.findOne({
            name: name.toString()
        }).populate({
            path: "interviews",
            model: Interview
        });

        if (!company) {
            return NextResponse.json({
                message: "Company not found",
                success: false
            }, { status: 404 });
        }

        // console.log("Found company with interviews:", company);

        return NextResponse.json({
            message: "Fetched Company successfully", 
            success: true,
            company
        });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message: error.message}, {status: 500});
    }
}