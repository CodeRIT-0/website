'use client';  

import React from "react";
import { motion } from "framer-motion";
import "../app/intro.css";

const Intro = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: "easeOut" }
  };

  const scaleIn = {
    initial: { scale: 0.9, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut", delay: 0.5 }
  };

  return (
    <div id="intro" className="flex flex-col items-center bg-gradient-to-b from-white via-blue-50 to-white">
      <motion.div 
        className="w-full mt-5" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img 
          src="./Intro Video.gif" 
          alt="test" 
          className="w-full object-cover max-h-[calc(100vh-80px)]" 
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      <motion.div 
        id="intro-text"
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="mt-10"
      >
        <center>
          <motion.h1 
            id="intro-head"
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          >
            About
          </motion.h1>
        </center>
        <motion.p 
          id="intro-para"
          variants={fadeInUp}
          className="leading-relaxed text-gray-700 -mt-8"
        >
          CodeRIT is the official coding club of our college and the most active
          technical club our college. We guide students through their journey to
          find their passion for technology through our hackathons, regular
          contests, workshop and information about competitions like ACM-ICPC,
          Google Code Jam, Google Summer of Code, and other online coding
          events. We conduct workshops on areas of computer science like web
          development, resume building, Git/GitHub etc. We conduct coding
          competitions which are open to all branches with exciting prizes to
          the winners and best female coder - Coding Diva as well.
        </motion.p>

        <div id="grid" className="relative">
          <motion.div 
            id="grid-item"
            className="transform hover:scale-105 transition-all duration-500 cursor-pointer 
                       bg-gradient-to-br from-blue-100/80 to-purple-100/80 backdrop-blur-md
                       border-2 border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                       rounded-xl"
            variants={scaleIn}
            initial="initial"
            whileInView="whileInView"
            whileHover={{ 
              y: -10,
              boxShadow: "0 25px 30px -12px rgba(0, 0, 0, 0.15)",
              borderColor: "rgba(255, 255, 255, 0.8)"
            }}
          >
            <center>
              <h3 className="bold-text text-blue-700 text-xl mb-4">Vision</h3>
            </center>
            <p className="text-gray-700">
              Creating a Community of enthusiastic coders with holistic
              development of how to approach a problem, problem solving and
              logic building.
            </p>
          </motion.div>

          <motion.div 
            id="grid-item"
            className="transform hover:scale-105 transition-all duration-500 cursor-pointer 
                       bg-gradient-to-br from-purple-100/80 to-blue-100/80 backdrop-blur-md
                       border-2 border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                       rounded-xl"
            variants={scaleIn}
            initial="initial"
            whileInView="whileInView"
            whileHover={{ 
              y: -10,
              boxShadow: "0 25px 30px -12px rgba(0, 0, 0, 0.15)",
              borderColor: "rgba(255, 255, 255, 0.8)"
            }}
          >
            <center>
              <h3 className="bold-text text-blue-700 text-xl mb-4">Mission</h3>
            </center>
            <p className="text-gray-700">
              Aims to establish a coding culture on campus, reaching every
              student passionate about coding. The club&apos;s motto is to
              Create-Build-Innovate-Solve.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="text-center w-full px-4"
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
      >
        <h1 id="intro-head" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Upcoming Events
        </h1>
        <h3 className="bold-text text-blue-700">Ice-Breaker 2024</h3>
        <motion.div 
          className="inline-block mt-4 mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <motion.img 
            src="./poster.png" 
            alt="Image" 
            className="h-[32rem] rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <br />
          <motion.a
            href="/registration"
            className="inline-block px-6 py-3 mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-md transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Now
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Intro;