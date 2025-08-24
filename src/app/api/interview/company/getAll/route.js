import { connect } from "@/src/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import Company from "@/src/models/companyModel";

export async function GET(request) {
    try {
        await connect();
        
        const { searchParams } = new URL(request.url);
        const searchQuery = searchParams.get('search') || '';
        
        // Create a case-insensitive regex for search
        const searchRegex = new RegExp(searchQuery, 'i');
        
        // Find companies that match the search query (if any)
        const allCompanies = await Company.find({
            name: { $regex: searchRegex }
        }).select('name imageUrl interviews').lean();
        
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
            message: searchQuery ? "Search results fetched successfully" : "All companies fetched successfully",
            success: true,
            allCompanies: companiesWithCounts
        })
    }
    catch(error){
        return NextResponse.json({message:error.message},{status:500})
      

    }
}