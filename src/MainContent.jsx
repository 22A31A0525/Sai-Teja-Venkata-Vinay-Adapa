import "./css/maincontent.css";
import Circles from "./Circles";
import Description from "./Description";
import About from "./About";
import Portfolio from "./Portifolio";
import ContactForm from "./Contact";
import Footer from "./Footer";
import Navbar from "./Navbar";


function MainContent() {
  return (
    <>
    <Circles/>
    <Navbar/>
    <Description/>
    <About/>
    <Portfolio/>
    <ContactForm/>
    <Footer/>

    </>
  );
}

export default MainContent;
