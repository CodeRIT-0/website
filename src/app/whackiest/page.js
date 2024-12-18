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
        className="text-center max-w-full sm:max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-12"
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

      <motion.div
        {...sectionVariants}
        className="max-w-full sm:max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-12 text-left"
      >
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <Calendar className="mr-3 text-blue-600 w-8 h-8" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Event Timeline: Phase 1 Ideathon</h2>
            </div>
            <div className="space-y-4 text-gray-600 text-left pl-0 ml-0">
              <div>
                <h3 className="font-semibold text-gray-800">1. Theme Announcement / Polling Starts</h3>
                <p><strong>Time:</strong> 10:00 AM</p>
                <p><strong>Venue:</strong> ESB Seminar Hall 1</p>
                <p><strong>Details:</strong> All participants must be present in ESB Seminar Hall 1 at 10:00 AM sharp. A link to the poll will be provided in the hall. Participants will vote for their preferred themes from the 10 announced themes.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">2. Polling End Time</h3>
                <p><strong>Time:</strong> 10:30 AM</p>
                <p><strong>Details:</strong> Polling closes, and the top 5 themes with the highest votes are announced. The offline Ideathon begins immediately.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">3. Offline Ideathon</h3>
                <p><strong>Time:</strong> 10:00 AM to 1:00 PM</p>
                <p><strong>Venue:</strong> ESB Seminar Hall 1</p>
                <p><strong>Details:</strong> Teams will receive a pre-designed PPT template for their presentations. Teams can start working on their ideas immediately after the themes are finalized. Participants can consult with any of the mentors present in the hall during the ideation phase. Teams must submit their final presentations by 1:00 PM sharp.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">4. Shortlisted Teams Announcement</h3>
                <p><strong>Time:</strong> Evening (Exact time to be communicated)</p>
                <p><strong>Details:</strong> Shortlisted teams advancing to the final 24-hour online hackathon will be announced via email.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">5. Final Online Hackathon</h3>
                <p><strong>Details:</strong> The shortlisted teams will proceed to the final round, which will be conducted online. Further details will be shared with the qualifying teams.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...sectionVariants}
        className="max-w-full sm:max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-12"
      >
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sm:p-8">
          <div className="flex items-center mb-6">
            <Clock className="mr-3 text-purple-600 w-8 h-8" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Important Notes</h2>
          </div>
          <ul className="list-disc ml-6 space-y-2 text-gray-600 text-left pl-0 ml-0">
            <li>All participants must be present in ESB Seminar Hall 1 at 10:00 AM sharp.</li>
            <li>Teams will receive the polling link in the hall and must vote by 10:30 AM.</li>
            <li>Ideation starts immediately after polling closes.</li>
            <li>Teams can utilize mentoring sessions freely to refine their ideas.</li>
            <li>Final presentations must be submitted by 1:00 PM sharp.</li>
            <li>At least 2 teammates are expected to remain present in the hall during the ideathon phase. Exceptions (e.g., exams/quizzes) must be communicated to the core members and organizers in advance.</li>
            <li>Participants must inform the core members before leaving the hall for any reason.</li>
            <li>Teams are requested to maintain good conduct and harmony among teammates.</li>
            <li>Any plagiarism or suspicious activities must be reported to the core members or organizers immediately.</li>
            <li>The decision of the organizing committee is final.</li>
            <li>Violation of rules and regulations may result in disqualification.</li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        {...sectionVariants}
        className="text-center max-w-full sm:max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4"
      >
        <div className="flex justify-center items-center mb-6">
          <Users className="mr-3 text-blue-600 w-8 h-8" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Stay Connected</h2>
        </div>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-8">
          For updates and announcements, stay tuned to our official social media channels.
        </p>
        <motion.button
          onClick={() => {
            window.open('https://chat.whatsapp.com/C1OLANv58r74mmghyuljvg', '_blank');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 
            bg-gradient-to-r from-green-500 via-green-600 to-green-700
            text-white font-bold rounded-full 
            hover:shadow-lg transition-all duration-300"
        >
          Join WhatsApp Community
        </motion.button>
      </motion.div>
    </motion.div>
  );
}  


