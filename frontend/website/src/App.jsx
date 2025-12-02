// frontend/website/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import UsePageTracker from "./hooks/usePageTracker";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import News from "./pages/News";
import Announcements from "./pages/Announcements";
import Careers from "./pages/Careers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Health from "./pages/Health";

import ComponentNews from "./components/ComponentNews";
import ComponentAnnouncement from "./components/ComponentAnnouncement";
import ComponentHealth from "./components/ComponentHealth";
import ComponentCareer from "./components/ComponentCareers";
import ComponentServices from "./components/ComponentServices";

import Chatbot from "./components/Chatbot"; // ✅ Chatbot added
import "./App.css";

// SECURITY RECOMMENDATIONS APPLIED:
// - axios default timeout
// - baseURL using environment variable
// - global error logging
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
axios.defaults.timeout = 10000;
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);


function App() {

  
useEffect(() => {
    const fetchFont = async () => {
      try {
        const res = await axios.get("/api/layout");
        if (res.data.fontFamily) {
          const font = res.data.fontFamily;
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = `https://fonts.googleapis.com/css2?family=${font.replace(" ", "+")}:wght@400;500;700&display=swap`;
          document.head.appendChild(link);
          document.body.style.fontFamily = font;
        }
      } catch (err) {
        console.error("Failed to fetch global font", err);
      }
    };
    fetchFont();
  }, []);

  return (
    <Router>
      <UsePageTracker />
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/news" element={<News />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:id" element={<ComponentCareer />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/health" element={<Health />} />

        <Route path="/news/:slug" element={<ComponentNews />} />
        <Route path="/announcements/:slug" element={<ComponentAnnouncement />} />
        <Route path="/health/:slug" element={<ComponentHealth />} />
        <Route path="/services/:slug" element={<ComponentServices />} />
      </Routes>

      {/* Chatbot always visible on all pages */}
      <Chatbot />

      <Footer />
    </Router>
  );
}

export default App;
