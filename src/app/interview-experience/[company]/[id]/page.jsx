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
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
         
        <div className="flex items-center mb-6">
            <Link 
              href={`/interview-experience/${company}`}
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to {decodedCompany} Interviews
            </Link>
          </div>

          <Card className="transform transition-all duration-300 hover:shadow-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <CardHeader className="py-6 px-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {interview.name}&apos;s Interview Experience
                  </CardTitle>
                  <div className="flex items-center text-green-500 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <User className="w-4 h-4 mr-1.5" />
                    <span className="font-medium">{decodedCompany}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Briefcase className="w-4 h-4 mr-1.5" />
                    <span className="font-medium">{interview.role}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    <span className="font-medium">{interview.year}</span>
                  </div>
                </div>
              </div>
              <Separator className="mt-4" />
            </CardHeader>

            <CardContent className="py-6 px-8">
              <ReactMarkdown 
                className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white [&>*:first-child]:mt-0 text-left"
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-base font-semibold mt-5 mb-2 text-gray-900 dark:text-white" {...props} />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="text-base font-semibold mt-4 mb-2 text-gray-900 dark:text-white" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-3 text-base text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 mb-4 mt-2 text-base text-gray-700 dark:text-gray-300 space-y-1.5" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-5 mb-4 mt-2 text-base text-gray-700 dark:text-gray-300 space-y-1.5" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-gray-700 dark:text-gray-300" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-3 border-blue-500 pl-3 py-1 my-4 text-gray-600 dark:text-gray-400 italic" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-gray-900 dark:text-white" {...props} />
                  ),
                  em: ({ node, ...props }) => (
                    <em className="text-gray-700 dark:text-gray-300" {...props} />
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

