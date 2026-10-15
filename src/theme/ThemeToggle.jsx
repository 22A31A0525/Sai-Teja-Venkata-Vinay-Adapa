import { useTheme } from "./theme-context";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const light = theme === "light";
  return (
    <button type="button" className="theme-toggle" title={`Current theme: ${theme}`}
      onClick={() => setTheme(light ? "dark" : "light")}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        {light ? <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>}
      </svg>
      {light ? "Use dark theme" : "Use light theme"}
    </button>
  );
}
