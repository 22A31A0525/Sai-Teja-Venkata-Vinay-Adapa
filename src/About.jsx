import React from "react";
import { motion } from "framer-motion";

// --- Helper Components for Styling and Animation ---

// A reusable, animated heading for the main section title
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

// A reusable, animated card for displaying stats
const InfoCard = ({ icon, number, title, subtitle, delay }) => (
  <motion.div
    className="relative bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden group"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: delay }}
    whileHover={{
      scale: 1.05,
      boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.3)",
    }}
    viewport={{ once: true }}
  >
    <div className="absolute -z-10 inset-0 bg-gradient-to-br from-violet-600 to-cyan-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
    <div className="flex items-center justify-between mb-4">
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
        {icon}
      </div>
      <span className="text-5xl font-bold text-white opacity-80">{number}</span>
    </div>
    <div>
      <p className="text-lg font-semibold text-white mb-1">{title}</p>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  </motion.div>
);

export default function About() {
  // Placeholder for your resume file. Replace with the correct import.
  const resumeUrl = "./assets/resume.pdf";

  return (
    <section
      id="about"
      className=" min-h-52 max-h-auto w-full flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSectionTitle text="About Me" />

        {/* Introduction Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Side: Profile Picture */}
          <motion.div
            className="relative w-64 h-64 sm:w-80 sm:h-80 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-cyan-400 rounded-full blur-2xl animate-pulse-slow"></div>
            <img
              src="https://placehold.co/320x320/1d1043/ffffff?text=SV" // Placeholder for your profile image
              alt="Sai Teja Venkata Vinay Adapa"
              className="relative w-full h-full object-cover rounded-full border-4 border-gray-800"
            />
          </motion.div>

          <motion.div
            className="text-white text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">Hello, I'm</h1>
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 mb-6">
              Sai Teja Venkata Vinay Adapa
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Results-oriented final-year Computer Science student and project lead adept at delivering end-to-end full-stack applications using
Java, Spring Boot, and React. Skilled in architecting scalable backend systems and RESTful architectures, and developing intuitive
frontend interfaces. Seeking a software engineering role to apply technical expertise in scalable product development.
            </p>
            <div className="mt-8">
              <a
                href="https://drive.google.com/file/d/18iIJKeYRWinJt6txgjgd-gxQgHISpy-M/view?usp=sharing"
                download="Resume_SaiTejaVenkataVinayAdapa.pdf"
                className="inline-flex items-center gap-2 text-white border-2 border-cyan-400 bg-cyan-400/10 font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-cyan-400/20 hover:border-cyan-300 hover:scale-105"
              >
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg> */}
                Resume
              </a>
            </div>
          </motion.div>
        </div>

        {/* Info Cards Section - Updated to a 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <InfoCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-white"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            }
            number="04+"
            title="Key Projects"
            subtitle="Innovative full-stack solutions"
            delay={0.2}
          />
          <InfoCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-white"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            }
            number="02"
            title="Internship"
            subtitle="TaskLabs & Infosys"
            delay={0.4}
          />
          <InfoCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-white"
              >
                <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                <circle cx="12" cy="8" r="6" />
              </svg>
            }
            number="08"
            title="Certifications"
            subtitle="Professional skills validated"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}
