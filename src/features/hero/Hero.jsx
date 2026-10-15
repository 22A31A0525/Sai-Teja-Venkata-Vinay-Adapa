import ResumeLink from "../../components/ResumeLink";
import SystemScene from "./SystemScene";
export default function Description() {
  return (
    <section tabIndex={-1} id="home" className="content-section hero-section" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Sai Teja Venkata Vinay Adapa</p>
        <h1 id="hero-title" className="hero-title">Backend engineer</h1>
        <p className="hero-intro">Building APIs, real-time services, and data workflows.</p>
        <p className="section-copy hero-summary">I led CareerNexus backend development with Java, Spring Boot,
          and PostgreSQL. I also develop React browser extensions and Python workflows.</p>
        <div className="action-row hero-actions" role="group" aria-label="Portfolio actions">
          <a className="primary-action" href="#portfolio">View projects</a>
          <ResumeLink showIcon={false} />
        </div>
        <nav className="action-row social-links hero-social-links" aria-label="Contact and professional profiles">
          <a className="text-link" href="#contact">Contact me</a>
          <a href="https://github.com/22A31A0525" target="_blank" rel="noopener noreferrer"
            title="GitHub profile opens in a new tab">GitHub<span className="visually-hidden"> (opens in a new tab)</span></a>
          <a href="https://www.linkedin.com/in/sai-teja-venkata-vinay-adapa/" target="_blank" rel="noopener noreferrer"
            title="LinkedIn profile opens in a new tab">LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></a>
        </nav>
      </div>
      <SystemScene />
    </section>
  );
}
