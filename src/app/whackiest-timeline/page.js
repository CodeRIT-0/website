"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Zap } from "lucide-react";

export default function EventTimelinePage() {
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
          Event Timeline: Whackiest 2024 - Phase 1: Ideathon
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 text-center mb-6 sm:mb-7 md:mb-8 font-medium max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
          Stay informed about all the key events and details for the ideation phase of Whackiest 2024.
        </p>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 max-w-full sm:max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-12">
        <motion.div
          {...sectionVariants}
          className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300"
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <Calendar className="mr-3 text-blue-600 w-8 h-8" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Event Details</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800">1. Theme Announcement / Polling Starts</h3>
                <p><strong>Time:</strong> 9:00 AM</p>
                <p><strong>Platform:</strong> Official social media handles</p>
                <p><strong>Details:</strong> 10 themes will be announced, and all participating teams must vote for their preferred themes. The top 5 themes will be finalized.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">2. Polling End Time</h3>
                <p><strong>Time:</strong> 10:30 AM</p>
                <p><strong>Details:</strong> Polling closes, and the top 5 themes are announced to begin the offline Ideathon.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">3. Offline Ideathon</h3>
                <p><strong>Time:</strong> 10:00 AM to 1:00 PM</p>
                <p><strong>Venue:</strong> ESB Seminar Hall 1</p>
                <p><strong>Details:</strong> Participants will receive a pre-designed PPT template for their presentations. Teams will be mentored by experts and must submit their final presentations by 1:00 PM.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">4. Shortlisted Teams Announcement</h3>
                <p><strong>Time:</strong> Evening (Exact time to be communicated)</p>
                <p><strong>Details:</strong> The shortlisted teams for the final 24-hour online hackathon will be announced.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">5. Final Online Hackathon</h3>
                <p><strong>Details:</strong> Shortlisted teams will advance to the final online round. Further details will be shared with qualifying teams.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...sectionVariants}
          className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sm:p-8"
        >
          <div className="flex items-center mb-6">
            <Clock className="mr-3 text-purple-600 w-8 h-8" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Important Notes</h2>
          </div>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Teams are expected to reach the venue at 10:00 AM sharp.</li>
            <li>All ideation will take place during the 10:00 AM to 1:00 PM session.</li>
            <li>Participants can freely use mentoring sessions to refine their ideas.</li>
            <li>Final presentations must be submitted at 1:00 PM sharp.</li>
          </ul>
        </motion.div>
      </div>

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
