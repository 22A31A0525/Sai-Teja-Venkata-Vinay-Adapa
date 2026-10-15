export const normalizeTheme = (value) => value === "light" ? "light" : "dark";
export function readThemePreference(storage) {
  try { return normalizeTheme(storage.getItem("portfolio-theme")); }
  catch { return "dark"; }
}
export function saveThemePreference(storage, theme) {
  try { storage.setItem("portfolio-theme", normalizeTheme(theme)); }
  catch { /* Switching themes works without persistent storage. */ }
}
