"use client";
import { CompanyCard } from "@/src/components/company-card"
import { useEffect, useState } from "react";

export default function InterviewExperiencePage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/interview/company/getAll');
        const data = await response.json();
        console.log("Fetched data:", data); // Add this for debugging
        if (data.success) {
          setCompanies(data.allCompanies);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div className="container mt-20 mx-auto px-4 py-16">Loading...</div>;
  }

  return (
    <div className="container mt-20 mx-auto px-4 py-16">
      <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Interview Experiences
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-16 font-medium max-w-3xl mx-auto">
        Learn from the interview experiences of successful candidates at top tech companies
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard
              key={company._id}
              name={company.name}
              slug={company.name}
              interviewCount={company.interviews?.length || 0}
              logo={company.imageUrl}
            />
          ))
        ) : (
          <p>No companies found</p>
        )}
      </div>
    </div>
  );
}
