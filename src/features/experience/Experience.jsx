import { experience } from "../../content/experience";
import Reveal from "../../motion/Reveal";
import supercommandsLogo from "../../assets/supercommands-logo.png";
export default function Experience() {
  return (
    <Reveal tabIndex={-1} id="experience" className="content-section experience-section" aria-labelledby="experience-title">
      <div className="experience-opening">
        <div><p className="eyebrow">Professional work</p><h2 id="experience-title" className="section-title">Experience</h2></div>
      </div>
      {experience.map(entry => (
        <article key={entry.id} id={entry.id} className="experience-feature experience-branded" aria-labelledby={`${entry.id}-title`}>
          <div className="experience-brand-panel">
            <div className="experience-logo-frame"><img src={supercommandsLogo} alt="" width="96" height="96" loading="lazy" decoding="async" /></div>
            <p className="experience-employer">{entry.company}</p>
            <p className="experience-date">{entry.date}</p>
          </div>
          <div className="experience-work-panel">
          <div className="experience-role"><p className="experience-role-label">My role</p><h3 id={`${entry.id}-title`}>{entry.role}</h3><p>{entry.focus}</p></div>
          <div className="experience-areas" aria-label="Contributions">
            {entry.contributions.map(item => <div className="experience-area" key={item.title}><h4>{item.title}</h4><p>{item.detail}</p></div>)}
          </div>
          <div className="experience-toolbox"><span>Worked with</span><ul className="tech-tags" aria-label={`${entry.company} technologies`}>{entry.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div>
          </div>
        </article>
      ))}
    </Reveal>
  );
}
