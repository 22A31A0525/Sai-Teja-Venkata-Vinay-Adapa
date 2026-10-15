import { motion, useScroll } from "framer-motion";
import { useMotionPreferences } from "./motion-context";
function AnimatedProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}
export default function ScrollProgress() {
  const { effectiveReduced } = useMotionPreferences();
  return effectiveReduced ? null : <AnimatedProgress />;
}
