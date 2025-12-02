import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "../css/Footer.css";
import Logo from "/src/assets/logo1.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-glow"></div>

      <div className="footer-container">
        {/* TOP FOOTER GRID */}
        <div className="footer-content">
          {/* BRAND */}
          <div className="footer-column footer-brand">
            <div className="brand-header">
              <div className="brand-icon-wrapper">
                <img src={Logo} alt="MediSync Logo" className="brand-logo" />
              </div>
              <h2 className="brand-name">
                <span className="brand-name-primary">Medi</span>
                <span className="brand-name-secondary">Sync</span>
              </h2>
            </div>

            <p className="brand-description">
              Connecting patients with quality healthcare services. Your health,
              our priority.
            </p>

            <div className="social-icons">
              <a className="social-icon"><FaFacebookF /></a>
              <a className="social-icon"><FaTwitter /></a>
              <a className="social-icon"><FaInstagram /></a>
              <a className="social-icon"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* HOME LINKS */}
          <div className="footer-column">
            <h3 className="footer-column-title">Home</h3>
            <ul className="footer-links">
              <li><a className="footer-link">Events</a></li>
              <li><a className="footer-link">Our Doctors</a></li>
              <li><a className="footer-link">Mission & Vision</a></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="footer-column">
            <h3 className="footer-column-title">Services</h3>
            <ul className="footer-links">
              <li><a className="footer-link">Departments</a></li>
              <li><a className="footer-link">Emergency Care</a></li>
              <li><a className="footer-link">Help Center</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="footer-column">
            <h3 className="footer-column-title">Contact Us</h3>

            <ul className="contact-list">
              <li className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <p className="contact-phone">+1 (555) 123-4567</p>
                  <p className="contact-emergency">24/7 Emergency</p>
                </div>
              </li>

              <li className="contact-item">
                <FaEnvelope className="contact-icon" />
                info@medisync.com
              </li>

              <li className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <p>123 Healthcare Ave</p>
                  <p>Medical District, MD 12345</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2025 <span className="footer-brand-highlight">MediSync</span>. All Rights Reserved.
          </p>

          <div className="footer-legal">
            <a className="footer-legal-link">Privacy Policy</a>
            <a className="footer-legal-link">Terms of Service</a>
            <a className="footer-legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
