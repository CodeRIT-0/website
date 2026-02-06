"use client";
import { CompanyCard } from "@/src/components/company-card"
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from '@/src/components/LoadingSpinner';
import { Search, X, ArrowUpDown } from 'lucide-react';

export default function InterviewExperiencePage() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [sortOrder, setSortOrder] = useState('A-Z'); // 'A-Z' or 'Z-A'

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/interview/company/getAll');
      const data = await response.json();

      if (data.success) {
        setCompanies(data.allCompanies);
        setFilteredCompanies(data.allCompanies);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Filter companies based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = companies.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCompanies(filtered);
      setIsSearching(true);
    } else {
      setFilteredCompanies(companies);
      setIsSearching(false);
    }
  }, [searchQuery, companies]);

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredCompanies(companies);
    setIsSearching(false);
  };

  // Sort companies based on sort order
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortOrder === 'A-Z') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mt-24 sm:mt-28 md:mt-32 lg:mt-20 mx-auto px-4 py-8 sm:py-12 md:py-16"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-12 md:mb-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-5 md:mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Interview Experiences
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 text-center mb-6 sm:mb-7 md:mb-8 font-medium max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
          Learn from the interview experiences of successful candidates at top tech companies
        </p>

        {/* Search Bar and Sort Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto px-4 flex flex-col items-center"
        >
          <div className="w-full flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500 transition-all duration-300"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full sm:w-auto pl-10 pr-8 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all duration-300 cursor-pointer appearance-none"
              >
                <option value="A-Z">Sort: A-Z</option>
                <option value="Z-A">Sort: Z-A</option>
              </select>
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {isSearching && (
            <button
              type="button"
              onClick={clearSearch}
              className="mt-3 px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg hover:opacity-90 transition-opacity"
            >
              Clear Search
            </button>
          )}
        </motion.div>

        <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-8"></div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-full sm:max-w-xl md:max-w-4xl lg:max-w-7xl mx-auto px-2 sm:px-4">
        {sortedCompanies.length > 0 ? (
          sortedCompanies.map((company, index) => (
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
                interviewCount={company.interviewCount || 0}
                logo={company.imageUrl}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-gray-400 text-lg mb-4">
              {isSearching
                ? "No companies found matching your search."
                : "No companies found"}
            </p>
            {isSearching && (
              <button
                onClick={clearSearch}
                className="px-4 py-2 text-blue-400 hover:text-white transition-colors text-sm"
              >
                Clear search and show all companies
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}