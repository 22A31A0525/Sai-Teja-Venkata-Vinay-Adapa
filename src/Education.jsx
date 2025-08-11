// Education.jsx
import React from "react";
import { motion } from "framer-motion";

const AnimatedSectionTitle = ({ text }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 * i },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  return (
    <motion.h2
      className="text-4xl sm:text-5xl font-bold text-white text-center mb-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label={text}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>
  );
};


function Education() {
    
  return (
   <section id="education" className=" min-h-52 max-h-auto w-full flex items-center justify-center py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSectionTitle text="Education" />
        {/* Timeline Container */}
      <div className="w-[80%] max-w-4xl">
        <div className="relative border-l-2 border-indigo-400 pl-8 py-4">
          
          {/* --- B.Tech Degree Timeline Item --- */}
          <div className="mb-10 ml-8">
            {/* Timeline Dot */}
            <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full bg-indigo-500 border-2 border-gray-900"></div>
            
            {/* Timeline Content */}
            <p className="text-sm text-gray-400">Expected July 2026</p>
            <h3 className="text-2xl font-bold text-white mt-1">
              Bachelor of Technology, Computer Science
            </h3>
            <h4 className="text-lg font-semibold text-gray-300 mt-1">
              Pragati Engineering College, Surampalem
            </h4>
            <p className="mt-2 text-gray-200">
              Current CGPA: 7.97 / 10.0
            </p>
          </div>

          {/* --- Intermediate (12th Grade) Timeline Item --- */}
          <div className="mb-10 ml-8">
            {/* Timeline Dot */}
            <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full bg-indigo-500 border-2 border-gray-900"></div>
            
            {/* Timeline Content */}
            <p className="text-sm text-gray-400">Completed 2022</p>
            <h3 className="text-2xl font-bold text-white mt-1">
              Intermediate Education
            </h3>
            <h4 className="text-lg font-semibold text-gray-300 mt-1">
              Narayana Junior College
            </h4>
            <p className="mt-2 text-gray-200">
              Score: 94.4%
            </p>
          </div>

          {/* --- Class X (10th Grade) Timeline Item --- */}
          <div className="mb-10 ml-8">
            {/* Timeline Dot */}
            <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full bg-indigo-500 border-2 border-gray-900"></div>
            
            {/* Timeline Content */}
            <p className="text-sm text-gray-400">Completed 2020</p>
            <h3 className="text-2xl font-bold text-white mt-1">
              Class X (CBSE)
            </h3>
            <h4 className="text-lg font-semibold text-gray-300 mt-1">
              Ashram Public School, Kakinada
            </h4>
            <p className="mt-2 text-gray-200">
              Score: 81%
            </p>
          </div>

        </div>
      </div>
    </div>
    </section>
  );
}

export default Education;