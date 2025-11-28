import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { IoMdArrowDropdown } from "react-icons/io";
import "boxicons/css/boxicons.min.css";
import Logo from "/src/assets/logo1.svg";
import AppointmentModal from "../pages/AppointmentModal"; // Import modal

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const location = useLocation();
  const navigate = useNavigate();

  const isNewsActive =
    location.pathname.startsWith("/news") ||
    location.pathname.startsWith("/announcements") ||
    location.pathname.startsWith("/health");

  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
    setMenuOpen(false);
  };

  return (
    <div className="sticky-header">
      {/* Top Bar */}
      <div className="top-bar">
        For emergency concerns, please call our ER at 000-000-0000 or mobile at
        000-000-0000
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <NavLink to="/" className="brand" onClick={(e) => handleNavClick(e, "/")}>
          <img src={Logo} alt="MediSync Logo" className="brand-logo" />
          <span className="brand-name">
            <span className="brand-text">Medi</span>
            <span className="brand-text2">Sync</span>
          </span>
        </NavLink>

        <button
          className="hamburger d-lg-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {/* Nav Links */}
          <li>
            <NavLink to="/" end onClick={(e) => handleNavClick(e, "/")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" onClick={(e) => handleNavClick(e, "/services")}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctors" onClick={(e) => handleNavClick(e, "/doctors")}>
              Doctors
            </NavLink>
          </li>

          {/* Dropdown */}
          <li className={`dropdown ${isNewsActive ? "active" : ""}`}>
            <span>
              Updates <IoMdArrowDropdown />
            </span>
            <div className="dropdown-content">
              <NavLink to="/announcements" onClick={(e) => handleNavClick(e, "/announcements")}>
                Announcements
              </NavLink>
              <NavLink to="/news" onClick={(e) => handleNavClick(e, "/news")}>
                Latest News
              </NavLink>
              <NavLink to="/health" onClick={(e) => handleNavClick(e, "/health")}>
                Health Tips
              </NavLink>
            </div>
          </li>

          <li>
            <NavLink to="/careers" onClick={(e) => handleNavClick(e, "/careers")}>
              Careers
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={(e) => handleNavClick(e, "/about")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={(e) => handleNavClick(e, "/contact")}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Book Appointment Button */}
        <button className="book-btn" onClick={() => setModalOpen(true)}>
          Book an Appointment
        </button>
      </nav>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default Navbar;
