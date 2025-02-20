import { useEffect, useState } from "react";
import "./App.css";
import FirstRender from "./FirstRender";
import MainContent from "./MainContent";
function App() {
  useEffect(() => {
    setInterval(() => {
      set_timer(false);
    }, 6500);
  }, []);

  const [time, set_timer] = useState(true);
  return (
    <>
      {time && <FirstRender />}

      {!time && <MainContent />}
    </>
  );
}

export default App;
