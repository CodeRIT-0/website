import Company from "@/src/models/companyModel";

import { connect } from "@/src/dbconfig/dbconfig";

import { NextResponse } from "next/server";

export async function GET(request){
    try{
      
        await connect();
      
        const allCompanies=await Company.find();
        

        return NextResponse.json({
            message:"Fetched Companies successfully",
            success:true,
            allCompanies
        })
    }
    catch(error){
        return NextResponse.json({message:error.message},{status:500})
      

    }
}