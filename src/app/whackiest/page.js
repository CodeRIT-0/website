"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy, Users, Zap } from 'lucide-react';

export default function WhackiestEventPage() {
  const [activeSection, setActiveSection] = useState(null);

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

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
          wHACKiest 2024
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 text-center mb-6 sm:mb-7 md:mb-8 font-medium max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
          CodeRIT's Annual Intra-College Hackathon - Unleash Your Innovation!
        </p>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-full sm:max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-12">
        <motion.div
          {...sectionVariants}
          onHoverStart={() => setActiveSection('ideathon')}
          onHoverEnd={() => setActiveSection(null)}
          className={`bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden 
            transition-all duration-300 
            ${activeSection === 'ideathon' ? 'scale-105 border-purple-300' : ''}`}
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <Calendar className="mr-3 text-blue-600 w-8 h-8" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Phase 1: Ideathon</h2>
            </div>
            <div className="space-y-3 text-gray-600">
              <p><strong>Date:</strong> 18th December 2024</p>
              <p><strong>Time:</strong> 10 AM to 1 PM</p>
              <p><strong>Location:</strong> ESB Seminar Hall I</p>
              <p className="italic text-blue-600">Brainstorm and refine your hackathon ideas!</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...sectionVariants}
          onHoverStart={() => setActiveSection('hackathon')}
          onHoverEnd={() => setActiveSection(null)}
          className={`bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden 
            transition-all duration-300 
            ${activeSection === 'hackathon' ? 'scale-105 border-purple-300' : ''}`}
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <Clock className="mr-3 text-purple-600 w-8 h-8" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Phase 2: Hackathon</h2>
            </div>
            <div className="space-y-3 text-gray-600">
              <p><strong>Date:</strong> 21st - 22nd December 2024</p>
              <p><strong>Time:</strong> 7 PM to 7 PM (24 hours)</p>
              <p><strong>Mode:</strong> Online</p>
              <p><strong>Team Size:</strong> 3-4 members</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        {...sectionVariants}
        className="max-w-full sm:max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-12"
      >
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sm:p-8 text-center">
          <div className="flex justify-center items-center mb-6">
            <Trophy className="mr-3 text-yellow-500 w-8 h-8" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Exciting Prizes</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-600">Top Team Prizes</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-base sm:text-lg text-black">🥇 1st Prize: ₹10,000</li>
                <li className="text-base sm:text-lg text-black">🥈 2nd Prize: ₹7,000</li>
                <li className="text-base sm:text-lg text-black">🥉 3rd Prize: ₹5,000</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl sm:text-2xl font-semibold text-purple-600">Special Awards</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-base sm:text-lg text-black">🌟 Best Freshers' Team: ₹5,000</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...sectionVariants}
        className="text-center max-w-full sm:max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4"
      >
        <div className="flex justify-center items-center mb-6">
          <Users className="mr-3 text-blue-600 w-8 h-8" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Who Can Participate?</h2>
        </div>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-8">
          Open to all RIT students from 1st, 2nd, and 3rd years. No registration fee! 
          Beginners are welcome. This is your chance to learn, collaborate, and innovate.
        </p>
        
        {/* <motion.a 
          href="/whackiest-registration"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 
            bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
            text-white font-bold rounded-full 
            hover:shadow-lg transition-all duration-300"
        >
          <Zap className="mr-2 w-5 h-5" /> Register Here
        </motion.a> */}
      </motion.div>
    </motion.div>
  );
}