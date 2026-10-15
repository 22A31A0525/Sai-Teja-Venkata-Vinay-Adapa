import { featuredProjects, otherProjects } from "../../content/portfolio";
import { caseStudies } from "../../content/case-studies";
import ArchitectureExplorer from "./ArchitectureExplorer";
import Reveal from "../../motion/Reveal";

const roles = {
  "career-nexus": { label: "Team lead & backend developer", contribution: "I led backend development and team coordination for CareerNexus." },
  "devbridge-ide": { label: "Individual contributor", contribution: "I contributed to this collaborative coding project. The implementation below shows its backend design." },
  "intelliagents-autoauth": { label: "Team project", contribution: "Built as a team project. This overview describes the shared backend implementation." },
};
function externalContext() { return <span className="visually-hidden"> (opens in a new tab)</span>; }
export default function Portfolio() {
  return (
    <Reveal tabIndex={-1} id="portfolio" className="content-section projects-section" aria-labelledby="work-title">
      <div className="projects-opening"><p className="eyebrow">Selected work</p><h2 id="work-title" className="section-title">Projects</h2><p className="section-copy">Recruitment, real-time collaboration, and AI-assisted workflows.</p></div>
      <div className="project-list">
        {featuredProjects.map(project => (
          <article id={project.id} key={project.id} className="project-showcase" aria-labelledby={`${project.id}-title`}>
            <div className="project-heading"><div><p className="project-role-label">{roles[project.id].label}</p><h3 id={`${project.id}-title`}>{project.title}</h3></div><ul className="tech-tags" aria-label={`${project.title} technologies`}>{project.tech.map(technology => <li key={technology}>{technology}</li>)}</ul></div>
            <div className="project-overview">
              <div className="project-purpose"><p className="project-description">{project.description}</p><div className="project-contribution"><h4>My role</h4><p>{roles[project.id].contribution}</p></div></div>
              <div className="project-backend"><h4>Backend implementation</h4><ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div>
            </div>
            <div className="project-footer"><a className="secondary-action" href={`#${project.id}-case-study`}>Read case study</a><a className="text-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source code{externalContext()}</a>{project.liveUrl && <a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live demo{externalContext()}</a>}</div>
            <details className="project-flow"><summary>Explore backend flow<span className="project-disclosure-hint" aria-hidden="true">+</span></summary><ArchitectureExplorer study={caseStudies.find(study => study.id === project.id)} compact /></details>
          </article>
        ))}
      </div>
      <details className="secondary-collection projects-more"><summary>More projects<span className="summary-note">Algorithms, interfaces, and automation</span></summary><div className="supporting-grid">{otherProjects.map(project => <article key={project.title}><h3 className="card-title">{project.title}</h3><p className="section-copy">{project.description}</p><a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">Source code{externalContext()}</a></article>)}</div></details>
    </Reveal>
  );
}

