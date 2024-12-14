import Interview from "@/src/models/interviewModel";
import Company from "@/src/models/companyModel"; 
import { connect } from "@/src/dbconfig/dbconfig";

import { NextResponse } from "next/server";

export async function POST(request){
    try{
      
        await connect();    
      
        const reqBody=await request.json();
        const {name,year,role,company,experience} = reqBody; 

        const updatedCompany = await Company.findOne({name: company.toString()}); 
        if(!updatedCompany){
            return NextResponse.json({message:"Company not found"},{status:404})
        }

        const newInterview=await Interview.create({
            name,year,role,company,experience
        });
        
        updatedCompany.interviews.push(newInterview._id);

        await updatedCompany.save();
       
        return NextResponse.json({
            message:"Created Interview successfully", 
            success:true,
            updatedCompany
        })
    }
    catch(error){
        return NextResponse.json({message:error.message},{status:500})
      
    }
}