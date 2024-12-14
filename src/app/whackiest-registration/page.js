"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Users,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  X,
  AlertCircle,
  Info,
  ChevronDown,
  Loader2
} from 'lucide-react';

const ButtonSpinner = ({ className = '' }) => (
  <Loader2
    className={`animate-spin mr-2 ${className}`}
  />
);

const branches = [
  "ARCH", "BIOTECH", "CHE", "CHEM", "CIVIL", "CSE", "CSE (CY)",
  "CSE (AI/ML)", "AI/ML", "AI/DS", "ECE", "EIE", "EEE", "ETC",
  "HUM", "IEM", "ISE", "MATH", "AEROSPACE", "MCA", "MBA", "MECH", "MED ELEC",
  "PHYS"
];

const years = [1, 2, 3, 4];

export default function TeamRegistration() {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showWindow, setShowWindow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [team, setTeam] = useState({
    teamName: "",
    teamSize: "",
    captain: { name: "", usn: "", year: "", branch: "" },
    member1: { name: "", usn: "", year: "", branch: "" },
    member2: { name: "", usn: "", year: "", branch: "" },
    member3: { name: "", usn: "", year: "", branch: "" }
  });

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 5000);
  };

  const resetForm = () => {
    setTeam({
      teamName: "",
      teamSize: "",
      captain: { name: "", usn: "", year: "", branch: "" },
      member1: { name: "", usn: "", year: "", branch: "" },
      member2: { name: "", usn: "", year: "", branch: "" },
      member3: { name: "", usn: "", year: "", branch: "" }
    });
  };

  const handleChange = (e, memberType = null) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "teamSize") {
      setTeam(prevTeam => ({
        ...prevTeam,
        teamSize: value,
        member3: { name: "", usn: "", year: "", branch: "" }
      }));
    } else if (memberType) {
      setTeam(prevTeam => ({
        ...prevTeam,
        [memberType]: {
          ...prevTeam[memberType],
          [name]: value
        }
      }));
    } else {
      setTeam(prevTeam => ({
        ...prevTeam,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamSizeInt = parseInt(team.teamSize);
    const requiredMembers =
      teamSizeInt === 3
        ? ["captain", "member1", "member2"]
        : ["captain", "member1", "member2", "member3"];

    const missingFields = requiredMembers.some(
      (member) =>
        !team[member].name ||
        !team[member].usn ||
        !team[member].year ||
        !team[member].branch
    );

    if (!team.teamName || !team.teamSize || missingFields) {
      showToast("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/whackiest-team-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
      });

      const data = await response.json();

      if (response.ok) {
        resetForm();
        setShowWindow(true);
        window.scrollTo({
          top: document.documentElement.scrollHeight / 2 - window.innerHeight / 2,
          behavior: "smooth",
        });
      } else {
        showToast(data.message || "Failed to register the team");
      }
    } catch (error) {
      console.error("Error submitting team:", error);
      showToast("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 py-12 px-4 sm:px-6 md:mt-20 lg:px-8 flex items-center justify-center">
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 left-2/5 -translate-x-1/2 z-[100] px-3 py-3 rounded-xl shadow-2xl flex items-center space-x-4 
              ${toast.type === 'error'
                ? 'bg-red-50 border-2 border-red-300 text-red-800'
                : 'bg-green-50 border-2 border-green-300 text-green-800'} 
              w-[90%] max-w-md mx-auto`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-6 h-6 text-red-500" />
            ) : (
              <Info className="w-6 h-6 text-green-500" />
            )}
            <span className="text-xs sm:text-sm flex-grow font-medium">{toast.message}</span>
            <button
              onClick={() => setToast({ show: false, message: "", type: "" })}
              className="hover:bg-gray-100 rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mt-20 sm:mt-0"
      >
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-indigo-100/50 transform transition-all hover:scale-[1.01] duration-300">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center space-x-4 mb-4"
            >
              <Users className="w-10 h-10 text-white" />
              <h2 className="text-2xl sm:text-4xl font-bold text-white">Ideathon Team Registration</h2>
            </motion.div>
            <p className="text-indigo-100 max-w-xl mx-auto text-sm sm:text-base">
              Form your team and showcase your innovative ideas in the upcoming Ideathon!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="teamName"
                  value={team.teamName}
                  onChange={handleChange}
                  placeholder="Team Name"
                  className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-gray-800 placeholder-gray-400"
                  required
                />
              </div>

              <div className="flex justify-center space-x-6">
                {["3", "4"].map((size) => (
                  <label
                    key={size}
                    className="inline-flex items-center cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="teamSize"
                      value={size}
                      checked={team.teamSize === size}
                      onChange={handleChange}
                      className="hidden peer"
                    />
                    <span className="flex items-center px-4 py-2 border-2 border-indigo-200 text-gray-600 rounded-full transition-all duration-300 
                      peer-checked:bg-indigo-500 peer-checked:text-white 
                      group-hover:border-indigo-400 text-sm sm:text-base">
                      {size} Members
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {team.teamSize && (
              <div className="space-y-6">
                {["captain", "member1", "member2", ...(team.teamSize === "4" ? ["member3"] : [])].map((member, index) => (
                  <motion.div
                    key={member}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100"
                  >
                    <h4 className="text-lg sm:text-xl font-semibold mb-4 text-indigo-700 flex items-center">
                      {index === 0 ? <UserPlus className="mr-3 w-6 h-6" /> : <Users className="mr-3 w-6 h-6" />}
                      {index === 0 ? "Team Leader" : `Member ${index}`} Details
                    </h4>

                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.keys(team[member]).map((field) => (
                        <div key={field} className="relative">
                          {field === "year" || field === "branch" ? (
                            <div className="relative">
                              <select
                                name={field}
                                value={team[member][field]}
                                onChange={(e) => handleChange(e, member)}
                                className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-gray-800 appearance-none text-sm sm:text-base"
                                required
                              >
                                <option value="" disabled>
                                  Select {field.charAt(0).toUpperCase() + field.slice(1)}
                                </option>
                                {(field === "year" ? years : branches).map((option) => (
                                  <option key={option} value={option} className="bg-white text-gray-800">
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <ChevronDown className="h-5 w-5" />
                              </div>
                            </div>
                          ) : (
                            <input
                              type="text"
                              name={field}
                              value={team[member][field]}
                              onChange={(e) => handleChange(e, member)}
                              placeholder={`${index === 0 ? "Team Leader" : `Member ${index}`} ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                              className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                              required
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center space-x-3 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <ButtonSpinner className="text-white" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Registration</span>
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>

      {showWindow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 text-center"
          >
            <div className="flex justify-center mb-4 sm:mb-6">
              <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              Registration Successful!
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-base">
              Your team has been registered for the Ideathon.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={() => setShowWindow(false)}
                className="w-full py-2 sm:py-3 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors text-xs sm:text-base"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowWindow(false);
                  window.open('https://chat.whatsapp.com/FeFzoAe63rpAaZPrTCYjyx', '_blank');
                }}
                className="w-full py-2 sm:py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 text-xs sm:text-base"
              >
                <span>Join WhatsApp Community</span>
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
