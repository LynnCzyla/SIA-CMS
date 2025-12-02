import { useState, useEffect } from "react";
import "../components/components-css/LoadingScreen.css";

import loadingGif from "../assets/loading.gif";

const LoadingScreen = ({ onFinished }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out animation BEFORE removing component
    const timer = setTimeout(() => {
      setFadeOut(true);

      // Wait for fade-out animation then remove it
      setTimeout(() => {
        if (onFinished) onFinished();
      }, 1000); // matches CSS fade duration
    }, 5000); // SHOW FOR 5s (edit this anytime)

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className={`loading-overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="loading-content">
        <img src={loadingGif} alt="Loading..." className="loading-gif" />
      </div>
    </div>
  );
};

export default LoadingScreen;
