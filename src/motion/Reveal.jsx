import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { useMotionPreferences } from "./motion-context";
import { requiredChildren } from "../components/prop-validation";

export default function Reveal({ children, ...props }) {
  const ref = useRef(null);
  const played = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const controls = useAnimationControls();
  const { effectiveReduced } = useMotionPreferences();
  useEffect(() => {
    if (effectiveReduced) {
      controls.stop();
      controls.set({ opacity: 1, y: 0 });
      return;
    }
    if (!inView || played.current) return;
    played.current = true;
    let fragment;
    try { fragment = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); } catch { /* Invalid fragment encoding. */ }
    if (fragment && ref.current?.contains(fragment)) return;
    ref.current.dataset.revealed = "true";
    controls.start({ opacity: [0.65, 1], y: [12, 0], transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } });
  }, [controls, effectiveReduced, inView]);
  return <motion.section ref={ref} initial={false} animate={controls} {...props}>{children}</motion.section>;
}
Reveal.propTypes = { children: requiredChildren };
