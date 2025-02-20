import { useState } from "react";
import TechStack from "./Techstack";
import Projects from "./Projects";
import Certificates from "./Certificates";
const Portfolio = () => {
  const [selected, setSelected] = useState("projects");

  const handleSelect = (box) => {
    setSelected(box);
  };

  return (
    <div
      className="mt-20 w-full min-h-24 flex justify-center flex-col items-center"
      id="portfolio"
    >
      <h1 className="title text-6xl font-bold">Portfolio</h1>
      <p className="max-w-2xl mt-5 text-white text-xl max-[400px]:text-[15px] text-center">
        Explore my journey through projects, certifications, and technical
        expertise .
      </p>

      <div className="flex flex-col min-h-50 justify-between w-full items-center z-40 ">
        <div className="flex items-center w-2/3 justify-around h-25 text-white mt-10 border border-purple-600 rounded-2xl 
        max-[630px]:w-full">
          <div
            onClick={() => handleSelect("projects")}
            className={`flex items-center w-1/2 rounded-2xl justify-center max-[630px]:w-[33.3%]  h-25 cursor-pointer ${
              selected === "projects"
                ? " bg-gray-900 border border-amber-50"
                : ""
            }`}
          >
            Total Projects
          </div>
          <div
            onClick={() => handleSelect("certificates")}
            className={`flex items-center w-1/2 rounded-2xl  justify-center max-[630px]:w-[33.3%] h-25 cursor-pointer ${
              selected === "certificates"
                ? " bg-gray-900 border border-amber-50"
                : ""
            }`}
          >
            Total Certificates
          </div>
          <div
            onClick={() => handleSelect("techStack")}
            className={`flex items-center w-1/2 rounded-2xl max-[630px]:w-[33.3%] justify-center h-25 cursor-pointer ${
              selected === "techStack"
                ? " bg-gray-900 border border-amber-50"
                : ""
            }`}
          >
            Tech Stack
          </div>
        </div>
        <div className="flex items-center w-2/3 justify-around min-h-25 text-white mt-10 max-[890px]:w-[90%]">
          {selected == "projects" && <Projects />}
          {selected == "certificates" && <Certificates />}
          {selected == "techStack" && <TechStack />}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
