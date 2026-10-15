import MotionProvider from "../motion/MotionProvider";
import PortfolioPage from "./PortfolioPage";
import ThemeProvider from "../theme/ThemeProvider";
export default function App() {
  return <ThemeProvider><MotionProvider><PortfolioPage /></MotionProvider></ThemeProvider>;
}
