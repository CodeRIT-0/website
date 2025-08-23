import { connect } from "@/src/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import Company from "@/src/models/companyModel";

export async function GET(request){
    try{
      
        await connect();
      
        const allCompanies = await Company.find({}).select('name imageUrl interviews').lean();
        // const allCompanies = await Company.find();
        
        const Interview = mongoose.models.Interview || (await import('@/src/models/interviewModel')).default;
        const existingInterviewIds = new Set(
          (await Interview.find({}, '_id')).map(doc => doc._id.toString())
        );
        
        const companiesWithCounts = allCompanies.map(company => {
          const validInterviews = company.interviews ? 
            company.interviews.filter(id => existingInterviewIds.has(id.toString())) : [];
          
          return {
            ...company,
            interviews: validInterviews,
            interviewCount: validInterviews.length
          };
        });

        return NextResponse.json({
            message: "Fetched Companies successfully",
            success: true,
            allCompanies: companiesWithCounts
        })
    }
    catch(error){
        return NextResponse.json({message:error.message},{status:500})
      

    }
}