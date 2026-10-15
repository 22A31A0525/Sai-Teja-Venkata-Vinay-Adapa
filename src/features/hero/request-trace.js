// A small, renderer-independent lifecycle keeps React and the scene in agreement.
export function createRequestTrace({ onPosition, onStage, onState,
  requestFrame = requestAnimationFrame, cancelFrame = cancelAnimationFrame, now = () => performance.now(),
  duration = 2100, lastStage = 3 }) {
  let frame = null;
  let running = false;
  let stage = 0;
  const cancel = () => {
    if (frame !== null) cancelFrame(frame);
    frame = null;
    if (running) { running = false; onState("stopped"); }
  };
  const select = (index) => {
    cancel();
    stage = index;
    onPosition(index);
    onStage(index);
  };
  const complete = () => {
    if (frame !== null) cancelFrame(frame);
    frame = null;
    running = false;
    stage = lastStage;
    onPosition(lastStage);
    onStage(lastStage);
    onState("complete");
  };
  return {
    cancel,
    select,
    completeIfRunning() { if (running) complete(); },
    start(immediate = false) {
      cancel();
      if (immediate) { complete(); return; }
      running = true;
      stage = 0;
      onState("tracing");
      onStage(0);
      onPosition(0);
      const started = now();
      const tick = (time) => {
        if (!running) return;
        const progress = Math.min(Math.max((time - started) / duration, 0), 1) * lastStage;
        if (progress >= lastStage) { complete(); return; }
        const nextStage = Math.floor(progress);
        if (stage !== nextStage) { stage = nextStage; onStage(stage); }
        onPosition(progress);
        frame = requestFrame(tick);
      };
      frame = requestFrame(tick);
    },
  };
}
