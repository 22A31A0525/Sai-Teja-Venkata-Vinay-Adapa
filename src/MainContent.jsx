import "./css/maincontent.css";
import Circles from "./Circles";
import Description from "./Description";
import About from "./About";
import Portfolio from "./Portifolio";
import ContactForm from "./Contact";
import Footer from "./Footer";
import Education from "./Education";
import Navbar from "./Navbar";
import bg from "./assets/bg1.mp4";
import AnimatedBackground from "./AnimatedBackground.jsx"

function MainContent() {
  return (
    <>
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
      <AnimatedBackground/>
      </div>
      <Navbar />
      <Description />
      <About />
      <Education />
      <Portfolio />
      <ContactForm />
      <Footer />
    </>
  );
}

export default MainContent;