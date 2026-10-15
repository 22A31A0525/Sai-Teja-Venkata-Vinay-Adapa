import ResumeLink from "../../components/ResumeLink";
import { credentials } from "../../content/credentials";
import Reveal from "../../motion/Reveal";
export default function About() {
  return (
    <Reveal tabIndex={-1} id="about" className="content-section" aria-labelledby="about-title">
      <p className="eyebrow">Background</p><h2 id="about-title" className="section-title">About me</h2>
      <div className="two-column">
        <div>
          <p className="section-copy">I am Sai Teja Venkata Vinay Adapa, a recent Computer Science graduate
            focused on backend engineering and full-stack development. My work includes leading CareerNexus backend development
            and contributing to applications with real-time and data-processing workflows.</p>
          <p className="section-copy">My React and browser-extension experience helps me connect backend services
            to the people who use them. I am seeking backend and full-stack development opportunities
            building interfaces, APIs, and reliable application services.</p>
          <ResumeLink />
        </div>
        <div className="surface">
          <h3 className="card-title">Education</h3><p>Bachelor of Technology · Computer Science</p>
          <p className="section-copy">Pragati Engineering College, Surampalem</p>
          <p className="accent-copy">Recent graduate · CGPA 8.04/10</p>
          <div className="action-row">
            <a className="text-link" href="https://leetcode.com/u/22A31A0525/" target="_blank" rel="noopener noreferrer">LeetCode ↗</a>
            <a className="text-link" href="https://www.hackerrank.com/profile/22A31A0_525" target="_blank" rel="noopener noreferrer">HackerRank ↗</a>
          </div>
        </div>
      </div>
      <details className="surface secondary-collection">
        <summary>Credentials <span className="summary-note">Explore certificates and recognition</span></summary>
        <div className="credential-grid">{credentials.map((credential) => (
          <a key={credential.name} href={credential.image} target="_blank" rel="noopener noreferrer">
            <img src={credential.image} alt={`${credential.name} credential`} loading="lazy" width="240" height="170" />
            <span>{credential.name} ↗</span>
          </a>
        ))}</div>
      </details>
    </Reveal>
  );
}
