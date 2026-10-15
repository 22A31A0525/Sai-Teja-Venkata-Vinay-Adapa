import { useMotionPreferences } from "./motion-context";

export default function MotionPreferences() {
  const { systemReduced, userReduced, setUserReduced } = useMotionPreferences();
  return (
    <button type="button" className="motion-toggle" aria-pressed={systemReduced || userReduced}
      disabled={systemReduced} title={systemReduced ? "Following your device's reduced-motion preference" : "Control decorative animation"}
      onClick={() => setUserReduced(!userReduced)}>
      <span className="motion-dot" aria-hidden="true" />
      {systemReduced ? "Device: reduced motion" : userReduced ? "Motion reduced" : "Reduce motion"}
    </button>
  );
}
