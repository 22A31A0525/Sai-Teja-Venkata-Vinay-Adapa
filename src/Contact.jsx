import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD3GEnkQyjpLZBB1xU3R7DaxkH28E_bbic",
  authDomain: "my-portfolio-105c9.firebaseapp.com",
  projectId: "my-portfolio-105c9",
  storageBucket: "my-portfolio-105c9.firebasestorage.app",
  messagingSenderId: "1062053970531",
  appId: "1:1062053970531:web:ed61a92697c97467b6ae56",
  measurementId: "G-GWVED9GY03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// --- Reusable Icon Components ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>;
const MessageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square absolute left-4 top-5 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send w-5 h-5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;


// --- Animated Title ---
const AnimatedSectionTitle = ({ text }) => {
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
    const childVariants = { visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }, hidden: { opacity: 0, y: 20 } };
    return (
        <motion.h2 className="text-4xl sm:text-5xl font-bold text-white text-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {text.split("").map((char, index) => <motion.span key={index} variants={childVariants} className="inline-block">{char === " " ? "\u00A0" : char}</motion.span>)}
        </motion.h2>
    );
};


// --- Main Contact Form Component ---
export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(''); // 'success', 'error', ''
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('error');
            return;
        }

        setIsSubmitting(true);
        setStatus('');

        try {
            // Add a new document with a generated ID to the "contacts" collection
            await addDoc(collection(db, "contacts"), {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                submittedAt: new Date()
            });
            setStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Reset form
        } catch (error) {
            console.error("Error adding document: ", error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Automatically clear status message after a few seconds
    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    return (
        <section id="contact" className=" min-h-52 max-h-auto w-full flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
            <div className="w-full max-w-2xl mx-auto">
                <AnimatedSectionTitle text="Get In Touch" />
                <p className="max-w-xl mx-auto mt-4 mb-12 text-gray-300 text-center">
                    Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="relative group">
                        <UserIcon />
                        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-4 pl-12 bg-gray-900/50 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 hover:border-cyan-400/30" required />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="relative group">
                        <MailIcon />
                        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-4 pl-12 bg-gray-900/50 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 hover:border-cyan-400/30" required />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="relative group">
                        <MessageIcon />
                        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} className="w-full resize-none p-4 pl-12 bg-gray-900/50 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 hover:border-cyan-400/30 h-36" required></textarea>
                    </motion.div>

                    <motion.button initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }} type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <> <SendIcon /> Send Message </>
                        )}
                    </motion.button>
                </form>
                
                {/* Status Message */}
                <div className="h-8 mt-4 text-center">
                    {status === 'success' && <p className="text-green-400">Message sent successfully! Thank you.</p>}
                    {status === 'error' && <p className="text-red-400">Something went wrong. Please try again.</p>}
                </div>
            </div>
        </section>
    );
}