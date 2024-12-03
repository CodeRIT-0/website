"use client";
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/Card"
import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react';

export default function CompanyInterviewsPage({ params }) {
  const { company } = params;
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  
  const decodedCompany = decodeURIComponent(company);

  useEffect(() => {
    const fetchCompanyInterviews = async () => {
      try {
        console.log("Fetching for company:", decodedCompany); // Debug log
        const response = await fetch(`/api/interview/company/getCompany?name=${decodedCompany}`);
        const data = await response.json();
        console.log("API Response:", data); // Debug log
        
        if (data.success) {
          setCompanyData(data.company);
          setInterviews(data.company.interviews || []);
        }
      } catch (error) {
        console.error('Error fetching interviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInterviews();
  }, [decodedCompany]);

  if (loading) {
    return <div className="container mt-20 mx-auto px-4 py-12">Loading...</div>;
  }

  return (
    <div className="container mt-20 mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {companyData?.name || decodedCompany} Interview Experiences
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {interviews.length > 0 ? (
          interviews.map((interview) => (
            <Link key={interview._id} href={`/interview-experience/${encodeURIComponent(decodedCompany)}/${interview._id}`}>
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden h-full">
                <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-700">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {interview.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">{interview.role}</p>
                  <p className="text-base text-gray-600 dark:text-gray-400 font-medium mb-6">Year: {interview.year}</p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold group">
                    <span className="mr-2 group-hover:mr-3 transition-all duration-300">Read Experience</span>
                    <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 dark:text-gray-400">
            No interviews available for this company yet.
          </div>
        )}
      </div>
    </div>
  );
}
