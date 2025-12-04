// frontend/website/src/hooks/usePageTracker.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTracker() {
  const location = useLocation();

  useEffect(() => {
    fetch("http://26.41.72.16:5000/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: location.pathname }),
    });
  }, [location]);
}


