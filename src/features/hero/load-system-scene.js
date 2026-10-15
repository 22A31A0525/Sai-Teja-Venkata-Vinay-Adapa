let pending;

// Start early without adding Three.js to the blocking application bundle.
export function loadSystemScene() {
  if (!pending) {
    pending = import("./system-scene").catch(error => {
      pending = undefined;
      throw error;
    });
  }
  return pending;
}
