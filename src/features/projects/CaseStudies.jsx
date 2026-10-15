import { useEffect, useState } from "react";
import { caseStudies } from "../../content/case-studies";
import ArchitectureExplorer from "./ArchitectureExplorer";
import Reveal from "../../motion/Reveal";

const studyFromHash = () => caseStudies.find(study => window.location.hash === `#${study.id}-case-study`);
const roleLabels = { "career-nexus": "Team lead & backend developer", "devbridge-ide": "Individual contributor", "intelliagents-autoauth": "Team project" };
export default function CaseStudies() {
  const [openStudies, setOpenStudies] = useState(() => new Set());
  useEffect(() => {
    let frame;
    const revealStudy = () => {
      const study = studyFromHash();
      if (!study) return;
      setOpenStudies(new Set([study.id]));
      frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(`${study.id}-case-study`);
        target?.scrollIntoView({ behavior: "instant", block: "start" });
        target?.querySelector("summary")?.focus({ preventScroll: true });
      });
    };
    const revealCurrentLink = event => {
      const anchor = event.target.closest?.("a[href]");
      if (!event.defaultPrevented && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey
          && anchor?.origin === window.location.origin && anchor.pathname === window.location.pathname
          && anchor.search === window.location.search && anchor.hash === window.location.hash) revealStudy();
    };
    revealStudy(); window.addEventListener("hashchange", revealStudy); document.addEventListener("click", revealCurrentLink);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("hashchange", revealStudy); document.removeEventListener("click", revealCurrentLink); };
  }, []);
  return (
    <Reveal tabIndex={-1} id="case-studies" className="content-section case-studies-section" aria-labelledby="case-studies-title">
      <div className="case-studies-opening"><p className="eyebrow">Inside the backend</p><h2 id="case-studies-title" className="section-title">Engineering case studies</h2><p className="section-copy">Architecture, decisions, and the evidence behind the implementation.</p></div>
      <div className="case-study-list">{caseStudies.map(study => (
        <details id={`${study.id}-case-study`} key={study.id} className="case-study case-study-refined" open={openStudies.has(study.id)} onToggle={event => {
          const isOpen = event.currentTarget.open;
          setOpenStudies(previous => {
            if (previous.has(study.id) === isOpen) return previous;
            if (isOpen) return new Set([study.id]);
            const next = new Set(previous); next.delete(study.id); return next;
          });
        }}>
          <summary className="case-study-summary"><span className="case-summary-text"><span className="case-summary-role">{roleLabels[study.id]}</span><span className="case-study-name">{study.title}</span><span className="case-summary-description">{study.subtitle}</span></span><span className="case-summary-indicator" aria-hidden="true">{openStudies.has(study.id) ? "−" : "+"}</span></summary>
          <div className="case-study-body">
            <div className="case-introduction"><div><h3>My role</h3><p>{study.contribution}</p></div><div><h3>The problem</h3><p>{study.problem}</p></div></div>
            <div className="case-flow"><ArchitectureExplorer study={study} /></div>
            <section className="case-decisions" aria-labelledby={`${study.id}-decisions`}><h3 id={`${study.id}-decisions`}>Backend decisions</h3><div>{study.decisions.map(decision => <article className="case-decision" key={decision.title}><h4>{decision.title}</h4><p>{decision.implementation}</p><details className="case-tradeoff"><summary>Tradeoff</summary><p>{decision.tradeoff}</p></details></article>)}</div></section>
            <div className="case-deeper">
              <details><summary>Implementation example and reliability</summary><div className="case-detail-grid"><div><h3>{study.exampleTitle}</h3><pre className="case-code"><code>{study.example}</code></pre><p className="case-caption">{study.exampleNote}</p></div><div><h3>Reliability and testing</h3><p className="section-copy">{study.reliability}</p><h3>What the implementation demonstrates</h3><p className="section-copy">{study.outcome}</p></div></div></details>
              <details><summary>Limitations and next steps</summary><div className="case-detail-grid"><div><h3>Current limitations</h3><ul className="detail-list">{study.limitations.map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>Next engineering steps</h3><p className="section-copy">{study.nextSteps}</p></div></div></details>
              <details><summary>Source evidence and team context</summary><div className="case-source-content"><p className="section-copy">{study.documentedContext}</p><p className="case-caption">Source snapshot {study.revision} · reviewed 6 October 2026</p><ul className="case-source-links">{study.sources.map(source => <li key={source.url}><a className="text-link" href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span className="visually-hidden"> (opens in a new tab)</span></a></li>)}</ul></div></details>
            </div>
            <footer className="case-return"><a className="text-link" href={`#${study.id}`}>Back to project</a></footer>
          </div>
        </details>
      ))}</div>
    </Reveal>
  );
}

