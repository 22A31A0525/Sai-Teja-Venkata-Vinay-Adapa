import { useEffect, useRef, useState } from "react";
import { navigation } from "../../content/portfolio";
import ResumeLink from "../ResumeLink";
import ScrollProgress from "../../motion/ScrollProgress";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButton = useRef(null);
  const navigationRoot = useRef(null);
  const closeNavigation = () => setIsMenuOpen(false);
  const navigate = (id) => {
    closeNavigation();
    document.getElementById(id)?.focus({ preventScroll: true });
  };
  useEffect(() => {
    const sections = ["home", "experience", "portfolio", "case-studies", "skills", "about", "contact"]
      .map((id) => document.getElementById(id)).filter(Boolean);
    let frame;
    const update = () => {
      frame = null;
      const boundary = Math.min(window.innerHeight * 0.3, 240);
      const current = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= boundary) || sections[0];
      if (current) setActiveSection(current.id === "case-studies" ? "portfolio" : current.id);
    };
    const schedule = () => { if (frame == null) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (isMenuOpen) { setIsMenuOpen(false); menuButton.current?.focus(); }
    };
    const breakpoint = window.matchMedia("(min-width: 901px)");
    const onResize = () => setIsMenuOpen(false);
    const onOutside = (event) => {
      if (isMenuOpen && !navigationRoot.current?.contains(event.target)) setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    breakpoint.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
      breakpoint.removeEventListener("change", onResize);
    };
  }, [isMenuOpen]);
  return (
    <header className="site-header">
      <nav ref={navigationRoot} className="site-nav" aria-label="Main navigation">
        <a className="site-brand" href="#home" aria-current={activeSection === "home" ? "location" : undefined} onClick={() => navigate("home")}>
          <span className="brand-mark" aria-hidden="true">ST<span>.</span></span>
          <span>Sai Teja <span className="brand-family">Adapa</span></span>
        </a>
        <button ref={menuButton} className="menu-toggle" type="button" aria-expanded={isMenuOpen}
          aria-controls="site-links" onClick={() => setIsMenuOpen((open) => !open)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {isMenuOpen ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
          {isMenuOpen ? "Close menu" : "Menu"}
        </button>
        <div id="site-links" className={`site-links ${isMenuOpen ? "is-open" : ""}`}>
          {navigation.map((link) => (
            <a key={link.id} href={`#${link.id}`} aria-current={activeSection === link.id ? "location" : undefined}
              onClick={() => navigate(link.id)}>{link.label}</a>
          ))}
          <ResumeLink className="resume-link" onClick={closeNavigation} />
        </div>
      </nav>
      <ScrollProgress />
    </header>
  );
}
