import Hero from "../features/hero/Hero";
import About from "../features/about/About";
import Projects from "../features/projects/Projects";
import CaseStudies from "../features/projects/CaseStudies";
import Experience from "../features/experience/Experience";
import Capabilities from "../features/skills/Capabilities";
import ContactForm from "../features/contact/ContactForm";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function PortfolioPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Experience />
        <Projects />
        <CaseStudies />
        <Capabilities />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
