import { renderToString } from "react-dom/server";
import App from "./app/App.jsx";
export function render() { return renderToString(<App />); }
