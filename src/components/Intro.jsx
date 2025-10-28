'use client';

import React from "react";
import { motion } from "framer-motion";
import "../app/intro.css";
import eventData from "../app/events/events";
import EventCard from "../Card/Card1";

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

  // Get the 3 most recent events
  const recentEvents = [...eventData]
    .sort((a, b) => new Date(b.ActualDate) - new Date(a.ActualDate))
    .slice(0, 3);

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
         Upcoming Event
        </h1>
        <h3 className="bold-text text-blue-700">Ice Breaker!</h3>
        <motion.div
          className="inline-block mt-4 mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <motion.img
            src="./posterIceBreaker-better.webp"
            alt="Image"
            className="h-[32rem] rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <br />
          <motion.a
            href="/icebreaker-register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 
    bg-gradient-to-r from-blue-600 to-purple-600
    text-white font-bold rounded-full 
    hover:shadow-lg transition-all duration-300"
          >
            Register Now
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="text-center w-full px-4"
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
      >
        <h1 id="intro-head" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Recent Events
        </h1>
        
        {/* Events Grid - Responsive: 1 on mobile, 3 on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-8">
          {recentEvents.map((event, index) => (
            <motion.div
              key={index}
              className={`${index > 0 ? 'hidden lg:block' : ''}`}
              variants={scaleIn}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <EventCard
                name={event.Name}
                year={event.Year}
                date={event.Date}
                description={event.Description}
                url={event.img}
              />
            </motion.div>
          ))}
        </div>

        {/* Show All Events Button */}
        <motion.div className="mt-8 mb-8">
          <motion.a
            href="/events"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 
              bg-gradient-to-r from-blue-600 to-purple-600
              text-white font-bold rounded-full 
              hover:shadow-lg transition-all duration-300"
          >
            Show All Events
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Intro;