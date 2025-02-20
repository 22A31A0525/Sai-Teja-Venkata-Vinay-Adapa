import profile from "./assets/profile-icon.png";
import resume from './assets/resume.pdf'
function About() {
  return (
    <div
      className="flex flex-col items-center justify-center  mt-16 min-h-50 nav-item"
      id="about"
    >
      <h1 className="text-6xl font-bold ">About</h1>
      <span className="flex items-center text-1xl mt-4 text-3xl text-white max-[500px]:text-[20px]">
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
        Transforming Ideas into Reality
      </span>
      <div className="flex justify-around align-center w-full min-h-32 mt-15">
        <div className="flex items-center w-[80%] align-center justify-around min-h-32 text-white max-[690px]:flex-col-reverse">
          <div className="flex  w-[55%] flex-col mr-[20%] max-[770px]:mr-[0%] max-[690px]:w-full max-[690px]:mt-10">
            <h1 className="text-5xl font-bold title">Hello I'm</h1>
            <h2 className="text-4xl font-bold mt-5">
              Sai Teja Venkata Vinay Adapa
            </h2>
            <p className="text-justify mt-5">
              I am seeking a role where I can leverage my expertise in Java,
              Python, and Data Structures & Algorithms, along with web
              development using ReactJS, Node.js, and SQL. With hands-on
              experience in building full-stack applications and process
              automation, I aim to contribute effectively to development teams
              by solving real-world challenges and optimizing solutions
            </p>
            <div className="mt-8">
              <button className="text-white border p-3 mr-5 rounded-xl sh resume cursor-pointer">
                <a
                  href={resume}// Replace this with the correct path to your resume file
                  download="Resume_SaiTejaVenkataVinayAdapa.pdf" // This will set the downloaded file name
                  className="flex items-center"
                >
                  <span className="material-symbols-outlined">docs</span>
                  Download Resume
                </a>
              </button>
            </div>
          </div>
          <div className="flex items-center w-[25%] h-32 max-[690px]:w-full max-[690px]: justify-center">
            <img
              src={profile}
              className="w-75 h-75 rounded-[150px] max-[1380px]:w-50 max-[1380px]:h-50 max-[840px]:w-40 max-[840px]:h-40 max-[690px]:mb-5 max-[690px]:w-50 max-[690px]:h-50"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 cursor-pointer">
        <div
          data-aos="fade-right"
          data-aos-duration="1300"
          className="relative group aos-init aos-animate w-[350px] max-[370px]:w-[300px] "
        >
          <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#6366f1] to-[#a855f7] opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-code w-8 h-8 text-white"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <span
                className="text-4xl font-bold text-white aos-init aos-animate"
                data-aos="fade-up-left"
                data-aos-duration="1500"
                data-aos-anchor-placement="top-bottom"
              >
                3
              </span>
            </div>
            <div>
              <p
                className="text-sm uppercase tracking-wider text-gray-300 mb-2 aos-init aos-animate"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-anchor-placement="top-bottom"
              >
                Projects
              </p>
              <div className="flex items-center justify-between">
                <p
                  className="text-xs text-gray-400 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-anchor-placement="top-bottom"
                >
                  Innovative web solutions crafted
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-arrow-up-right w-4 h-4 text-white/50 group-hover:text-white transition-colors"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1300"
          className="relative group aos-init aos-animate"
        >
          <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#a855f7] to-[#6366f1] opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-award w-8 h-8 text-white"
                >
                  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                  <circle cx="12" cy="8" r="6"></circle>
                </svg>
              </div>
              <span
                className="text-4xl font-bold text-white aos-init aos-animate"
                data-aos="fade-up-left"
                data-aos-duration="1500"
                data-aos-anchor-placement="top-bottom"
              >
                5
              </span>
            </div>
            <div>
              <p
                className="text-sm uppercase tracking-wider text-gray-300 mb-2 aos-init aos-animate"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-anchor-placement="top-bottom"
              >
                Certificates
              </p>
              <div className="flex items-center justify-between">
                <p
                  className="text-xs text-gray-400 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-anchor-placement="top-bottom"
                >
                  Professional skills validated
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-arrow-up-right w-4 h-4 text-white/50 group-hover:text-white transition-colors"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="1300"
          className="relative group aos-init aos-animate"
        ></div>
      </div>
    </div>
  );
}

export default About;
