import test from "node:test";
import assert from "node:assert/strict";
import { createRequestTrace } from "../src/features/hero/request-trace.js";

function fixture() {
  let sequence = 0;
  const frames = new Map();
  const stages = [];
  const states = [];
  const positions = [];
  const trace = createRequestTrace({
    now: () => 0,
    requestFrame(callback) { frames.set(++sequence, callback); return sequence; },
    cancelFrame(id) { frames.delete(id); },
    onStage: (stage) => stages.push(stage),
    onState: (state) => states.push(state),
    onPosition: (position) => positions.push(position),
  });
  const tick = (time) => {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach((callback) => callback(time));
  };
  return { trace, stages, states, positions, frames, tick };
}
test("trace reports each stage as the packet arrives, then announces completion once", () => {
  const f = fixture();
  f.trace.start();
  assert.deepEqual(f.stages, [0]);
  f.tick(350);
  assert.deepEqual(f.stages, [0]);
  f.tick(700); f.tick(1400); f.tick(2100);
  assert.deepEqual(f.stages, [0, 1, 2, 3]);
  assert.deepEqual(f.states, ["tracing", "complete"]);
  assert.equal(f.positions.at(-1), 3);
  assert.equal(f.frames.size, 0);
});
test("manual layer selection cancels tracing and cannot be overwritten by a later frame", () => {
  const f = fixture();
  f.trace.start(); f.tick(700); f.trace.select(0); f.tick(2100);
  assert.equal(f.stages.at(-1), 0);
  assert.deepEqual(f.states, ["tracing", "stopped"]);
  assert.equal(f.frames.size, 0);
});
test("reduced motion reaches the result without scheduling animation", () => {
  const f = fixture();
  f.trace.start(true);
  assert.deepEqual(f.stages, [3]);
  assert.deepEqual(f.states, ["complete"]);
  assert.equal(f.frames.size, 0);
});
test("enabling reduced motion during a trace finishes it immediately", () => {
  const f = fixture();
  f.trace.start(); f.tick(700); f.trace.completeIfRunning(); f.tick(2100);
  assert.equal(f.stages.at(-1), 3);
  assert.deepEqual(f.states, ["tracing", "complete"]);
  assert.equal(f.frames.size, 0);
});
test("offscreen or disposal cancellation leaves no animation callbacks", () => {
  const f = fixture();
  f.trace.start(); f.trace.cancel(); f.trace.cancel(); f.tick(2100);
  assert.equal(f.frames.size, 0);
  assert.deepEqual(f.states, ["tracing", "stopped"]);
});

test("the full journey returns to the application after four seconds", () => {
  let time = 0;
  let callback;
  const stages = [];
  const states = [];
  const trace = createRequestTrace({ duration: 4000, lastStage: 4,
    now: () => time, requestFrame: fn => { callback = fn; return 1; }, cancelFrame: () => { callback = null; },
    onPosition: () => {}, onStage: stage => stages.push(stage), onState: state => states.push(state),
  });
  trace.start();
  for (time = 1000; time <= 4000; time += 1000) callback(time);
  assert.deepEqual(stages, [0, 1, 2, 3, 4]);
  assert.deepEqual(states, ["tracing", "complete"]);
});

test("studio journey distinguishes validation and service execution before the return path", () => {
  let callback;
  const stages = [];
  const states = [];
  const trace = createRequestTrace({ duration: 4800, lastStage: 5,
    now: () => 0, requestFrame: fn => { callback = fn; return 1; }, cancelFrame: () => { callback = null; },
    onPosition: () => {}, onStage: stage => stages.push(stage), onState: state => states.push(state),
  });
  trace.start();
  for (let time = 960; time <= 4800; time += 960) callback(time);
  assert.deepEqual(stages, [0, 1, 2, 3, 4, 5]);
  assert.deepEqual(states, ["tracing", "complete"]);
  trace.start(true);
  assert.equal(stages.at(-1), 5);
  assert.equal(callback, null);
});
