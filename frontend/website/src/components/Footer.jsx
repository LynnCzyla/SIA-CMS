import React from "react";
import { Link } from "react-router-dom";
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
      {/* TOP FOOTER */}
      <div className="footer-container">
        <div className="footer-content">
          {/* BRAND + SOCIALS */}
          <div className="footer-column footer-brand">
            <img src={Logo} alt="MediSync Logo" className="footer-logo" />
            <h2 className="brand-name">
              <span className="brand-name-primary">Medi</span>
              <span className="brand-name-secondary">Sync</span>
            </h2>
            <p className="brand-description">
              Connecting patients with quality healthcare services. Your health, our priority.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-column">
            <h3 className="footer-column-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/services" className="footer-link">Services</Link></li>
              <li><Link to="/doctors" className="footer-link">Doctors</Link></li>
              <li><Link to="/news" className="footer-link">News</Link></li>
              <li><Link to="/careers" className="footer-link">Careers</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="footer-column">
            <h3 className="footer-column-title">Contact Us</h3>
            <p>We value your feedback and are happy to assist you with inquiries about our hospital services.</p>
            <ul className="contact-list">
              <li className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <p>123 Health Avenue</p>
                  <p>Kapasigan, Pasig City, Philippines</p>
                </div>
              </li>
              <li className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <p>Tel: (+63) 09123456789</p>
                  <p>Admitting Section: +63 900-111-2222</p>
                  <p>Sales & Marketing: +63 900-333-4444</p>
                  <p>Emergency Dept: +63 900-555-6666</p>
                  <p>Outpatient Dept: +63 900-777-8888</p>
                  <p>Radiology Dept (calls only): +63 900-999-0000</p>
                </div>
              </li>
              <li className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <p>info@medisync.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2025 <span className="footer-brand-highlight">MediSync</span>. All Rights Reserved.
          </p>
          <div className="footer-legal">
            <Link to="/about" className="footer-legal-link">Privacy Policy</Link>
            <Link to="/about" className="footer-legal-link">Terms of Service</Link>
            <Link to="/about" className="footer-legal-link">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
