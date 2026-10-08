import { useEffect, useRef, useState } from "react";
import { navigation, resumeUrl } from "../../content/portfolio";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButton = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: "-15% 0px -65% 0px" });
    for (const id of ["home", ...navigation.map((link) => link.id)]) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") { setIsMenuOpen(false); menuButton.current?.focus(); }
    };
    const breakpoint = window.matchMedia("(min-width: 768px)");
    const onResize = () => { if (breakpoint.matches) setIsMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    breakpoint.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      breakpoint.removeEventListener("change", onResize);
    };
  }, [isMenuOpen]);
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="site-brand" href="#home" onClick={() => setIsMenuOpen(false)}>Sai Teja <span className="brand-family">Adapa</span></a>
        <button ref={menuButton} className="menu-toggle" type="button" aria-expanded={isMenuOpen}
          aria-controls="site-links" onClick={() => setIsMenuOpen((open) => !open)}>
          {isMenuOpen ? "Close menu" : "Menu"}
        </button>
        <div id="site-links" className={`site-links ${isMenuOpen ? "is-open" : ""}`}>
          {navigation.map((link) => (
            <a key={link.id} href={`#${link.id}`} aria-current={activeSection === link.id ? "location" : undefined}
              onClick={() => {
                setIsMenuOpen(false);
                document.getElementById(link.id)?.focus({ preventScroll: true });
              }}>{link.label}</a>
          ))}
          <a className="resume-link" href={resumeUrl} target="_blank" rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}>View résumé ↗</a>
        </div>
      </nav>
    </header>
  );
}
