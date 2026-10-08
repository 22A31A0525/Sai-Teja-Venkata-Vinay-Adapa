import { useEffect, useState } from "react";

export default function MotionPreferences() {
  const [paused, setPaused] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSystemReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    try { setPaused(localStorage.getItem("portfolio-motion") === "reduced"); } catch { /* Storage is optional. */ }
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused || systemReduced ? "reduced" : "full";
  }, [paused, systemReduced]);
  return (
    <div className="motion-preferences">
      <button type="button" className="secondary-action" aria-pressed={paused || systemReduced}
        disabled={systemReduced} onClick={() => {
          const next = !paused;
          setPaused(next);
          try { localStorage.setItem("portfolio-motion", next ? "reduced" : "full"); } catch { /* Optional preference. */ }
        }}>{paused || systemReduced ? "Motion reduced" : "Reduce motion"}</button>
      {systemReduced && <span className="case-caption">Following your device preference</span>}
    </div>
  );
}
