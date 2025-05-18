'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CodeChaseRegisterPage() {
  const [formData, setFormData] = useState({
    teamName: '',
    year: '',
    leaderName: '',
    leaderUsn: '',
    leaderMobile: '',
    member2Name: '',
    member2Usn: '',
    member3Name: '',
    member3Usn: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name.toLowerCase().includes('usn')) {
      processedValue = value.toUpperCase().trim();
    } else {
      processedValue = value.trimStart();
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
    setError(prevError => prevError && prevError.field === name ? null : prevError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    for (const key in formData) {
      if (!formData[key].trim()) {
        setError({ message: `Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`, field: key });
        setIsLoading(false);
        return;
      }
    }

    if (!/^[6-9]\d{9}$/.test(formData.leaderMobile)) {
      setError({ message: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.', field: 'leaderMobile' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/code-chase-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Registration failed. Please try again.');
      }

      setSuccess(`Team "${result.team.teamName}" registered successfully!`);
      setFormData({
        teamName: '',
        year: '',
        leaderName: '',
        leaderUsn: '',
        leaderMobile: '',
        member2Name: '',
        member2Usn: '',
        member3Name: '',
        member3Usn: '',
      });

    } catch (err) {
      setError({ message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorClass = (fieldName) => {
    return error && error.field === fieldName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600';
  };

  const inputBaseClass = "appearance-none rounded-lg relative block w-full px-4 py-2.5 border placeholder-gray-500 text-white bg-gray-700/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-200 ease-in-out";
  const fieldGroupClass = "rounded-lg shadow-sm space-y-5 border border-gray-700/50 p-5 bg-gradient-to-br from-gray-800/50 to-gray-900/30 backdrop-blur-sm";
  const fieldTitleClass = "text-lg font-semibold text-gray-200 border-b border-indigo-500/30 pb-2 mb-5 flex items-center gap-2";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-black text-white flex items-center mt-10 justify-center py-16 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-2xl w-full space-y-10 bg-gray-800 bg-opacity-60 backdrop-blur-lg p-8 sm:p-10 md:p-12 rounded-xl shadow-xl border border-gray-700/50"
      >
        <div className="text-center">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2"
          >
            22 Yards Of Code Registration
          </motion.h2>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-sm text-gray-400"
          >
            Assemble your team and get ready to code!
          </motion.p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit} noValidate>
          <div className={fieldGroupClass}>
            <h3 className={fieldTitleClass}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Team Information
            </h3>
            <div>
              <label htmlFor="teamName" className="sr-only">Team Name</label>
              <input id="teamName" name="teamName" type="text" required className={`${inputBaseClass} ${getErrorClass('teamName')}`} placeholder="Choose a cool Team Name" value={formData.teamName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="year" className="sr-only">Year</label>
              <input id="year" name="year" type="text" required className={`${inputBaseClass} ${getErrorClass('year')}`} placeholder="Year (e.g., 1st, 2nd, 3rd, 4th)" value={formData.year} onChange={handleChange} />
            </div>
          </div>

          <div className={fieldGroupClass}>
             <h3 className={fieldTitleClass}>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
               Team Leader
             </h3>
            <div>
              <label htmlFor="leaderName" className="sr-only">Leader Name</label>
              <input id="leaderName" name="leaderName" type="text" required className={`${inputBaseClass} ${getErrorClass('leaderName')}`} placeholder="Leader's Full Name" value={formData.leaderName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="leaderUsn" className="sr-only">Leader USN</label>
              <input id="leaderUsn" name="leaderUsn" type="text" required className={`${inputBaseClass} ${getErrorClass('leaderUsn')} uppercase`} placeholder="Leader USN (e.g., 1MS21CS001)" value={formData.leaderUsn} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="leaderMobile" className="sr-only">Leader Mobile</label>
              <input id="leaderMobile" name="leaderMobile" type="tel" required className={`${inputBaseClass} ${getErrorClass('leaderMobile')}`} placeholder="Leader Mobile Number" value={formData.leaderMobile} onChange={handleChange} />
            </div>
          </div>

          <div className={fieldGroupClass}>
            <h3 className={fieldTitleClass}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Member 2
             </h3>
            <div>
              <label htmlFor="member2Name" className="sr-only">Member 2 Name</label>
              <input id="member2Name" name="member2Name" type="text" required className={`${inputBaseClass} ${getErrorClass('member2Name')}`} placeholder="Member 2 Full Name" value={formData.member2Name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="member2Usn" className="sr-only">Member 2 USN</label>
              <input id="member2Usn" name="member2Usn" type="text" required className={`${inputBaseClass} ${getErrorClass('member2Usn')} uppercase`} placeholder="Member 2 USN (e.g., 1MS21CS002)" value={formData.member2Usn} onChange={handleChange} />
            </div>
          </div>

          <div className={fieldGroupClass}>
            <h3 className={fieldTitleClass}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Member 3
            </h3>
            <div>
              <label htmlFor="member3Name" className="sr-only">Member 3 Name</label>
              <input id="member3Name" name="member3Name" type="text" required className={`${inputBaseClass} ${getErrorClass('member3Name')}`} placeholder="Member 3 Full Name" value={formData.member3Name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="member3Usn" className="sr-only">Member 3 USN</label>
              <input id="member3Usn" name="member3Usn" type="text" required className={`${inputBaseClass} ${getErrorClass('member3Usn')} uppercase`} placeholder="Member 3 USN (e.g., 1MS21CS003)" value={formData.member3Usn} onChange={handleChange} />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm text-center p-3 bg-red-900/40 rounded-md border border-red-500/50"
            >
              {error.message}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-300 text-sm text-center p-3 bg-green-900/40 rounded-md border border-green-500/50"
            >
              {success}
            </motion.div>
          )}

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || !!success}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${isLoading || success ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500'} transition duration-150 ease-in-out shadow-md hover:shadow-lg`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering Team...
                </>
              ) : success ? 'Registered Successfully!' : 'Register Team'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 