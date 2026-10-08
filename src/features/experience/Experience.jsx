import certificate from "../../assets/infosys_internship.png";
export default function Experience() {
  return (
    <section tabIndex={-1} id="experience" className="content-section" aria-labelledby="experience-title">
      <p className="eyebrow">Professional work</p>
      <h2 id="experience-title" className="section-title">Experience</h2>
      <p className="section-copy section-lead">Application development, browser integration, and data validation.</p>
      <div className="two-column">
        <article className="surface">
          <p className="eyebrow">TaskLabs</p><h3 className="card-title">Software Developer Intern</h3>
          <p className="experience-date">Started November 2025</p>
          <ul className="detail-list">
            <li>Browser extension development using React, JavaScript, and Chrome APIs.</li>
            <li>Storage, runtime messaging, and tab integrations for extension functionality.</li>
            <li>Performance debugging and edge-case handling across browser environments.</li>
          </ul>
        </article>
        <article className="surface">
          <p className="eyebrow">Infosys · Virtual</p><h3 className="card-title">Python Developer Intern</h3>
          <p className="experience-date">November 2024 – February 2025</p>
          <ul className="detail-list">
            <li>OCR pipeline work to extract and validate data from scanned cheques.</li>
            <li>PostgreSQL-backed validation for extracted data.</li>
            <li>Recognition and validation across different cheque formats.</li>
          </ul>
          <a className="text-link" href={certificate} target="_blank" rel="noopener noreferrer">View internship certificate ↗</a>
        </article>
      </div>
    </section>
  );
}
