import { useState } from "react";
import { architectureStudy, optionalBoolean } from "../../components/prop-validation";

export default function ArchitectureExplorer({ study, compact = false }) {
  const [selected, setSelected] = useState(0);
  const prefix = `${study.id}-${compact ? "preview" : "architecture"}`;
  return (
    <figure className={`architecture-explorer ${compact ? "is-compact" : ""}`}>
      <figcaption>
        <p className="eyebrow">{compact ? "Implementation flow" : "Architecture"}</p>
        <h3 className="card-title">{study.flowLabel}</h3>
      </figcaption>
      <ol className="explorer-steps" aria-label={`${study.title} implementation stages`}>
        {study.architecture.map((step, index) => (
          <li key={step.title}>
            <button type="button" aria-pressed={selected === index} aria-controls={`${prefix}-description`}
              onClick={() => setSelected(index)}>
              <span className="flow-number">0{index + 1}</span>
              <span>{step.title}</span>
              <span className="flow-arrow" aria-hidden="true">↗</span>
            </button>
            {!compact && <p className="explorer-step-detail">{step.detail}</p>}
          </li>
        ))}
      </ol>
      <div id={`${prefix}-description`} className="explorer-description" role="status" aria-live="polite">
        <span className="flow-number">0{selected + 1} / {study.architecture[selected].title}</span>
        <p>{study.architecture[selected].detail}</p>
      </div>
      <p className="case-caption">{compact ? "Source-derived overview. Explore the case study for implementation boundaries." : study.architectureNote}</p>
    </figure>
  );
}
ArchitectureExplorer.propTypes = { study: architectureStudy, compact: optionalBoolean };
