"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/newCard";
import { Separator } from "@/src/components/seperator";
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Briefcase, User, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import LoadingSpinner from '@/src/components/LoadingSpinner';

export default function InterviewExperiencePage({ params }) {
  const { company, id } = params;
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const decodedCompany = decodeURIComponent(company);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await fetch(`/api/interview/getInterview?id=${id}`);
        const data = await response.json();
        if (data.success) {
          setInterview(data.interview);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Error fetching interview:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!interview) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 mt-16 sm:mt-20 md:mt-24">
        <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
         
        <div className="flex items-center mb-4 sm:mb-6">
            <Link 
              href={`/interview-experience/${company}`}
              className="inline-flex items-center text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to {decodedCompany} Interviews
            </Link>
          </div>

          <Card className="transform transition-all duration-300 hover:shadow-2xl bg-gray-800 border border-gray-700">
            <CardHeader className="py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {interview.name}&apos;s Interview Experience
                  </CardTitle>
                  <div className="flex items-center text-green-400">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm font-medium">Verified</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center text-gray-400">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="font-medium">{decodedCompany}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="font-medium">{interview.role}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="font-medium">{interview.year}</span>
                  </div>
                </div>
              </div>
              <Separator className="mt-3 sm:mt-4" />
            </CardHeader>

            <CardContent className="py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-8">
              <ReactMarkdown 
                className="prose prose-sm max-w-none prose-invert prose-headings:text-white [&>*:first-child]:mt-0 text-left"
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-white" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-sm sm:text-base md:text-lg font-semibold mt-4 sm:mt-5 mb-2 sm:mb-3 text-white" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2 text-white" {...props} />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="text-xs sm:text-sm md:text-base font-semibold mt-2 sm:mt-3 mb-1 sm:mb-2 text-white" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-2 sm:mb-3 text-xs sm:text-base text-gray-300 leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-4 sm:pl-5 mb-3 sm:mb-4 mt-1 sm:mt-2 text-xs sm:text-base text-gray-300 space-y-1" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-4 sm:pl-5 mb-3 sm:mb-4 mt-1 sm:mt-2 text-xs sm:text-base text-gray-300 space-y-1" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-gray-300" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-3 border-blue-500 pl-2 sm:pl-3 py-1 my-2 sm:my-4 text-gray-400 italic text-xs sm:text-base" {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-gray-700 text-green-300 px-1 py-0.5 rounded text-xs sm:text-sm" {...props} />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre className="bg-gray-800 text-green-300 p-3 rounded-md overflow-x-auto text-sm sm:text-base" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-white" {...props} />
                  ),
                  em: ({ node, ...props }) => (
                    <em className="text-gray-300" {...props} />
                  ),
                }}
              >
                {interview.experience}
              </ReactMarkdown>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}