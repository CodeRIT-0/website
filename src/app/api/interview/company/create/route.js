import Company from "@/src/models/companyModel";

import { connect } from "@/src/dbconfig/dbconfig";

import { NextResponse } from "next/server";

export async function POST(request){
    try{
      
        await connect();
      
        const reqBody=await request.json();
        const {name,imageUrl}=reqBody;

        const newCompany=await Company.create({
            name:name,
            imageUrl:imageUrl
        });

        

        return NextResponse.json({
            message:"Created Company successfully",
            success:true,
            newCompany
        })
    }
    catch(error){
        return NextResponse.json({message:error.message},{status:500})
      

    }
}