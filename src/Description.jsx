import side_video from "./assets/side_video.mp4";
import "./css/maincontent.css";
import { useState, useEffect } from "react";
import leetcode from "./assets/leetcode.png";
import hackerrank from "./assets/hackerrank.png";
import linkedin from "./assets/linkedin.png";
import github from "./assets/github.png";

function Description() {
  const [text, setText] = useState("");
  const [currentStage, setCurrentStage] = useState(0);
  const [index, setIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const typingSpeed = 100;
  const eraseSpeed = 10;

  const stages = [
    "Computer Science And Engineering",
    "Microsoft Learn Student Ambassador",
    "Pragati Engineering College",
  ];

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorBlink); // Clean up the blinking interval
  }, []);

  useEffect(() => {
    console.log(text, text.length);
  }, [text]);

  useEffect(() => {
    let typingTimeout;
    let erasingTimeout;

    const eraseText = () => {
      setText((prev) => prev.slice(0, -1));

      if (text.length > 0) {
        erasingTimeout = setTimeout(eraseText, eraseSpeed);
      } else if (currentStage != stages.length - 1) {
        setIndex(0);

        setCurrentStage((prev) => prev + 1);
      } else {
        setCurrentStage(0);
        setIndex(0);
        setText("");
      }
    };

    const typeText = () => {
      const currentText = stages[currentStage];
      if (index < currentText.length) {
        typingTimeout = setTimeout(() => {
          setText((prev) => prev + currentText[index]);
          setIndex(index + 1);
        }, typingSpeed);
      } else {
        setTimeout(() => {
          eraseText();
        }, 150);
      }
    };

    typeText();

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(erasingTimeout);
    };
  }, [index, currentStage, text]);

  return (
    <div
      className="flex justify-center items-center w-full z-5  flex-wrap min-h-52 mt-20"
      id="#home"
    >
      <div className="min-lg:w-1/2 min-lg:flex-none ">
        <div>
          <span className="flex items-center text-1xl nav-item bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-4xl temp">
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
              className="lucide lucide-sparkles sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400 ml-3"
            >
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
              <path d="M20 3v4"></path>
              <path d="M22 5h-4"></path>
              <path d="M4 17v2"></path>
              <path d="M5 18H3"></path>
            </svg>
            Ready To Innovate
          </span>
        </div>
        <h1 className="text-white text-8xl font-bold mt-5 max-[590px]:text-6xl">Java</h1>
        <h2 className="nav-item text-8xl font-bold mt-5 max-[590px]:text-6xl">Developer</h2>
        <div className="text-white text-xl font-mono mt-6">
          <span className="text-2xl max-[590px]:text-[15px]">{text}</span>
          {cursorVisible && (
            <span className="inline-block w-2 h-6 bg-white ml-1 animate-blink"></span>
          )}
        </div>
        
        <div className="mt-10 flex items-center">
          <a
            href="https://www.linkedin.com/in/sai-teja-venkata-vinay-adapa/"
            target="_blank"
            rel="noopener noreferrer "
          >
            <img
              src={linkedin}
              alt="linkedin"
              className="w-10 h-10 mr-5 hover:shadow-lg hover:shadow-violet-500 rounded-3xl "
            />
          </a>
          <a
            href="https://github.com/22A31A0525"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={github}
              alt="github"
              className="w-10 h-10 mr-5 hover:shadow-lg hover:shadow-violet-500 rounded-3xl "
            />
          </a>
          <a
            href="https://leetcode.com/u/22A31A0525/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={leetcode}
              alt="leetcode"
              className="w-10 h-10 mr-5 hover:shadow-lg hover:shadow-violet-500 rounded-3xl "
            />
          </a>
          <a
            href="https://www.hackerrank.com/profile/22A31A0_525"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={hackerrank}
              alt="hackerrank"
              className="w-10 h-10 mr-5 hover:shadow-lg hover:shadow-violet-500 rounded-3xl "
            />
          </a>
        </div>
      </div>

      <video
        src={side_video}
        className="w-120 h-96 max-[620px]:w-100 max-[400]:w-80"
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
}

export default Description;
