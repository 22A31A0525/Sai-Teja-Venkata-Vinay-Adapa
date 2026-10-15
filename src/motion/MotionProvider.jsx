import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { MotionContext } from "./motion-context";
import { requiredChildren } from "../components/prop-validation";
import { effectiveMotionReduction, readMotionPreference, saveMotionPreference } from "./motion-policy";

export default function MotionProvider({ children }) {
  // Server and first client render agree; content is visible before preferences load.
  const [systemReduced, setSystemReduced] = useState(false);
  const [userReduced, setUserReducedState] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSystemReduced(media.matches);
    sync();
    try { setUserReducedState(readMotionPreference(window.localStorage)); } catch { /* Optional storage. */ }
    setReady(true);
    media.addEventListener("change", sync);
    const syncStorage = (event) => {
      if (event.key === "portfolio-motion" || event.key === null) {
        try { setUserReducedState(readMotionPreference(window.localStorage)); } catch { /* Optional storage. */ }
      }
    };
    window.addEventListener("storage", syncStorage);
    return () => { media.removeEventListener("change", sync); window.removeEventListener("storage", syncStorage); };
  }, []);
  const effectiveReduced = !ready || effectiveMotionReduction(systemReduced, userReduced);
  useEffect(() => {
    document.documentElement.dataset.motion = effectiveReduced ? "reduced" : "full";
  }, [effectiveReduced]);
  const setUserReduced = (value) => {
    setUserReducedState(value);
    try { saveMotionPreference(window.localStorage, value); } catch { /* Optional storage. */ }
  };
  return (
    <MotionContext.Provider value={{ systemReduced, userReduced, effectiveReduced, setUserReduced }}>
      <MotionConfig reducedMotion={effectiveReduced ? "always" : "never"}>{children}</MotionConfig>
    </MotionContext.Provider>
  );
}
MotionProvider.propTypes = { children: requiredChildren };
