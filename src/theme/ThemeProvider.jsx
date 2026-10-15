import { useEffect, useState } from "react";
import { requiredChildren } from "../components/prop-validation";
import { ThemeContext } from "./theme-context";
import { normalizeTheme, readThemePreference, saveThemePreference } from "./theme-policy";

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setThemeState(readThemePreference(window.localStorage)); } catch { /* Optional storage. */ }
    setReady(true);
    const sync = (event) => {
      if (event.key === "portfolio-theme" || event.key === null) {
        try { setThemeState(readThemePreference(window.localStorage)); } catch { /* Optional storage. */ }
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    if (ready) document.documentElement.dataset.theme = theme;
  }, [ready, theme]);
  const setTheme = (next) => {
    const value = normalizeTheme(next);
    setThemeState(value);
    try { saveThemePreference(window.localStorage, value); } catch { /* Optional storage. */ }
  };
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
ThemeProvider.propTypes = { children: requiredChildren };
