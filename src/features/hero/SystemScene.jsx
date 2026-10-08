import { useEffect, useRef, useState } from "react";

const stages = [
  { name: "Client", detail: "A user action starts a request from the application interface." },
  { name: "API", detail: "An endpoint receives the request and applies authentication and validation." },
  { name: "Service", detail: "Application logic coordinates the operation and prepares a response." },
  { name: "Database", detail: "Persistent records support the application’s data workflows." },
];

export default function SystemScene() {
  const host = useRef(null);
  const engine = useRef(null);
  const selectedLayer = useRef(0);
  const [selected, setSelected] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches && !navigator.connection?.saveData) setEnabled(true);
  }, []);
  useEffect(() => {
    if (!enabled) return;
    let disposed = false;
    let scene;
    const element = host.current;
    const load = async () => {
      try {
        const { createSystemScene } = await import("./system-scene");
        if (disposed) return;
        scene = createSystemScene(element, () => { setUnavailable(true); setReady(false); });
        engine.current = scene;
        scene.select(selectedLayer.current);
        scene.setReduced(document.documentElement.dataset.motion === "reduced");
        setReady(true);
      } catch { if (!disposed) setUnavailable(true); }
    };
    load();
    const visibility = new IntersectionObserver(([entry]) => scene?.setVisible(entry.isIntersecting && !document.hidden));
    visibility.observe(element);
    const pageVisibility = () => scene?.setVisible(!document.hidden && element.getBoundingClientRect().bottom > 0 && element.getBoundingClientRect().top < innerHeight);
    document.addEventListener("visibilitychange", pageVisibility);
    const preference = new MutationObserver(() => scene?.setReduced(document.documentElement.dataset.motion === "reduced"));
    preference.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
    return () => {
      disposed = true;
      visibility.disconnect(); preference.disconnect();
      document.removeEventListener("visibilitychange", pageVisibility);
      scene?.dispose(); engine.current = null;
    };
  }, [enabled]);

  return (
    <aside className="surface system-scene" aria-label="Interactive backend request flow">
      <p className="eyebrow">A request through the system</p>
      <div ref={host} className="scene-viewport" data-ready={ready && !unavailable}>
        <div className="scene-fallback" aria-hidden="true">
          {stages.map((stage, index) => <div key={stage.name} className={`fallback-node node-${index}`}>{stage.name}</div>)}
        </div>
      </div>
      <div className="scene-stages" aria-label="Select a system layer">{stages.map((stage, index) => (
        <button key={stage.name} type="button" aria-pressed={selected === index} onClick={() => { selectedLayer.current = index; setSelected(index); engine.current?.select(index); }}>{stage.name}</button>
      ))}</div>
      <p className="scene-description" role="status">{stages[selected].detail}</p>
      <div className="scene-controls">
        {!enabled && !unavailable && <button type="button" className="text-link" onClick={() => setEnabled(true)}>Enable 3D view</button>}
        {ready && !unavailable && <>
          <button type="button" className="text-link" onClick={() => { selectedLayer.current = 3; engine.current?.trace(); setSelected(3); }}>Trace request →</button>
          <button type="button" className="text-link" onClick={() => engine.current?.reset()}>Reset view</button>
        </>}
      </div>
      <p className="case-caption">Conceptual architecture · explore the project case studies for actual implementations.</p>
    </aside>
  );
}
