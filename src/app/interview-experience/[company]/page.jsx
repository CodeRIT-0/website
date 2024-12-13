"use client";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/card";
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/src/components/LoadingSpinner';

export default function CompanyInterviewsPage({ params }) {
  const { company } = params;
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  
  const decodedCompany = decodeURIComponent(company);

  useEffect(() => {
    const fetchCompanyInterviews = async () => {
      try {
        const response = await fetch(`/api/interview/company/getCompany?name=${decodedCompany}`);
        const data = await response.json();
        
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
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 mt-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Flex container for header */}
          <div className="flex items-center mb-6">
            <Link 
              href={`/interview-experience`}
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {companyData?.name || decodedCompany} Interview Experiences
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Learn from the experiences of successful candidates at {companyData?.name || decodedCompany}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8 rounded-full opacity-80"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {interviews.length > 0 ? (
              interviews.map((interview, index) => (
                <motion.div
                  key={interview._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/interview-experience/${encodeURIComponent(decodedCompany)}/${interview._id}`}>
                    <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden h-full bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/50 relative backdrop-blur-sm">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>
                      
                      <CardHeader className="p-6 border-b border-gray-100/50 dark:border-gray-700/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            {interview.year}
                          </span>
                          <span className="px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                            {interview.role}
                          </span>
                        </div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                          {interview.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-sm font-medium">Verified Experience</span>
                          </div>
                          <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group/btn">
                            <span className="text-sm mr-2 group-hover/btn:mr-3 transition-all duration300">
                              Read More
                            </span>
                            <ChevronRight 
                              className="w=5 h=5 transform transition-transform duration=300 group-hover/btn:translate-x=1" 
                              strokeWidth={2.5}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py=16"
              >
                <div className="max-w-md mx-auto p=8 rounded-xl bg-white dark:bg-gray=800 shadow-lg border border-gray=100 dark:border-gray=700/50">
                  <p className="text-xl text-gray=600 dark:text-gray=400 font-medium">
                    No interviews available for this company yet.
                  </p>
                  <div className="mt=4 h=1 w=24 bg-gradient-to-r from-blue=500/20 via-purple=500/20 to-pink=500/20 rounded-full mx-auto"></div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}