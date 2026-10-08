import { resumeUrl } from "../../content/portfolio";
import SystemScene from "./SystemScene";
export default function Description() {
  return (
    <section tabIndex={-1} id="home" className="content-section hero-section" aria-labelledby="hero-title">
      <div>
        <p className="eyebrow">Sai Teja Venkata Vinay Adapa</p>
        <h1 id="hero-title" className="hero-title">Backend Engineer</h1>
        <p className="hero-intro">Building APIs, real-time services, and data workflows.</p>
        <p className="section-copy">Recent Computer Science graduate working with Java, Spring Boot,
          PostgreSQL, and Python. My projects span campus recruitment, collaborative coding,
          and AI-assisted workflows.</p>
        <div className="action-row">
          <a className="primary-action" href="#portfolio">Explore backend work ↓</a>
          <a className="secondary-action" href={resumeUrl} target="_blank" rel="noopener noreferrer">View résumé ↗</a>
          <a className="text-link" href="#contact">Get in touch</a>
        </div>
        <div className="action-row social-links" aria-label="Professional profiles">
          <a href="https://github.com/22A31A0525" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/sai-teja-venkata-vinay-adapa/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </div>
      <SystemScene />
      <dl className="evidence-strip">
        <div><dt>Primary focus</dt><dd>Backend engineering</dd></div>
        <div><dt>CareerNexus role</dt><dd>Team Lead &amp; Backend Developer</dd></div>
        <div><dt>Education</dt><dd>Recent graduate · CGPA 8.04/10</dd></div>
      </dl>
    </section>
  );
}
