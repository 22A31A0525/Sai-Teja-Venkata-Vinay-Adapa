import { useEffect, useRef, useState } from "react";
import { submitContact } from "../../services/contact-service";
import { contactErrorMessage, contactLimits, validateContact } from "../../services/contact-validation";
import { profile } from "../../content/profile";

const emptyForm = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inFlight = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setStatus("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlight.current) return;
    const validated = validateContact(formData);
    setErrors(validated.errors);
    if (!validated.valid) {
      setStatus("Please check the highlighted fields.");
      window.requestAnimationFrame(() => document.getElementById(`contact-${Object.keys(validated.errors)[0]}`)?.focus());
      return;
    }
    if (!navigator.onLine) {
      setStatus("You appear to be offline. Your message is still here; reconnect or email me.");
      return;
    }
    inFlight.current = true;
    setIsSubmitting(true);
    setStatus("");
    try {
      await submitContact(validated.data);
      if (mounted.current) {
        setStatus("Message saved successfully. Thank you!");
        setFormData(emptyForm);
      }
    } catch (error) {
      if (mounted.current) setStatus(contactErrorMessage(error));
    } finally {
      inFlight.current = false;
      if (mounted.current) setIsSubmitting(false);
    }
  };
  return (
    <section tabIndex={-1} id="contact" className="content-section" aria-labelledby="contact-title">
      <div className="contact-layout">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="section-title">Let’s build something reliable.</h2>
          <p className="section-copy">Have a backend engineering opportunity or want to discuss
            a project? Tell me about the team, the problem, and how I can contribute.</p>
          <div className="action-row">
            <a className="text-link" href={`mailto:${profile.email}`}>Email me ↗</a>
            <a className="text-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn ↗</a>
          </div>
          <p className="case-caption">You can also reach me directly at {profile.email}.</p>
        </div>
        <form onSubmit={handleSubmit} className="surface contact-form" aria-label="Contact form" noValidate aria-busy={isSubmitting}>
          {Object.keys(emptyForm).map((name) => (
            <div key={name} className="form-field">
              <label htmlFor={`contact-${name}`}>{name[0].toUpperCase() + name.slice(1)}</label>
              {name === "message" ? (
                <textarea id="contact-message" name="message" placeholder="Tell me about the opportunity or project"
                  value={formData.message} onChange={handleChange} required maxLength={contactLimits.message}
                  disabled={isSubmitting} aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined} />
              ) : (
                <input id={`contact-${name}`} type={name === "email" ? "email" : "text"} name={name} autoComplete={name}
                  placeholder={name === "email" ? "you@example.com" : "Your name"} value={formData[name]}
                  onChange={handleChange} required maxLength={contactLimits[name]} disabled={isSubmitting}
                  aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `contact-${name}-error` : undefined} />
              )}
              {errors[name] && <p id={`contact-${name}-error`} className="field-error">{errors[name]}</p>}
            </div>
          ))}
          <button type="submit" disabled={isSubmitting} className="primary-action">
            {isSubmitting ? "Saving message…" : "Send message →"}
          </button>
          <p className="case-caption">If the form is unavailable, please use the email link.</p>
          <noscript><p className="field-error">This form needs JavaScript. Please use the email link.</p></noscript>
          <div className="form-status" role="status" aria-live="polite">
            {status && <p>{status}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}

