// frontend/website/src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import UsePageTracker from "./hooks/usePageTracker"; // ✅ Fixed casing

import Home from "./pages/Home";  // ← Make sure you import Home!
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
import "./App.css";

function App() {
  return (
    <Router>
      <UsePageTracker /> {/* ✅ Fixed casing */}
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
        <Route path="/news" element={<News />} />
        <Route path="/announcements/:slug" element={<ComponentAnnouncement />} />
        <Route path="/health/:slug" element={<ComponentHealth />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
