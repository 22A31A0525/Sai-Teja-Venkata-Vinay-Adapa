import { useEffect, useRef, useState } from "react";
import { useMotionPreferences } from "../../motion/motion-context";
import { useTheme } from "../../theme/theme-context";
import { loadSystemScene } from "./load-system-scene";

const steps = [
  { name: "Receive", detail: "An API endpoint receives the request.", tag: "HTTP request" },
  { name: "Validate", detail: "Check identity, permissions, and input.", tag: "API boundary" },
  { name: "Execute", detail: "The service applies business rules.", tag: "Service layer" },
  { name: "Persist", detail: "Read or write the required records.", tag: "Data access" },
  { name: "Respond", detail: "Return a structured result and HTTP status.", tag: "JSON response" },
  { name: "Complete", detail: "Request processed. Result returned to the user.", tag: "Round trip complete" },
];
export default function SystemScene() {
  const host = useRef(null);
  const engine = useRef(null);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState(1);
  const [step, setStep] = useState(2);
  const [state, setState] = useState("idle");
  const { effectiveReduced } = useMotionPreferences();
  const { theme } = useTheme();
  const preferences = useRef({ theme, effectiveReduced });
  useEffect(() => {
    preferences.current = { theme, effectiveReduced };
    engine.current?.setTheme(theme);
    engine.current?.setReduced(effectiveReduced);
  }, [theme, effectiveReduced]);
  useEffect(() => {
    let disposed = false;
    let scene;
    let revealFrame;
    const element = host.current;
    const load = async () => {
      if (navigator.connection?.saveData) return;
      try {
        const started = performance.now();
        const { createSystemScene } = await loadSystemScene();
        if (disposed) return;
        const imported = performance.now();
        scene = createSystemScene(element, () => setReady(false), setSelected, setState, setStep);
        engine.current = scene;
        scene.setTheme(preferences.current.theme);
        scene.setReduced(preferences.current.effectiveReduced);
        scene.setVisible(!document.hidden && element.getBoundingClientRect().top < innerHeight && element.getBoundingClientRect().bottom > 0);
        // Reveal a completed frame, rather than a partially initialized canvas.
        revealFrame = requestAnimationFrame(() => { if (!disposed) setReady(true); });
        element.dataset.loadMs = String(Math.round(imported - started));
        element.dataset.setupMs = String(Math.round(performance.now() - imported));
      } catch { if (!disposed) setReady(false); }
    };
    load();
    const observer = new IntersectionObserver(([entry]) => scene?.setVisible(entry.isIntersecting && !document.hidden));
    observer.observe(element);
    const visibility = () => scene?.setVisible(!document.hidden && element.getBoundingClientRect().bottom > 0 && element.getBoundingClientRect().top < innerHeight);
    document.addEventListener("visibilitychange", visibility);
    return () => { disposed = true; cancelAnimationFrame(revealFrame); observer.disconnect(); document.removeEventListener("visibilitychange", visibility); scene?.dispose(); engine.current = null; };
  }, []);
  const run = () => {
    if (state === "tracing") { engine.current?.pause(); return; }
    if (ready) engine.current?.trace();
    else { setSelected(0); setStep(5); setState("complete"); }
  };
  return (
    <aside id="backend-journey" className="backend-journey backend-showcase" aria-label="Interactive backend request journey">
      <div className="journey-heading"><p className="eyebrow">Backend flow</p></div>
      <h2 className="scene-title">From request to response</h2>
      <div ref={host} className="scene-viewport journey-viewport" data-ready={ready}>
        <div className="journey-signal signal-in" aria-hidden="true">HTTP request</div>
        <div className="journey-signal signal-out" aria-hidden="true">JSON response</div>
        <div className="journey-static" aria-hidden="true">
          <div className="static-client"><span /><span /><span /><i /></div>
          <div className="static-server"><i /><i /><i /></div>
          <div className="static-database"><i /><i /><i /></div>
          <div className="static-route" />
        </div>
        <div className="journey-labels" aria-label="Architecture components">
          {["Client", "Backend service", "Database"].map((name, index) => <span key={name} className={`journey-label label-${index}`} data-active={selected === index}>{name}</span>)}
        </div>
      </div>
      <div className="journey-inspector">
        <nav className="journey-flow" aria-label="Explore backend responsibilities">{steps.slice(0, 5).map((stage, index) => <button key={stage.name} type="button" aria-pressed={step === index || (step === 5 && index === 4)} onClick={() => { engine.current?.inspectStep(index); setStep(index); setSelected([0, 1, 1, 2, 1][index]); setState("inspecting"); }}>{stage.name}</button>)}</nav>
        <div className="journey-explanation"><span className="journey-step">{steps[step].tag}</span><p>{steps[step].detail}</p></div>
        <div className="journey-bottom"><button type="button" className="secondary-action" onClick={run}>{state === "tracing" ? "Pause" : state === "complete" || state === "stopped" ? "Replay" : "Run request"}</button><span className="journey-result" role="status">{state === "complete" ? "Response returned" : state === "stopped" ? "Paused" : ""}</span><a className="text-link" href="#career-nexus-case-study">Backend case study</a></div>
      </div>
      <p className="case-caption">Illustrative request flow</p>
    </aside>
  );
}
