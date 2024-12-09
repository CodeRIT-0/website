"use client";
import { CompanyCard } from "@/src/components/company-card"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from '@/src/components/LoadingSpinner';

export default function InterviewExperiencePage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/interview/company/getAll');
        const data = await response.json();
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
    return <LoadingSpinner />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mt-20 mx-auto px-4 py-16"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Interview Experiences
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-8 font-medium max-w-3xl mx-auto">
          Learn from the interview experiences of successful candidates at top tech companies
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
        {companies.length > 0 ? (
          companies.map((company, index) => (
            <motion.div
              key={company._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <CompanyCard
                name={company.name}
                slug={company.name}
                interviewCount={company.interviews?.length || 0}
                logo={company.imageUrl}
              />
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500 dark:text-gray-400">
            No companies found
          </p>
        )}
      </div>
    </motion.div>
  );
}
