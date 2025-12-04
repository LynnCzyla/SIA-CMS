import React, { useEffect, useState } from "react";
import "../css/About.css";

function About() {
  const [aboutData, setAboutData] = useState({
    aboutHospital: "",
    mission: "",
    vision: "",
    qualityPolicy: "",
    coreValues: "",
    ourHistory: "",
    privacyPolicy: "",
  });

  // Fetch About info from backend
  useEffect(() => {
    fetch("http://26.41.72.16:5000/api/about")
      .then((res) => res.json())
      .then((data) => {
        setAboutData({
          aboutHospital: data.aboutHospital || "",
          mission: data.mission || "",
          vision: data.vision || "",
          qualityPolicy: data.qualityPolicy || "",
          coreValues: data.coreValues || "",
          ourHistory: data.ourHistory || "",
          privacyPolicy: data.privacyPolicy || "",
        });
      })
      .catch((err) => console.error("Error fetching about info:", err));
  }, []);

  return (
    <div className="page-transition">
      <div className="about-wrapper">
        {/* Header with decorative crosses */}
        <section className="about-header">
          <div className="cross-pattern">
            <div className="cross cross-1"></div>
            <div className="cross cross-2"></div>
            <div className="cross cross-3"></div>
            <div className="cross cross-4"></div>
            <div className="cross cross-5"></div>
            <div className="cross cross-6"></div>
          </div>

          <div className="text-center mb-5">
            <h2 className="title-center mb-5">
              About <span className="title-primary">Us</span>
            </h2>
          </div>
          <div className="logo-container">
            <div className="logo-box">
              <img src="logo1.svg" alt="MediSync Logo" className="logo-img" />
            </div>
          </div>

          <h2 className="brand-name1">
            Medi<span className="brand-primary">Sync</span>
          </h2>
        </section>

        {/* About Section */}
        <section className="about-intro">
          <p className="about-description">{aboutData.aboutHospital}</p>
        </section>

        {/* Mission, Vision, Quality Policy Cards */}
        <section className="cards-section">
          <div className="info-card">
            <h3>Mission</h3>
            <p>{aboutData.mission}</p>
          </div>
          <div className="info-card">
            <h3>Vision</h3>
            <p>{aboutData.vision}</p>
          </div>
          <div className="info-card">
            <h3>Quality Policy</h3>
            <p>{aboutData.qualityPolicy}</p>
          </div>
        </section>

        {/* Core Values with background image */}
        <section className="core-values-section">
          <div className="core-values-overlay">
            <h2 className="section-title">Core Values</h2>
            <div className="core-values-cards">
              <div className="value-card">
                <p>{aboutData.coreValues}</p>
              </div>
              <div className="value-card">
                <p>{aboutData.coreValues}</p>
              </div>
              <div className="value-card">
                <p>{aboutData.coreValues}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our History */}
        <section className="history-section">
          <h2 className="section-title-blue">Our History</h2>
          <p className="history-text">{aboutData.ourHistory}</p>
        </section>

        {/* Privacy Policy */}
        <section className="privacy-section">
          <h2 className="section-title-blue">Privacy Policy</h2>
          <p className="privacy-text">{aboutData.privacyPolicy}</p>
        </section>
      </div>
    </div>
  );
}

export default About;
