"use client";

import Image from "next/image";
import axios from "axios";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./animations.css";

const branches = [
  "ARCH",
  "BIOTECH", 
  "CHE",
  "CHEM",
  "CIVIL",
  "CSE",
  "CSE (CY)",
  "CSE (AI/ML)",
  "AI/ML",
  "AI/DS",
  "ECE",
  "EIE",
  "EEE",
  "ETC",
  "HUM",
  "IEM",
  "ISE",
  "MATH",
  "MCA",
  "MBA",
  "MECH",
  "MED ELEC",
  "PHYS",
];

export default function Home() {
  const router = useRouter();
 
  const [message, setMessage] = useState({ text: "", color: "" });
  const [showMsg, setShowMsg] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [load, setLoad] = useState(true);
  const [student, setStudent] = useState({
    name: "",
    usn: "",
    branch: "",
    email: "",
    phone: "",
    queries: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setStudent({ ...student, [name]: value });
  };

  useEffect(() => {
    const formArea = document.querySelector("#form-area");

    if (showWindow || showInfoModal) {
      formArea.classList.add("blur-lg");
    } else {
      formArea.classList.remove("blur-lg");
    }
  }, [showWindow, showInfoModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !student.name ||
      !student.usn ||
      !student.branch ||
      !student.email ||
      !student.phone
    ) {
      setShowMsg(true);
      setMessage({ text: "Enter all fields", color: "text-red-400" });

      setTimeout(() => {
        setShowMsg(false);
        setMessage({ text: "", color: "" });
      }, 1000);

      return;
    }

    try {
      setShowWindow(true);
      const res = await axios.post("/api/register", student);

      if (res.status != 200) {
        return;
      } else {
        setLoad(false);
        setStudent({
          name: "",
          usn: "",
          branch: "",
          email: "",
          phone: "",
          queries: "",
        });
      }
    } catch (error) {
      alert("Server Error");
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="relative w-full max-w-2xl mt-10">
          <button
            onClick={() => setShowInfoModal(true)}
            className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Event Info
          </button>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01] duration-300">
            <div className="px-8 py-12 mt-20" id="form-area">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ice Breaker 24
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Join us for an amazing experience</p>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <input
                    onChange={handleChange}
                    value={student.name}
                    type="text"
                    name="name"
                    id="name"
                    className="w-full h-12 text-gray-900 dark:text-white placeholder-transparent peer border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none bg-transparent transition-colors duration-200"
                    placeholder="Name"
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    onChange={handleChange}
                    value={student.usn}
                    type="text"
                    name="usn"
                    id="usn"
                    className="w-full h-12 text-gray-900 dark:text-white placeholder-transparent peer border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none bg-transparent transition-colors duration-200"
                    placeholder="USN"
                    required
                  />
                  <label
                    htmlFor="usn"
                    className="absolute left-0 -top-3.5 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    USN
                  </label>
                </div>

                <div className="relative">
                  <select
                    onChange={handleChange}
                    value={student.branch}
                    name="branch"
                    id="branch"
                    className="w-full h-12 text-gray-900 dark:text-gray-400 border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none bg-transparent transition-colors duration-200"
                    required
                  >
                    <option value="" disabled>Select your branch</option>
                    {branches.map((branch) => (
                      <option key={branch} value={branch} className="text-gray-900 dark:text-white bg-white dark:bg-gray-700">
                        {branch}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="branch"
                    className="absolute left-0 -top-3.5 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Branch
                  </label>
                </div>

                <div
                  className={`${
                    showMsg ? "" : "hidden"
                  } w-full text-center`}
                >
                  <p className={`text-xl font-semibold ${message.color} animate-pulse`}>
                    {message.text}
                  </p>
                </div>

                <div className="relative">
                  <input
                    onChange={handleChange}
                    value={student.email}
                    type="email"
                    name="email"
                    id="email"
                    className="w-full h-12 text-gray-900 dark:text-white placeholder-transparent peer border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none bg-transparent transition-colors duration-200"
                    placeholder="Email"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Email
                  </label>
                </div>

                <div className="relative">
                  <input
                    onChange={handleChange}
                    value={student.phone}
                    type="text"
                    name="phone"
                    id="phone"
                    className="w-full h-12 text-gray-900 dark:text-white placeholder-transparent peer border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none bg-transparent transition-colors duration-200"
                    placeholder="Phone"
                    required
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 -top-3.5 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Phone
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    id="queries"
                    name="queries"
                    onChange={handleChange}
                    value={student.queries}
                    rows="4"
                    className="w-full p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Leave your queries here...."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full py-3 px-6 text-white font-medium rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transform transition-all hover:scale-[1.02] duration-200"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Info Modal */}
            <div className={`${showInfoModal ? "" : "hidden"} fixed inset-0 z-50 overflow-y-auto`}>
              <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 p-6 overflow-y-auto max-h-[90vh]">
                  <button
                    onClick={() => setShowInfoModal(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  <div className="space-y-4 text-gray-800 dark:text-gray-200">
                    <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      🎉 ICEBREAKER 2024 🎉
                    </h2>
                    
                    <p className="text-lg font-semibold text-center">
                      CodeRIT– The Official Coding Club of Ramaiah Institute of Technology presents...
                    </p>

                    <div className="space-y-4 mt-6">
                      <h3 className="text-xl font-bold">💻 What to Expect?</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>A peek into what CodeRIT does 🧑‍💻</li>
                        <li>Discover how we can help you in your coding journey 🚀</li>
                        <li>A warm welcome for coding enthusiasts of all levels 🌟</li>
                        <li>Beginners or even those who have no idea about coding – YOU ARE WELCOME! 🎊</li>
                      </ul>

                      <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                        <h3 className="font-bold">📅 Event Details:</h3>
                        <p>Date: Friday, 22nd November 2024</p>
                        <p>Time: 1:45 PM</p>
                        <p>Venue: ESB Seminar Hall 1</p>
                      </div>

                      <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                        <h3 className="font-bold">📞 Contact Information:</h3>
                        <p>Yashashwini Singh: +91 99027 27689</p>
                        <p>Nikith Ganga: +91 81977 34232</p>
                      </div>

                      <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                        <h3 className="font-bold">🔗 Important Links:</h3>
                        <p>WhatsApp Community: <a href="https://lnkd.in/gsn28dac" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">https://lnkd.in/gsn28dac</a></p>
                        <p>LinkTree: <a href="http://linktr.ee/code_rit" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">linktr.ee/code_rit</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success/Loading Modal */}
            <div
              className={`${
                showWindow ? "" : "hidden"
              } absolute z-10 w-[90%] h-auto min-h-[200px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            >
              {load ? (
                <div className="w-full h-full flex justify-center items-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24">
                    <Image src="/Loader.svg" alt="loader" width={100} height={100} className="w-full h-full"></Image>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col py-8 px-6 justify-evenly bg-gray-800 rounded-2xl shadow-2xl">
                  <h1 className="text-center text-2xl sm:text-3xl font-bold text-white mb-6">
                    Your Response was Recorded
                  </h1>
                  <div className="flex flex-col gap-4 w-full px-4">
                    <a
                      onClick={() => {
                        setShowWindow(false);
                        router.push('/');
                      }}
                      className="py-4 text-center text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl font-medium transform transition-all hover:scale-[1.02] duration-200 shadow-lg"
                      href="/"
                    >
                      Cancel
                    </a>
                    <a
                      onClick={() => {
                        setShowWindow(false);
                        router.push('/');
                        window.open('https://chat.whatsapp.com/FeFzoAe63rpAaZPrTCYjyx', '_blank');
                      }}
                      className="py-4 text-center text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl font-medium transform transition-all hover:scale-[1.02] duration-200 shadow-lg"
                    >
                      Join WhatsApp Community
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}