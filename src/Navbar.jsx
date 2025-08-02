import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Reusable NavLink component for both desktop and mobile
const NavLink = ({ href, children, onClick }) => {
    // This function handles the smooth scrolling
    const handleClick = (e) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        if (onClick) {
            onClick(); // Close mobile menu if function is provided
        }
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className="relative text-gray-300 hover:text-white transition-colors duration-300 group"
        >
            {children}
            {/* Underline effect on hover */}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
        </a>
    );
};

// Main Navbar Component
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Effect to handle scroll-based active link highlighting
    useEffect(() => {
        const sections = ['home', 'about', 'portfolio', 'contact'];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px' } // Trigger when section is in the middle of the screen
        );

        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sections.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, []);

    // Effect to prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup function
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#portfolio', label: 'Portfolio' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <nav className="sticky top-0 left-0 z-50 w-full  md:h-auto md:bg-gray-900/50  shadow-lg h-screen ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo/Name Section */}
                    <div className="flex-shrink-0">
                        <a href="#home" className="text-white text-lg sm:text-xl font-bold tracking-wider">
                            {/* Shortened name for smaller screens */}
                            <span className="hidden sm:inline">SAI TEJA VENKATA VINAY ADAPA</span>
                            <span className="sm:hidden">S. T. V. V. ADAPA</span>
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector(link.href).scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`relative text-sm font-medium transition-colors duration-300 ${activeSection === link.href.substring(1) ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                {link.label}
                                {activeSection === link.href.substring(1) && (
                                    <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                                        layoutId="underline"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-violet-700/50 focus:outline-none"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <motion.div animate={isMenuOpen ? "open" : "closed"} className="w-6 h-6">
                                <motion.span variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 5 } }} className="block w-full h-0.5 bg-current" />
                                <motion.span variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} className="block w-full h-0.5 bg-current my-1.5" />
                                <motion.span variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -5 } }} className="block w-full h-0.5 bg-current" />
                            </motion.div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu (fade/scale expansion) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-900/90 backdrop-blur-sm"
                    >
                        <div className="flex flex-col items-center justify-center h-full space-y-8">
                            {navLinks.map(link => (
                                <NavLink key={link.href} href={link.href} onClick={toggleMenu}>
                                    <span className="text-3xl font-medium">{link.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
