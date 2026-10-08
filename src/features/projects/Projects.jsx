import { featuredProjects, otherProjects } from "../../content/portfolio";
export default function Portfolio() {
  return (
    <section tabIndex={-1} id="portfolio" className="content-section" aria-labelledby="work-title">
      <p className="eyebrow">Selected work</p>
      <h2 id="work-title" className="section-title">Backend projects</h2>
      <p className="section-copy section-lead">Explore the problem, my role, and the backend implementation.
        Read the case studies for architecture, decisions, and implementation evidence.</p>
      <div className="project-list">
        {featuredProjects.map((project, index) => (
          <article id={project.id} key={project.id} className="surface project-entry" aria-labelledby={`${project.id}-title`}>
            <div className="project-summary">
              <p className="eyebrow">0{index + 1} / {project.role}</p>
              <h3 id={`${project.id}-title`} className="project-title">{project.title}</h3>
              <p className="section-copy">{project.description}</p>
              <ul className="tech-tags" aria-label={`${project.title} technologies`}>
                {project.tech.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            </div>
            <div className="project-evidence">
              <p className="eyebrow">Backend focus</p>
              <p className="card-title">{project.focus}</p>
              <div className="action-row">
                <a className="secondary-action" href={`#${project.id}-case-study`}>Read case study →</a>
                <a className="text-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source code ↗</a>
                {project.liveUrl && <a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
                <a className="text-link" href={`#${project.id}`} aria-label={`Permalink to ${project.title}`}>Project link #</a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <details className="surface secondary-collection">
        <summary>More projects <span className="summary-note">Algorithms, frontend, and automation</span></summary>
        <div className="supporting-grid">{otherProjects.map((project) => (
          <div key={project.title}><h3 className="card-title">{project.title}</h3>
            <p className="section-copy">{project.description}</p>
            <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">Source code ↗</a>
          </div>
        ))}</div>
      </details>
    </section>
  );
}
