import { useEffect, useState } from "react";
import "./App.css";
import FirstRender from "./FirstRender";
import MainContent from "./MainContent";
function App() {
  useEffect(() => {
    setInterval(() => {
      set_timer(false);
    }, 1500);
  }, []);

  const [time, set_timer] = useState(true);
  return (
    <>
      {time && <FirstRender name={"animate-wiggle"}/>}

      {!time && <MainContent />}
    </>
  );
}

export default App;
