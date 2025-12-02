// frontend/website/src/pages/Doctors.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaStethoscope,
  FaHospital,
} from "react-icons/fa";
import defaultProfile from "../../public/default-doctors-profile.svg";
import "../css/Doctors.css";

function Doctors() {
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [displayedDoctors, setDisplayedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 8;

  const [formData, setFormData] = useState({
    surname: "",
    firstname: "",
    specialization: "",
    schedule: "",
    meridiem: "",
  });

  const [selectedLetter, setSelectedLetter] = useState("");
  const [alphabetStartIndex, setAlphabetStartIndex] = useState(0);
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch doctors
  useEffect(() => {
    async function loadDoctors() {
      setLoading(true);
      try {
        const res = await fetch(
          "http://localhost:5000/api/doctors/visible-full"
        );
        const doctors = await res.json();

        const formatted = doctors.map((emp) => ({
          id: emp.employeeID,
          name: `${emp.firstName} ${emp.lastName}`.trim(),
          firstName: emp.firstName,
          lastName: emp.lastName,
          spec: emp.position || "General Practitioner",
          department: emp.departmentname || "General Medicine",      
          contactNumber: emp.Number || "Not available",           
          email: emp.Email || "Not available",                     
          schedule: emp.schedule || "Not specified",                 
          img: emp.profile_image || defaultProfile,
        }));

        setAllDoctors(formatted);
        setFilteredDoctors(formatted);
        updatePage(1, formatted);
      } catch (err) {
        console.error("Failed to load doctors:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDoctors();
  }, []);

  const updatePage = (page, list = filteredDoctors) => {
    const start = (page - 1) * doctorsPerPage;
    const end = start + doctorsPerPage;
    setDisplayedDoctors(list.slice(start, end));
    setCurrentPage(page);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let results = allDoctors;

    // Surname
    if (formData.surname) {
      results = results.filter((d) =>
        d.lastName.toLowerCase().includes(formData.surname.toLowerCase())
      );
    }

    // Firstname
    if (formData.firstname) {
      results = results.filter((d) =>
        d.firstName.toLowerCase().includes(formData.firstname.toLowerCase())
      );
    }

    // Specialization
    if (formData.specialization) {
      results = results.filter((d) => d.spec === formData.specialization);
    }

    // Schedule (Day)
    if (formData.schedule) {
      results = results.filter((d) =>
        d.schedule.toLowerCase().includes(formData.schedule.toLowerCase())
      );
    }

    // Time (AM/PM)
    if (formData.meridiem) {
      results = results.filter((d) =>
        d.schedule.toUpperCase().includes(formData.meridiem)
      );
    }

    // Alphabet filter
    if (selectedLetter) {
      results = results.filter((d) =>
        d.lastName.toUpperCase().startsWith(selectedLetter)
      );
    }

    setFilteredDoctors(results);
    updatePage(1, results);
  };

  const handleClear = () => {
    setFormData({
      surname: "",
      firstname: "",
      specialization: "",
      schedule: "",
      meridiem: "",
    });
    setSelectedLetter("");
    setFilteredDoctors(allDoctors);
    updatePage(1, allDoctors);
  };

  const handlePrev = () => {
    if (alphabetStartIndex > 0) setAlphabetStartIndex(alphabetStartIndex - 1);
  };

  const handleNext = () => {
    if (alphabetStartIndex < alphabet.length - 8)
      setAlphabetStartIndex(alphabetStartIndex + 1);
  };

  const handleLetterClick = (letter) => {
    if (selectedLetter === letter) {
      setSelectedLetter("");
      setFilteredDoctors(allDoctors);
      updatePage(1, allDoctors);
    } else {
      setSelectedLetter(letter);
      const filtered = allDoctors.filter((d) =>
        d.lastName.toUpperCase().startsWith(letter)
      );
      setFilteredDoctors(filtered);
      updatePage(1, filtered);
    }
  };

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const specializations = [...new Set(allDoctors.map((d) => d.spec))].sort();
  const visibleLetters = alphabet.slice(
    alphabetStartIndex,
    alphabetStartIndex + 8
  );

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) updatePage(page);
  };

  return (
    <div className="page-transition">
    <section className="doctors-page">
      {/* Header */}
      <div className="doctors-header text-center">
        <h2>
          Meet Our <span className="highlight">Doctors</span>
        </h2>
        <p>WE ARE DEDICATED TO YOUR WELL-BEING</p>
        <img
          src="/our_doctors.svg"
          alt="Our Doctors"
          className="doctors-image"
        />
      </div>

      {/* Search Filters — SCHEDULE & TIME ARE BACK */}
      <div className="d-flex justify-content-center mt-4">
        <div className="search-container shadow-sm p-4 mb-4">
          <form
            className="row g-3 justify-content-center"
            onSubmit={handleSearch}
          >
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Doctor's Surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Doctor's Firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
              >
                <option value="">Specialization</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Schedule Dropdown */}
            <div className="col-md-4">
              <select
                className="form-select"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
              >
                <option value="">Schedule</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </div>

            {/* Time (AM/PM) Dropdown */}
            <div className="col-md-4">
              <select
                className="form-select"
                name="meridiem"
                value={formData.meridiem}
                onChange={handleChange}
              >
                <option value="">Time</option>
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="col-md-4 d-flex justify-content-between align-items-center gap-1">
              <button
                type="button"
                className="btn btn-light btn-cancel px-4"
                onClick={handleClear}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-search">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Alphabet Bar */}
      <div className="col-md-12 text-center alphabet-bar d-flex align-items-center justify-content-center mb-4">
        <button
          className="alphabet-arrow"
          onClick={handlePrev}
          disabled={alphabetStartIndex === 0}
        >
          <FaChevronLeft />
        </button>
        <div className="alphabet-scroll d-flex justify-content-center mx-2">
          {visibleLetters.map((letter) => (
            <button
              key={letter}
              className={`alphabet-btn ${
                selectedLetter === letter ? "active" : ""
              }`}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <button
          className="alphabet-arrow"
          onClick={handleNext}
          disabled={alphabetStartIndex >= alphabet.length - 8}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Loading / No Results / Doctors Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="no-results mt-5 text-center">
          <img
            src="/no_data_found.svg"
            alt="No Results"
            className="no-results-img"
          />
          <h4 className="fw-semibold mt-4">
            We couldn’t find a doctor matching your search.
          </h4>
          <p className="text-muted mt-2">
            Please try adjusting your filters, or contact us directly for
            personalized assistance.
          </p>
        </div>
      ) : (
        <div className="container doctors-list-section mt-5">
          <div className="row g-4">
            {displayedDoctors.map((doctor) => (
              <div key={doctor.id} className="col-md-3 col-sm-6">
                <div
                  className="doctor-card text-center shadow-sm cursor-pointer"
                  onClick={() => openModal(doctor)}
                >
                  <img
                    src={doctor.img}
                    alt={doctor.name}
                    className="doctor-img"
                  />
                  <h5 className="mt-3 mb-1">{doctor.name}</h5>
                  <p className="text-muted">{doctor.spec}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="pagination-container mt-5">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => goToPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      )}

      {/* ===== DOCTOR MODAL ===== */}
      {showModal && selectedDoctor && (
        <div
          className="doctor-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="doctor-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="heartbeat-line"></div>
              <div className="modal-logo">
                <span className="logo-text">MediSync</span>
                <span className="logo-sub">Licensed Doctor</span>
              </div>
            </div>

            <div className="modal-body">
              <div className="row align-items-center">
                <div className="col-md-4 text-center">
                  <div className="doctor-photo-large">
                    <img src={selectedDoctor.img} alt={selectedDoctor.name} />
                  </div>
                </div>
                <div className="col-md-8">
                  <h3 className="doctor-name">{selectedDoctor.name}</h3>
                  <p className="doctor-specialization">{selectedDoctor.spec}</p>

                  <div className="doctor-details">
                    <div className="detail-item">
                      <FaHospital className="detail-icon" />
                      <span>{selectedDoctor.department}</span>
                    </div>
                    <div className="detail-item">
                      <FaPhone className="detail-icon" />
                      <span>{selectedDoctor.contactNumber}</span>
                    </div>
                    <div className="detail-item">
                      <FaEnvelope className="detail-icon" />
                      <span>{selectedDoctor.email}</span>
                    </div>
                    <div className="detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <span>{selectedDoctor.schedule}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
    </div>
  );
}

export default Doctors;
