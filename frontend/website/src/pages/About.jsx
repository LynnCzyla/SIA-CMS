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
    fetch("http://localhost:5000/api/about")
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
      {/* --- About Section --- */}
      <section className="about-intro">
        <h2 className="title-center mb-4">
          About <span className="title-primary">Us</span>
        </h2>
        <div className="about-container">
          <div className="about-image">
            <img src="logo1.svg" alt="Hospital Hallway" />
          </div>
          <div className="about-text">
            <h2 className="about-title1 justify-content-center align-content-center d-flex">
              Medi <span className="title-primary1">Sync</span>
            </h2>
            <p>{aboutData.aboutHospital}</p>
          </div>
        </div>
      </section>

      {/* --- Mission, Vision, Quality Policy --- */}
      <section className="about-trio">
        <div className="trio-card">
          <h2>Mission</h2>
          <p>{aboutData.mission}</p>
        </div>
        <div className="trio-card">
          <h2>Vision</h2>
          <p>{aboutData.vision}</p>
        </div>
        <div className="trio-card">
          <h2>Quality Policy</h2>
          <p>{aboutData.qualityPolicy}</p>
        </div>
      </section>

      {/* --- Core Values --- */}
      <section className="about-core">
        <h2>Core Values</h2>
        <div className="core-content">
          <div className="core-card">
            <p>{aboutData.coreValues}</p>
          </div>
        </div>
      </section>

      {/* --- History Section --- */}
      <section className="about-history">
        <h2>Our History</h2>
        <p>{aboutData.ourHistory}</p>
      </section>

      {/* --- Privacy Policy --- */}
      <section className="about-privacy">
        <h2>Privacy Policy</h2>
        <p>{aboutData.privacyPolicy}</p>
      </section>
    </div>
    </div>

  );
}

export default About;
