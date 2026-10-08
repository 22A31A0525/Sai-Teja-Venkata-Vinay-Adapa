import { capabilities } from "../../content/capabilities";
export default function Techstack() {
  return (
    <section tabIndex={-1} id="skills" className="content-section" aria-labelledby="skills-title">
      <p className="eyebrow">Technical capabilities</p>
      <h2 id="skills-title" className="section-title">Skills in context</h2>
      <p className="section-copy section-lead">The tools and backend mechanisms represented in my selected projects.</p>
      <div className="supporting-grid">{capabilities.map((capability) => (
        <article key={capability.title} className="surface">
          <h3 className="card-title">{capability.title}</h3>
          <p className="accent-copy mt-3">{capability.tools}</p>
          <p className="section-copy">{capability.description}</p>
          <a className="text-link" href={capability.href}>Explore {capability.project} →</a>
        </article>
      ))}</div>
      <p className="section-copy mt-6">Supporting tools: React, JavaScript, HTML, CSS, Tailwind CSS, Git, and Vite.</p>
    </section>
  );
}
