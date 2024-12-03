"use client";
import { useEffect, useState } from 'react';
import { Separator}  from "@/src/components/seperator"
import {Card, CardContent, CardHeader, CardTitle}  from "@/src/components/newCard"
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

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
        console.log("Interview data:", data); 
        
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
    return <div className="container mx-auto px-4 py-16 mt-20">Loading...</div>;
  }

  if (!interview) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      <Card className="max-w-4xl mx-auto transform transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="space-y-6 p-8">
          <CardTitle className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {interview.name}&apos;s Interview Experience
          </CardTitle>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {decodedCompany} - {interview.role}
            </h2>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Interview Year: {interview.year}
            </p>
          </div>
        </CardHeader>
       
        <CardContent className="p-8">
          <div className="prose prose-lg max-w-none dark:prose-invert text-left">
            <ReactMarkdown className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-medium">
              {interview.experience}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
