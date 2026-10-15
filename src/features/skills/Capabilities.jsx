import { capabilities } from "../../content/capabilities";
import Reveal from "../../motion/Reveal";
export default function Techstack() {
  return (
    <Reveal tabIndex={-1} id="skills" className="content-section" aria-labelledby="skills-title">
      <p className="eyebrow">Technical capabilities</p>
      <h2 id="skills-title" className="section-title">Skills in context</h2>
      <p className="section-copy section-lead">Backend depth, interface development, and the engineering work behind each capability.</p>
      <div className="capability-grid">{capabilities.map((capability, index) => (
        <article key={capability.title} className="surface">
          <p className="eyebrow">0{index + 1} / Capability</p>
          <h3 className="card-title">{capability.title}</h3>
          <p className="accent-copy mt-3">{capability.tools}</p>
          <p className="section-copy">{capability.description}</p>
          <a className="text-link" href={capability.href}>Explore {capability.project} →</a>
        </article>
      ))}</div>
      <p className="section-copy mt-6">Supporting tools: React, JavaScript, HTML, CSS, Tailwind CSS, Git, and Vite.</p>
    </Reveal>
  );
}
