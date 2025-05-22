'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import RegistrationCounter, { refreshRegistrationCount } from '@/src/components/RegistrationCounter';

export default function CodeChaseRegisterPage() {
  const [registrationsOpen, setRegistrationsOpen] = useState(false);
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
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();


  useEffect(() => {
    let isMounted = true;
    
   
    const checkRegistrationStatus = async () => {
      try {
        
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/get-registration-count?t=${timestamp}`, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        const data = await response.json();
        
        
      } catch (err) {
        console.error('Error checking registration status:', err);
      }
    };

   
    checkRegistrationStatus();
    
    return () => {
      isMounted = false;
    };
  }, []);

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

  
  const isRestrictedUSN = (usn) => {

    const usnUpper = usn.toUpperCase();
    

    const usnPattern = /^1MS\d{2}[A-Z]{2}\d{3}$/;
    if (!usnPattern.test(usnUpper)) {
      return false; 
    }
    
  
    const yearPart = usnUpper.substring(3, 5);
    const yearNum = parseInt(yearPart, 10);
    
   
    return yearNum <= 22;
  };

  const handleSubmit = async (e) => {
   
    if (!registrationsOpen) {
      setError({ message: 'Registrations are now closed. Maximum limit of 130 teams has been reached.' });
      return;
    }
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
    
   
    const usnsToCheck = [formData.leaderUsn, formData.member2Usn, formData.member3Usn];
    for (let i = 0; i < usnsToCheck.length; i++) {
      const usn = usnsToCheck[i];
      const fieldName = i === 0 ? 'leaderUsn' : i === 1 ? 'member2Usn' : 'member3Usn';
      const memberName = i === 0 ? 'Team Captain' : `Player ${i + 1}`;
      
      if (isRestrictedUSN(usn)) {
        setError({ 
          message: `${memberName} appears to be a 3rd year or above student. This event is restricted to 1st and 2nd year students only.`, 
          field: fieldName 
        });
        setIsLoading(false);
        return;
      }
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
      
      
      setTimeout(() => {
       
        window.location.href = window.location.href.split('?')[0] + '?refresh=' + new Date().getTime();
      }, 2000); 

    } catch (err) {
      setError({ message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorClass = (fieldName) => {
    return error && error.field === fieldName ? 'border-red-400 ring-2 ring-red-400/30' : 'border-green-300/20';
  };

  const inputBaseClass = "w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/95 border-2 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 font-medium shadow-sm text-sm sm:text-base";
  
  const CricketBall = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full relative shadow-lg"
    >
      <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 sm:w-6 h-0.5 bg-white/80 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 sm:w-5 h-px bg-white/60 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-1 h-px bg-white/90 absolute -left-2"></div>
        <div className="w-1 h-px bg-white/90 absolute -left-1"></div>
        <div className="w-1 h-px bg-white/90 absolute left-0"></div>
        <div className="w-1 h-px bg-white/90 absolute left-1"></div>
        <div className="w-1 h-px bg-white/90 absolute left-2"></div>
      </div>
    </motion.div>
  );

  const CricketBat = () => (
    <motion.div
      whileHover={{ rotate: 10 }}
      className="w-5 h-5 sm:w-6 sm:h-6 relative"
    >
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        className="w-full h-full"
        style={{ transform: 'rotate(135deg)' }}
      >
        <rect 
          x="10" 
          y="45" 
          width="60" 
          height="12" 
          rx="6"
          fill="#F4C430"
        />
        <rect 
          x="70" 
          y="47" 
          width="25" 
          height="8" 
          rx="4"
          fill="#2E86AB"
        />
        <rect 
          x="65" 
          y="46" 
          width="10" 
          height="10" 
          rx="3"
          fill="#E6B800"
        />
      </svg>
    </motion.div>
  );

  const Wickets = () => (
    <div className="flex space-x-1">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0.8 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="w-1.5 sm:w-2 h-6 sm:h-8 bg-amber-700 rounded-t-lg"
        />
      ))}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="absolute top-0 w-6 sm:w-8 h-1 bg-amber-700 rounded-full"
      />
    </div>
  );

  const Trophy = () => (
    <motion.svg
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M5,16L3,20V21H21V20L19,16M12,1L14,5H18L15,7.5L16,11L12,9L8,11L9,7.5L6,5H10L12,1M12,3.5L11,5.5H9.5L10.5,6.5L10,8L12,7L14,8L13.5,6.5L14.5,5.5H13L12,3.5Z"/>
    </motion.svg>
  );

  const steps = [
    { title: "Team Setup", icon: <Trophy />, fields: ["teamName", "year"] },
    { title: "Captain's Info", icon: <CricketBat />, fields: ["leaderName", "leaderUsn", "leaderMobile"] },
    { title: "Player 2", icon: <CricketBall />, fields: ["member2Name", "member2Usn"] },
    { title: "Player 3", icon: <div className="relative"><Wickets /></div>, fields: ["member3Name", "member3Usn"] }
  ];

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 pt-4 sm:mt-20 from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
     
      <div className="absolute inset-0 opacity-10 hidden sm:block">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>

     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 sm:p-8 text-center relative">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4"
            >
              <CricketBall />
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                22 Yards Of Code
              </h1>
              <CricketBat />
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-green-100 text-sm sm:text-lg"
            >
              Build Your Championship Squad! 🏏
            </motion.p>
            
            {/* Progress indicator */}
            <div className="mt-4 sm:mt-6">
         
              <div className="hidden md:flex justify-center space-x-4">
                {steps.map((step, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-105 ${
                      index === currentStep 
                        ? 'bg-white text-green-600 shadow-lg' 
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                  >
                    {step.icon}
                    <span className="font-medium">{step.title}</span>
                  </motion.button>
                ))}
              </div>

             
              <div className="grid grid-cols-2 gap-2 sm:hidden">
                {steps.map((step, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className={`flex items-center justify-center space-x-1 px-2 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                      index === currentStep 
                        ? 'bg-white text-green-600 shadow-lg' 
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-white/20 text-white'
                    }`}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                  >
                    {step.icon}
                    <span className="font-medium text-xs">{step.title}</span>
                  </motion.button>
                ))}
              </div>

             
              <div className="hidden sm:flex md:hidden justify-center space-x-2">
                {steps.map((step, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-105 ${
                      index === currentStep 
                        ? 'bg-white text-green-600 shadow-lg' 
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                  >
                    {step.icon}
                    <span className="font-medium text-sm">{step.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

        
          <div className="p-4 sm:p-8">
            
            {!registrationsOpen && (
              <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl shadow-sm">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <CricketBat />
                    <CricketBall />
                    <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full">
                      <span className="text-green-800 font-bold">!</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-green-800">Stumps Down! All Spots Filled</h3>
                  <p className="text-gray-700">
                    All 140 teams have taken to the field for 22 Yards of Code! 
                    The tournament is now at full capacity.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Watch out for our next innings! Follow us on social media for updates on future events.
                  </p>
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 bg-green-600 text-white rounded-full font-medium shadow-md hover:bg-green-700 transition-all duration-300"
                      onClick={() => router.push('/')}
                    >
                      Back to Home
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className={`space-y-6 sm:space-y-8 ${!registrationsOpen ? 'opacity-50 pointer-events-none' : ''}`}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 sm:space-y-6"
              >
             
                {currentStep === 0 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="flex justify-center mb-2">
                        <Trophy />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Team Setup</h2>
                      <p className="text-gray-600 text-sm sm:text-base">Create your championship team</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Team Name 🏏
                        </label>
                        <input
                          name="teamName"
                          type="text"
                          className={`${inputBaseClass} ${getErrorClass('teamName')}`}
                          placeholder="Enter your team name (e.g., Code Crusaders)"
                          value={formData.teamName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Academic Year 📚
                        </label>
                        <input
                          name="year"
                          type="text"
                          className={`${inputBaseClass} ${getErrorClass('year')}`}
                          placeholder="Year (e.g., 1st, 2nd)"
                          value={formData.year}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

            
                {currentStep === 1 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="flex justify-center mb-2">
                        <CricketBat />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Team Captain</h2>
                      <p className="text-gray-600 text-sm sm:text-base">Captain leads from the front!</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Captain Name 👑
                        </label>
                        <input
                          name="leaderName"
                          type="text"
                          className={`${inputBaseClass} ${getErrorClass('leaderName')}`}
                          placeholder="Captain's full name"
                          value={formData.leaderName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Captain USN 🎯
                        </label>
                        <input
                          name="leaderUsn"
                          type="text"
                          className={`${inputBaseClass} ${getErrorClass('leaderUsn')} uppercase`}
                          placeholder="USN (e.g., 1MS23CS001)"
                          value={formData.leaderUsn}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Captain Mobile 📱
                        </label>
                        <input
                          name="leaderMobile"
                          type="tel"
                          className={`${inputBaseClass} ${getErrorClass('leaderMobile')}`}
                          placeholder="10-digit mobile number"
                          value={formData.leaderMobile}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

              
                {currentStep === 2 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="flex justify-center mb-2">
                        <CricketBall />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Player 2</h2>
                      <p className="text-gray-600 text-sm sm:text-base">Second player on the pitch</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Player 2 Name 🏃‍♂️
                        </label>
                        <input
                          name="member2Name"
                          type="text"
                          className={`${inputBaseClass} ${getErrorClass('member2Name')}`}
                          placeholder="Player 2 full name"
                          value={formData.member2Name}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Player 2 USN 🎯
                        </label>
                        <input
                          name="member2Usn"
                          type="text"
                          className={`${inputBaseClass} ${getErrorClass('member2Usn')} uppercase`}
                          placeholder="USN (e.g., 1MS23CS002)"
                          value={formData.member2Usn}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

           
                {currentStep === 3 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="flex justify-center mb-2">
                        <div className="relative inline-block">
                          <Wickets />
                        </div>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Player 3</h2>
                      <p className="text-gray-600 text-sm sm:text-base">Complete your squad!</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Player 3 Name 🏃‍♀️
                        </label>
                        <input
                          name="member3Name"
                          type="text"
                          className={`${inputBaseClass} ${getErrorClass('member3Name')}`}
                          placeholder="Player 3 full name"
                          value={formData.member3Name}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Player 3 USN 🎯
                        </label>
                        <input
                          name="member3Usn"
                          type="text"
                          className={`${inputBaseClass} ${getErrorClass('member3Usn')} uppercase`}
                          placeholder="USN (e.g., 1MS23CS003)"
                          value={formData.member3Usn}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-red-700 font-medium text-sm sm:text-base">{error.message}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg"
                >
                  <div className="flex items-center">
                    <Trophy />
                    <div className="ml-3">
                      <p className="text-green-700 font-medium text-sm sm:text-base">{success}</p>
                    </div>
                  </div>
                </motion.div>
              )}

             
              <div className="flex justify-between pt-4 sm:pt-6 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                    currentStep === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-600 text-white hover:bg-gray-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  Previous
                </motion.button>

                {currentStep < steps.length - 1 ? (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading || !!success}
                    className={`px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 text-sm sm:text-base ${
                      isLoading || success
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Registering...</span>
                      </>
                    ) : success ? (
                      <>
                        <Trophy />
                        <span>Registered!</span>
                      </>
                    ) : (
                      <>
                        <span>Register Team</span>
                        <CricketBat />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}