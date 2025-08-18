// Education.jsx
import React from "react";
import { motion } from "framer-motion";

// Education data stored in an array for easy management.
const educationHistory = [
  {
    year: "2020",
    title: "Class X (CBSE)",
    institution: "Ashram Public School, Kakinada",
    score: "Achieved a score of 81%",
  },
  {
    year: "2022",
    title: "Intermediate Education",
    institution: "Narayana Junior College",
    score: "Secured Percentage 94.4%",
  },
  {
    year: "2026",
    title: "Bachelor of Technology, CSE",
    institution: "Pragati Engineering College, Surampalem",
    score: "Expected Graduation | Current CGPA: 7.97/10",
  },
].reverse(); // Reverse to show the most recent education first.

// A reusable component for each timeline item
const TimelineItem = ({ item, index }) => {
  const isOdd = index % 2 !== 0;

  const cardVariants = {
    hidden: { opacity: 0, x: isOdd ? 100 : -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={`mb-8 flex justify-between items-center w-full ${isOdd ? "flex-row-reverse" : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
    >
      <div className="order-1 w-5/12"></div>
      
      {/* Timeline Dot */}
      <div className="z-20 flex items-center order-1 bg-indigo-500 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
      </div>

      {/* The Card */}
      <div className={`order-1 ${isOdd ? "bg-gray-800/50 border-indigo-500/30" : "bg-gray-800/50 border-purple-500/30"} rounded-lg shadow-xl w-5/12 px-6 py-4 backdrop-blur-sm border transition-transform transform hover:scale-105`}>
        <p className={`mb-3 text-sm ${isOdd ? "text-indigo-300" : "text-purple-300"}`}>{item.year}</p>
        <h3 className="mb-2 font-bold text-white text-xl">{item.title}</h3>
        <h4 className="mb-2 font-semibold text-gray-300 text-md">{item.institution}</h4>
        <p className="text-sm leading-snug tracking-wide text-gray-400">
          {item.score}
        </p>
      </div>
    </motion.div>
  );
};


function Education() {
  return (
    <section id="education" className="w-full flex flex-col items-center justify-center py-24 px-4 sm:px-8 overflow-hidden">
      <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-20">
        My Academic Journey
      </h2>
      
      <div className="relative w-full max-w-4xl">
        {/* The vertical timeline bar */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gray-700"></div>
        
        {educationHistory.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Education;
