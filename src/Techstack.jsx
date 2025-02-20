import  { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import AOS styles
import java from './assets/java.png'
import python from './assets/python.png'
import html from './assets/html.png'
import css from './assets/css.png'
import js from './assets/js.png'
import rec from './assets/react.png'
import tailwind from './assets/tailwindcss.png'
import git from './assets/git.png'
import db from './assets/database.png'
import vite from './assets/vite.png'
import springboot from './assets/spring-boot.png'

const Techstack = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Animation will run only once
    });
  }, []);

  // Tech Stack images and names
  const techStacks = [
    { name: 'Java', image: java },
    {name:"SpringBoot",image:springboot},
    { name: 'Python', image: python },
    { name: 'HTML', image: html},
    { name: 'CSS', image: css },
    { name: 'JavaScript', image: js },
    { name: 'Vite', image:vite },
    { name: 'React', image:rec},
    { name: 'TailwindCSS', image: tailwind},
    { name: 'SQL', image: db },
    { name: 'Git', image: git },
  ];
  
  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {techStacks.map((tech, index) => (
          <div
            key={index}
            className="flex justify-center items-center  bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:shadow-2xl"
            data-aos="fade-up"
            data-aos-delay={`${100 * index}`}  // Delay the animation for each tech stack
          >
            <img
              src={tech.image}
              alt={tech.name}
              className="w-24 h-24 object-contain transition-transform transform hover:scale-110 hover:shadow-[1px_1px_80px] hover:shadow-violet-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Techstack;