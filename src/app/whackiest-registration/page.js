"use client";

import { useState } from "react";

const branches = [
  "ARCH", "BIOTECH", "CHE", "CHEM", "CIVIL", "CSE", "CSE (CY)", 
  "CSE (AI/ML)", "AI/ML", "AI/DS", "ECE", "EIE", "EEE", "ETC", 
  "HUM", "IEM", "ISE", "MATH", "MCA", "MBA", "MECH", "MED ELEC", 
  "PHYS"
];

const topics = [
  "A", "B", "C", "D", "E", "F", "G"
];

const years = [1, 2, 3, 4];

export default function TeamRegistration() {
  const [message, setMessage] = useState({ text: "", color: "" });
  const [showMsg, setShowMsg] = useState(false);
  const [showWindow, setShowWindow] = useState(false); // Show window modal
  const [load, setLoad] = useState(false); // Loading state
  const [team, setTeam] = useState({
    teamName: "",
    teamSize: "",
    topic: "",
    captain: { name: "", usn: "", year: "", branch: "" },
    member1: { name: "", usn: "", year: "", branch: "" },
    member2: { name: "", usn: "", year: "", branch: "" },
    member3: { name: "", usn: "", year: "", branch: "" }
  });

  const handleChange = (e, memberType = null) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    if (memberType) {
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
        setShowMsg(true);
        setMessage({ text: "Please fill all required fields", color: "text-red-400" });

        setTimeout(() => {
          setShowMsg(false);
          setMessage({ text: "", color: "" });
        }, 5000);
        return;
      }

      setLoad(true); 

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
          setMessage({ text: "Team registered successfully!", color: "text-green-400" });
          setShowWindow(true);
          window.scrollTo({
            top: document.documentElement.scrollHeight / 2 - window.innerHeight / 2,
            behavior: "smooth",
          });
        } else {
          setMessage({
            text: data.message || "Failed to register the team",
            color: "text-red-400",
          });
          setShowMsg(true);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      } catch (error) {
        console.error("Error submitting team:", error);
        setMessage({
          text: "An error occurred. Please try again.",
          color: "text-red-400",
        });
        setShowMsg(true);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } finally {
        setLoad(false); 
        setTimeout(() => setShowMsg(false), 5000);
      }
    };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="relative w-full max-w-2xl mt-10">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01] duration-300">
            <div className="px-8 py-12 mt-20">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ideathon Team Registration
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Register your team for the Ideathon</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Team Name */}
                <div className="relative">
                  <input
                    onChange={handleChange}
                    value={team.teamName}
                    type="text"
                    name="teamName"
                    id="teamName"
                    className="w-full h-12 text-gray-900 dark:text-white placeholder-transparent peer border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none bg-transparent transition-colors duration-200"
                    placeholder="Team Name"
                    required
                  />
                  <label
                    htmlFor="teamName"
                    className="absolute left-0 -top-3.5 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Team Name
                  </label>
                </div>

                {/* Team Size */}
                <div className="flex justify-center space-x-6 mb-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="teamSize"
                      value="3"
                      checked={team.teamSize === "3"}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">3 Members</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="teamSize"
                      value="4"
                      checked={team.teamSize === "4"}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">4 Members</span>
                  </label>
                </div>

                <div className="relative">
                  <select
                    onChange={handleChange}
                    value={team.topic}
                    name="topic"
                    id="topic"
                    className="w-full h-12 text-gray-900 dark:text-gray-400 border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none bg-transparent transition-colors duration-200"
                    required
                  >
                    <option value="" disabled>Select your topic</option>
                    {topics.map((topic) => (
                      <option key={topic} value={topic} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
                        {topic}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="topic"
                    className="absolute left-0 -top-3.5 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Topic
                  </label>
                </div>

                {/* Error Message */}
                <div className={`${showMsg ? "" : "hidden"} w-full text-center`}>
                  <p className={`text-xl font-semibold ${message.color} animate-pulse`}>
                    {message.text}
                  </p>
                </div>

                {/* Dynamic Member Forms */}
                {team.teamSize && (
                  <div>
                    {["captain", "member1", "member2", ...(team.teamSize === "4" ? ["member3"] : [])].map((member, index) => (
                      <div key={member} className="border-b-2 pb-4 mb-4">
                        <h4 className="text-xl font-semibold text-center mb-4 text-gray-700 dark:text-gray-300">
                          {index === 0 ? "Team Leader" : `Member ${index}`} Details
                        </h4>
                        {Object.keys(team[member]).map((field) => (
                          <div key={field} className="relative mb-4">
                            {field === "year" || field === "branch" ? (
                              <select
                                onChange={(e) => handleChange(e, member)}
                                value={team[member][field]}
                                name={field}
                                id={`${member}${field}`}
                                className="w-full h-12 text-gray-900 dark:text-gray-400 border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none bg-transparent transition-colors duration-200"
                                required
                              >
                                <option value="" disabled>{`Select ${field.charAt(0).toUpperCase() + field.slice(1)}`}</option>
                                {(field === "year" ? years : branches).map((option) => (
                                  <option key={option} value={option} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
                                    {option}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                onChange={(e) => handleChange(e, member)}
                                value={team[member][field]}
                                type="text"
                                name={field}
                                id={`${member}${field}`}
                                className="w-full h-12 text-gray-900 dark:text-white placeholder-gray-400 peer border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none bg-transparent transition-colors duration-200"
                                placeholder={`${index === 0 ? "Team Leader" : `Member ${index}`} ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                required
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-6 text-white font-medium rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transform transition-all hover:scale-[1.02] duration-200"
                >
                  Submit
                </button>
              </form>

              {/* Success/Loading Modal */}
              <div
                className={`${
                  showWindow ? "" : "hidden"
                } absolute z-10 w-[90%] h-auto min-h-[200px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
              >
                {load ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="w-16 h-16 sm:w-24 sm:h-24">Loading...</div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col py-8 px-6 justify-evenly bg-gray-800 rounded-2xl shadow-2xl">
                    <h1 className="text-center text-2xl sm:text-3xl font-bold text-white mb-6">
                      Your Response was Recorded
                    </h1>
                    <div className="flex flex-col gap-4 w-full px-4">
                      <button
                        onClick={() => {
                          setShowWindow(false);
                        }}
                        className="py-4 text-center text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl font-medium transform transition-all hover:scale-[1.02] duration-200 shadow-lg"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          setShowWindow(false);
                          window.open('https://chat.whatsapp.com/FeFzoAe63rpAaZPrTCYjyx', '_blank');
                        }}
                        className="py-4 text-center text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl font-medium transform transition-all hover:scale-[1.02] duration-200 shadow-lg"
                      >
                        Join WhatsApp Community
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
