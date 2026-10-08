import { useEffect, useState } from "react";
import { caseStudies } from "../../content/case-studies";

const studyFromHash = () => caseStudies.find((study) => window.location.hash === `#${study.id}-case-study`);

export default function CaseStudies() {
  const [openStudies, setOpenStudies] = useState(() => new Set());

  useEffect(() => {
    let frame;
    const revealStudy = () => {
      const study = studyFromHash();
      if (!study) return;
      setOpenStudies((previous) => new Set([...previous, study.id]));
      // Reposition after expanded content is laid out, including initial deep links.
      frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(`${study.id}-case-study`);
        target?.scrollIntoView({ behavior: "instant", block: "start" });
        target?.querySelector("summary")?.focus({ preventScroll: true });
      });
    };
    const revealCurrentLink = (event) => {
      const anchor = event.target.closest?.("a[href]");
      if (!event.defaultPrevented && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey
          && anchor?.origin === window.location.origin && anchor.pathname === window.location.pathname
          && anchor.search === window.location.search && anchor.hash === window.location.hash) revealStudy();
    };
    revealStudy();
    window.addEventListener("hashchange", revealStudy);
    document.addEventListener("click", revealCurrentLink);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", revealStudy);
      document.removeEventListener("click", revealCurrentLink);
    };
  }, []);

  return (
    <section tabIndex={-1} id="case-studies" className="content-section" aria-labelledby="case-studies-title">
      <p className="eyebrow">Inside the systems</p>
      <h2 id="case-studies-title" className="section-title">Engineering case studies</h2>
      <p className="section-copy section-lead">Follow the architecture, implementation choices, and reliability
        boundaries behind each project.</p>
      <div className="case-study-list">
        {caseStudies.map((study) => (
          <details id={`${study.id}-case-study`} key={study.id} className="surface case-study"
            open={openStudies.has(study.id)} onToggle={(event) => {
              const isOpen = event.currentTarget.open;
              setOpenStudies((previous) => {
                if (previous.has(study.id) === isOpen) return previous;
                const next = new Set(previous);
                if (isOpen) next.add(study.id); else next.delete(study.id);
                return next;
              });
            }}>
            <summary><span className="case-study-name">{study.title}</span>
              <span className="summary-note">{study.subtitle}</span></summary>
            <div className="case-study-body">
              <div className="two-column case-study-opening">
                <div><h3 className="card-title">The problem</h3><p className="section-copy">{study.problem}</p></div>
                <div><h3 className="card-title">Role and contribution</h3><p className="case-role">{study.role}</p>
                  <p className="section-copy">{study.contribution}</p></div>
              </div>
              <div className="documented-context"><h3 className="card-title">Project context</h3>
                <p className="section-copy">{study.documentedContext}</p></div>
              <figure className="architecture-figure">
                <figcaption><h3 className="card-title">Architecture</h3><p className="section-copy">{study.flowLabel}</p></figcaption>
                <ol className="architecture-flow" aria-label={`${study.title} architecture flow`}>
                  {study.architecture.map((step, index) => (
                    <li key={step.title}><span className="flow-number">0{index + 1}</span>
                      <h4>{step.title}</h4><p>{step.detail}</p></li>
                  ))}
                </ol>
                <p className="case-caption">{study.architectureNote}</p>
              </figure>
              <h3 className="card-title">Engineering decisions and tradeoffs</h3>
              <div className="two-column decision-grid">{study.decisions.map((decision) => (
                <div key={decision.title} className="decision-card"><h4>{decision.title}</h4>
                  <p className="section-copy">{decision.implementation}</p>
                  <p className="decision-tradeoff"><strong>Tradeoff</strong> {decision.tradeoff}</p>
                </div>
              ))}</div>
              <div className="two-column case-artifacts">
                <div><h3 className="card-title">{study.exampleTitle}</h3><pre className="case-code"><code>{study.example}</code></pre>
                  <p className="case-caption">{study.exampleNote}</p></div>
                <div><h3 className="card-title">Reliability and testing</h3><p className="section-copy">{study.reliability}</p></div>
              </div>
              <h3 className="card-title">What the implementation demonstrates</h3>
              <p className="section-copy">{study.outcome}</p>
              <div className="two-column case-boundaries">
                <div><h3 className="card-title">Current limitations</h3><ul className="detail-list">
                  {study.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
                </ul></div>
                <div><h3 className="card-title">Next engineering steps</h3><p className="section-copy">{study.nextSteps}</p></div>
              </div>
              <footer className="case-sources">
                <h3 className="card-title">Implementation evidence</h3>
                <p className="case-caption">Source snapshot {study.revision} · reviewed 6 October 2026</p>
                <div className="action-row">{study.sources.map((source) => (
                  <a key={source.url} className="text-link" href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>
                ))}</div>
                <div className="action-row">
                  <a className="text-link" href={`#${study.id}-case-study`} aria-label={`Permalink to ${study.title} case study`}>Case study link #</a>
                  <a className="text-link" href={`#${study.id}`}>Back to project ↑</a>
                  <a className="text-link" href="#portfolio">All selected work ↑</a>
                </div>
              </footer>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
