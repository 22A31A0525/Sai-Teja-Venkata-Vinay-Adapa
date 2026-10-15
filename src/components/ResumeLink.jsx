import { resumeUrl } from "../content/portfolio";
import { optionalBoolean, optionalFunction, optionalString } from "./prop-validation";

export default function ResumeLink({ className = "secondary-action", onClick, showIcon = true }) {
  return (
    <a className={`resume-action ${className}`} href={resumeUrl} target="_blank" rel="noopener noreferrer"
      title="View resume in a new tab" onClick={onClick}>
      <span>View resume</span>
      {showIcon && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
ResumeLink.propTypes = { className: optionalString, onClick: optionalFunction, showIcon: optionalBoolean };
