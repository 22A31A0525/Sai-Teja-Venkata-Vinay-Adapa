import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import framer-motion
import side_video from "./assets/side_video.mp4";
import leetcode from "./assets/leetcode.png";
import hackerrank from "./assets/hackerrank.png";
import linkedin from "./assets/linkedin.png";
import github from "./assets/github.png";


const InnovativeBadge = () => (
  <motion.span
    className="flex items-center text-xs md:text-sm font-semibold border border-violet-500/30 rounded-full px-4 py-1 w-fit"
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.4)" }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <span className="relative flex h-2 w-2 mr-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
    </span>
    Ready To Innovate
  </motion.span>
);

const AnimatedHeading = () => {
  const text = "Java Developer";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.5 * i },
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
    <motion.h1
      className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 py-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={childVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const TypingEffect = ({ stages }) => {
  const [text, setText] = useState("");
  const [isErasing, setIsErasing] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delay = 1500;

    const handleTyping = () => {
      const currentStage = stages[stageIndex];
      if (!isErasing && text.length < currentStage.length) {
        setText(currentStage.substring(0, text.length + 1));
      } else if (!isErasing && text.length === currentStage.length) {
        setTimeout(() => setIsErasing(true), delay);
      } else if (isErasing && text.length > 0) {
        setText(currentStage.substring(0, text.length - 1));
      } else if (isErasing && text.length === 0) {
        setIsErasing(false);
        setStageIndex((prev) => (prev + 1) % stages.length);
      }
    };

    const timeout = setTimeout(handleTyping, isErasing ? erasingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isErasing, stageIndex, stages]);

  return (
    <div className="text-xl md:text-2xl font-mono mt-2 h-8">
      <span className="text-gray-300">{text}</span>
      <span className="w-1 h-6 md:h-7 bg-cyan-400 inline-block ml-1 animate-pulse" />
    </div>
  );
};

const SocialLinks = () => {
  // Using placeholder images for demonstration as local assets won't load here.
  const icons = [
    { src: linkedin, alt: "LinkedIn", href: "https://www.linkedin.com/in/sai-teja-venkata-vinay-adapa/" },
    { src: github, alt: "GitHub", href: "https://github.com/22A31A0525" },
    { src:leetcode, alt: "LeetCode", href: "https://leetcode.com/u/22A31A0525/" },
    { src: hackerrank, alt: "HackerRank", href: "https://www.hackerrank.com/profile/22A31A0_525" },
  ];

  return (
    <div className="mt-8 flex items-center space-x-6">
      {icons.map((icon) => (
        <motion.a
          key={icon.alt}
          href={icon.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={icon.src}
            alt={icon.alt}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full grayscale hover:grayscale-0 transition-all duration-300"
          />
        </motion.a>
      ))}
    </div>
  );
};

// --- Main Content Component ---
export default function Description() {
  const typingStages = [
    
"DSA Enthusiast",
	"Java FullStack Developer",
"Computer Science And Engineering",
    "Microsoft Learn Student Ambassador",
    
  ];

  return (
    <div id="home" className="relative min-h-60 max-h-auto w-full flex items-center justify-center overflow-hidden px-4 py-8">
      {/* Changed to Flexbox layout */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-7xl w-full">
        {/* Left Column: Text Content */}
        <motion.div
          className="text-white flex flex-col gap-4 w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center md:justify-start">
            <InnovativeBadge />
          </div>
          <AnimatedHeading />
          <TypingEffect stages={typingStages} />
          <div className="flex justify-center md:justify-start">
            <SocialLinks />
          </div>
        </motion.div>

        {/* Right Column: Video */}
        <motion.div
          className="p-2 bg-gradient-to-r from-violet-600 to-cyan-400 rounded-2xl shadow-2xl shadow-cyan-500/20 w-full max-w-md md:w-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.03, boxShadow: "0px 0px 30px rgba(52, 211, 235, 0.5)" }}
        >
          <video
            src={side_video}
            className="w-full h-auto rounded-xl"
            autoPlay
            loop
            muted
            playsInline 
          ></video>
        </motion.div>
      </div>
    </div>
  );
}
