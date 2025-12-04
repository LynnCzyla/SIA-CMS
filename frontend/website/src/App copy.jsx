// frontend/website/src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import usePageTracker from "./hooks/usePageTracker";

import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import News from "./pages/News";
import ComponentAnnouncement from "./components/ComponentAnnouncement";
import Announcements from "./pages/Announcements";
import Careers from "./pages/Careers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ComponentNews from "./components/ComponentNews";
import ComponentHealth from "./components/ComponentHealth";
import Health from "./pages/Health";

import "./App.css";

function App() {
  // Global layout state
  const [selectedLayout, setSelectedLayout] = useState("classic");

useEffect(() => {
  const fetchLayout = async () => {
    try {
      const res = await axios.get("http://26.41.72.16:5000/api/layout");
      if (res.data.layout) setSelectedLayout(res.data.layout);
    } catch (err) {
      console.error("Failed to fetch layout from backend:", err);
    }
  };
  fetchLayout();
}, []);


  // Apply layout class to <body>
  useEffect(() => {
    document.body.classList.remove("classic", "modern", "compact");
    document.body.classList.add(selectedLayout);
  }, [selectedLayout]);

  return (
    <Router>
      <AppRoutes selectedLayout={selectedLayout} />
    </Router>
  );
}

function AppRoutes({ selectedLayout }) {
  usePageTracker();

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/news" element={<News />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/health" element={<Health />} />

        <Route path="/news/:id" element={<ComponentNews />} />
        <Route path="/announcements/:id" element={<ComponentAnnouncement />} />
        <Route path="/health/:id" element={<ComponentHealth />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
