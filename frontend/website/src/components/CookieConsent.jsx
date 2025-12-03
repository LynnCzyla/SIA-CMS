import { useState } from "react";
import "../components/components-css/Cookie.css";

export default function CookieConsent() {
  const [visible, setVisible] = useState(true);

  const acceptCookies = () => {
    // Optional: store a cookie if you want
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    document.cookie = `cookieAccepted=true; path=/; max-age=${maxAge}; SameSite=Lax`;
    setVisible(false);
  };

  const closePopup = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-popup" role="alert" aria-live="polite">
      <p>
        We use cookies to ensure that we give you the best experience on our website. 
        By continuing to browse our site, you are agreeing to our{" "}
        <a href="/about" className="cookie-link">Privacy Policy</a>.
      </p>
      <div className="cookie-actions">
        <button onClick={closePopup} className="cookie-btn secondary">Settings</button>
        <button onClick={acceptCookies} className="cookie-btn primary">Accept</button>
      </div>
      <button onClick={closePopup} className="cookie-close" aria-label="Close cookie popup">×</button>
    </div>
  );
}
