import { useEffect } from 'react';
import AOS from 'aos';
import python from './assets/python_cer.png'
import react from './assets/react_cer.png'
import java from './assets/java_cer.png'
import salesforce from './assets/salesforce.png'
import mlsa from './assets/mlsa.png'
import 'aos/dist/aos.css';  // Make sure to import AOS styles

function Certificates() {
 
  const certificates = [
    { name: 'Certificate 1', image: python },
    { name: 'Certificate 2', image: java },
    { name: 'Certificate 3', image: react },
    { name: 'Certificate 4', image: salesforce},
    {name:"Certificate 5",image:mlsa}
  ];

  
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true,     // Run the animation only once
    });
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8 py-12">
      {certificates.map((certificate, index) => (
        <div
          key={index}
          className="flex justify-center items-center"
          data-aos="fade-up"       // Animation on scroll
          data-aos-delay={`${100 * index}`} // Stagger the delay
        >
          <img
            src={certificate.image}
            alt={certificate.name}
            className="w-64 h-64 object-contain shadow-xl hover:shadow-2xl transition-all duration-300"
          />
        </div>
      ))}
    </div>
  );
}

export default Certificates;
