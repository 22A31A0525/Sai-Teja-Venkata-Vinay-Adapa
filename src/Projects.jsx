import { useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import AOS styles
const Projects=()=>{

    useEffect(() => {
      AOS.init({
        duration: 1000, // Animation duration in ms
        once: true, // Animation will run only once
      });
    }, []);
    return(
        <div className="grid grid-cols-3 gap-4 w-full max-[1300px]:grid-cols-2 max-[630px]:grid-cols-1" id="projects">
        <div className="w-full h-auto z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:shadow-2xl "  data-aos="fade-up"
      data-aos-delay={`${100}`} >
          <div className="flex justify-center">
            <div className="w-72 h-auto rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold  mb-2">
               Placement Tracker
              </h3>
              <p className=" text-sm mb-4">
                A comprehensive tracker to manage your project placements,
                monitor progress, and achieve milestones with ease.
              </p>
              <button
                className="bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled
              >
                Code Link
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-auto z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:shadow-2xl" data-aos="fade-up"
      data-aos-delay={`${200}`}>
          <div className="flex  justify-center">
            <div className="w-72 h-60 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                Automation Check Extraction
              </h3>
              <p className=" text-sm mb-4 text-justify">
                Automate the process of checking and extracting data to from cheques and 
                improve efficiency and accuracy.
              </p>
              <button className="bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-600 transition">
                Code link
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-auto z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:shadow-2xl" data-aos="fade-up"
      data-aos-delay={`${300}`}>
          <div className="flex justify-center">
            <div className="w-72 text-white h-auto rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                Weather Application
              </h3>
              <p className="text-sm mb-4">
                A simple weather application that provides real-time
                weather updates and forecasts.
              </p>
              <button className="bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-600 transition">
                Code Link
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Projects