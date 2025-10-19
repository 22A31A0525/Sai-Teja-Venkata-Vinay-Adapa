import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import c from "./assets/c.png"
import python from './assets/python_cer.png'
import react from './assets/react_cer.png'
import java from "./assets/javafoundation.png"
import javafullstack from './assets/java_cer.png'
import csa from "./assets/csa.png"
import cad from "./assets/cad.png"
import mlsa from './assets/mlsa.png'
import infosys_internship_certificate from "./assets/infosys_internship.png"
import Techstack from "./Techstack.jsx"

const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>;
const ExternalLinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>;
const CertificateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10.5 15.5 8 13l-2.5 2.5"/><path d="m8 13-1.5-1.5"/><path d="M16 13h-2"/><path d="M16 17h-5"/><path d="M16 9h-2"/></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;


// --- Content Components ---

const ProjectCard = ({ title, role, description, tech, githubUrl, liveUrl,has }) => (
    <div className="relative bg-gray-900/50 p-6 rounded-xl border border-white/10 overflow-hidden group transition-all duration-300 hover:border-cyan-400/50 hover:scale-[1.02]">
        <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-violet-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-violet-400 mb-3">{role}</p>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
            {tech.map(t => <span key={t} className="text-xs bg-gray-700/50 text-cyan-300 py-1 px-2 rounded-full">{t}</span>)}
        </div>
        <div className="flex items-center gap-4 mt-auto">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                <GithubIcon /> GitHub
            </a>
            
            {liveUrl ? (

                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                    <ExternalLinkIcon /> Live Demo
                </a>
            ) : (
                <span className="flex items-center gap-2 text-sm text-gray-500 cursor-not-allowed">
                    {has?("Coming Soon"):("")}
                </span>
            )}
        </div>
    </div>
);

const Projects = () => {
    const projectData = [
        { title: "CareerNexus", role: "Team Lead & Backend Developer", description: "A full-stack campus recruitment platform built with Java and Spring Boot, featuring dedicated dashboards for students, officers, and recruiters.", tech: ["Java", "Spring Boot", "React", "PostgreSQL"], githubUrl: "https://github.com/CareerNexus-Pragati-Engineering-College",has:true,liveUrl:"https://carrernexus-c413a.web.app/" },
        { title: "DevBridge IDE", role: "Individual Contributor", description: "A collaborative code editor with real-time synchronization using WebSockets, JWT for security, and a React-based frontend.", tech: ["Java","Spring Boot", "WebSockets", "React", "JWT"], githubUrl: "https://github.com/22A31A0525/DevBridgeIde",has:true,liveUrl: "http://devbridge.ddns.net/" },
        { title: "DSA Showcase", role: "Personal Project", description: "A collection of projects implementing key Data Structures and Algorithms in Java, focusing on performance and problem-solving.", tech: ["Java", "DSA", "Algorithms"], githubUrl: "https://github.com/22A31A0525/DSA-Projects",has:false },
        { title: "Now-Weather", role: "Full-Stack Project", description: "A dynamic weather app that provides real-time data, location mapping, and an adaptive background that changes based on the current weather.", tech: ["React", "REST APIs", "Mapping SDK"], githubUrl: "https://github.com/22A31A0525/Now-Weather", liveUrl: "https://saitejavenkat.github.io/Now-Weather/" },
        {title:" Multi-Profile Browser Automation Script",role:"Personal Project",description:" Developed a Python script to automate repetitive daily web searches across 16 unique browser profiles, demonstrating practical automation skills.",tech:["Python","PyautoGui","Automation","os"],githubUrl:"https://github.com/22A31A0525/Automated-Browser-Tasks/tree/main",has:false},
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectData.map(p => <ProjectCard key={p.title} {...p} />)}
        </motion.div>
    );
};

const Experience = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const infosysCertificateImg = infosys_internship_certificate;

    return (
        <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-full">
                <div className="relative bg-gray-900/50 p-6 rounded-xl border border-white/10 overflow-hidden group transition-all duration-300 hover:border-violet-400/50">
                    <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-600/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
                        <div>
                            <h3 className="text-xl font-bold text-white">Python Developer Intern</h3>
                            <p className="text-md text-cyan-400">Infosys (Virtual)</p>
                        </div>
                        <p className="text-sm text-gray-400 mt-2 sm:mt-0">Nov 2024 - Feb 2025</p>
                    </div>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-4">
                        <li>Designed and implemented an OCR pipeline to extract and validate data from scanned cheques.</li>
                        <li>Achieved over 99% data accuracy by developing a data validation module with PostgreSQL.</li>
                        <li>Contributed to a 15% increase in recognition accuracy across different cheque formats.</li>
                    </ul>
                    <button onClick={() => setSelectedImg(infosysCertificateImg)} className="inline-flex items-center gap-2 text-sm text-violet-300 hover:text-white transition-colors font-semibold">
                        <CertificateIcon /> View Certificate
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedImg(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.img
                            layoutId={`card-${selectedImg}`}
                            src={selectedImg}
                            alt="Selected Certificate"
                            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                        />
                        <motion.button
                            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
                            onClick={() => setSelectedImg(null)}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <CloseIcon />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
const Certificates = () => {
    const [selectedImg, setSelectedImg] = useState(null);

    const certificateData = [
        {name:"Java Certification", image:java},
        { name: 'Python Certification', image: python },
        { name: 'Java Certification', image: javafullstack },
        { name: 'React Certification', image: react},
        { name: 'CSA Certification',image:csa },
        {name:'CAD Certification',image:cad},
        {name:"C",image:c},
        { name: 'MLSA Certificate', image: mlsa },
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
                {certificateData.map((cert, index) => (
                    <motion.div
                        key={index}
                        className="relative aspect-square bg-gray-900/50 rounded-lg border border-white/10 overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedImg(cert.image)}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        layoutId={`card-${cert.image}`}
                    >
                        <img src={cert.image} alt={cert.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-center text-sm font-semibold p-2">{cert.name}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedImg(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.img
                            layoutId={`card-${selectedImg}`}
                            src={selectedImg}
                            alt="Selected Certificate"
                            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                        />
                        <motion.button
                            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
                            onClick={() => setSelectedImg(null)}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <CloseIcon />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const TechStack = () => {
  return <Techstack/>
}


// --- Helper Components ---

const AnimatedSectionTitle = ({ text }) => {
  const containerVariants = { hidden: { opacity: 0 }, visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 * i } }) };
  const childVariants = { visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }, hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 200 } } };
  return (
    <motion.h2 className="text-4xl sm:text-5xl font-bold text-white text-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} aria-label={text}>
      {text.split("").map((char, index) => <motion.span key={index} variants={childVariants} className="inline-block">{char === " " ? "\u00A0" : char}</motion.span>)}
    </motion.h2>
  );
};

const TabButton = ({ children, isSelected, onSelect }) => (
    <button className={`relative w-full py-3 px-4 text-sm sm:text-base font-semibold transition-colors duration-300 ${isSelected ? 'text-white' : 'text-gray-400 hover:text-white'}`} onClick={onSelect}>
        {children}
        {isSelected && <motion.div layoutId="portfolio-tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" initial={false} transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
    </button>
);


// --- Main Portfolio Component ---
export default function Portfolio() {
  const [selected, setSelected] = useState("projects");

  const sections = { projects: <Projects />, experience: <Experience />, certificates: <Certificates />, techStack: <TechStack /> };

  return (
    <section id="portfolio" className=" min-h-52 max-h-auto w-full flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto">
        <AnimatedSectionTitle text="Portfolio" />
        <p className="max-w-2xl mx-auto mt-4 mb-12 text-gray-300 text-center">
          Explore my journey through projects, professional experience, certifications, and technical expertise.
        </p>
        <div className="relative flex justify-center border border-white/10 rounded-lg bg-gray-900/30 backdrop-blur-sm mb-12">
            <TabButton isSelected={selected === 'projects'} onSelect={() => setSelected('projects')}>Projects</TabButton>
            <TabButton isSelected={selected === 'experience'} onSelect={() => setSelected('experience')}>Experience</TabButton>
            <TabButton isSelected={selected === 'certificates'} onSelect={() => setSelected('certificates')}>Certificates</TabButton>
            <TabButton isSelected={selected === 'techStack'} onSelect={() => setSelected('techStack')}>Tech Stack</TabButton>
        </div>
        <div className="w-full min-h-[300px] flex items-start justify-center">
            <AnimatePresence mode="wait">
                {sections[selected]}
            </AnimatePresence>
        </div>
      </div>
    </section>
  );
}