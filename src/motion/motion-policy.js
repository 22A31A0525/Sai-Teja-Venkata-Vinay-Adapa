export function effectiveMotionReduction(systemReduced, userReduced) {
  return systemReduced || userReduced;
}
export function readMotionPreference(storage) {
  try { return storage.getItem("portfolio-motion") === "reduced"; }
  catch { return false; }
}
export function saveMotionPreference(storage, reduced) {
  try { storage.setItem("portfolio-motion", reduced ? "reduced" : "full"); }
  catch { /* Motion controls work even when storage is unavailable. */ }
}
