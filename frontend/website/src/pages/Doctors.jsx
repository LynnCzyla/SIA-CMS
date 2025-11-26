/// frontend/website/src/pages/Doctors.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../css/Doctors.css";

function Doctors() {
  const [formData, setFormData] = useState({
    surname: "",
    firstname: "",
    specialization: "",
    schedule: "",
    meridiem: "",
  });

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [alphabetStartIndex, setAlphabetStartIndex] = useState(0);
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const doctorsList = [
    { id: 1, name: "Dr. Jane Smith", spec: "Pediatrics", img: "doctor1.jpg" },
    { id: 2, name: "Dr. John Lee", spec: "Cardiology", img: "doctor2.png" },
    { id: 3, name: "Dr. Michael Cruz", spec: "Dermatology", img: "doctor3.png" },
    { id: 4, name: "Dr. Anna Reyes", spec: "Neurology", img: "doctor4.jpg" },
    { id: 5, name: "Dr. Mark Santos", spec: "Ophthalmology", img: "doctor5.jpg" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFormData({
      surname: "",
      firstname: "",
      specialization: "",
      schedule: "",
      meridiem: "",
    });
    setFilteredDoctors([]);
    setShowNoResults(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const results = doctorsList.filter((doctor) => {
      const surnameMatch = formData.surname
        ? doctor.name.toLowerCase().includes(formData.surname.toLowerCase())
        : true;
      const firstnameMatch = formData.firstname
        ? doctor.name.toLowerCase().includes(formData.firstname.toLowerCase())
        : true;
      const specMatch = formData.specialization
        ? doctor.spec === formData.specialization
        : true;

      return surnameMatch && firstnameMatch && specMatch;
    });

    setFilteredDoctors(results);
    setShowNoResults(results.length === 0);
  };

  // For alphabet navigation
  const visibleLetters = alphabet.slice(alphabetStartIndex, alphabetStartIndex + 8);
  const handlePrev = () => {
    if (alphabetStartIndex > 0) setAlphabetStartIndex(alphabetStartIndex - 1);
  };
  const handleNext = () => {
    if (alphabetStartIndex < alphabet.length - 8)
      setAlphabetStartIndex(alphabetStartIndex + 1);
  };

  const doctorsToDisplay =
    filteredDoctors.length > 0 ? filteredDoctors : doctorsList;

  return (
    <section className="doctors-page">
      {/* 🧑‍⚕️ Header Section */}
      <div className="doctors-header text-center">
        <h2>
          Meet Our <span className="highlight">Doctors</span>
        </h2>
        <p>WE ARE DEDICATED TO YOUR WELL-BEING</p>
        <img
          src="our_doctors.svg"
          alt="Our Doctors"
          className="doctors-image"
        />
      </div>

      {/* 🔍 Search Filters */}
      <div className="d-flex justify-content-center mt-4">
        <div className="search-container shadow-sm p-4 mb-4">
          <form className="row g-3 justify-content-center">
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
                <option>Cardiology</option>
                <option>Pediatrics</option>
                <option>Dermatology</option>
              </select>
            </div>

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

            <div className="col-md-4 d-flex justify-content-between align-items-center gap-1">
              <button
                type="button"
                className="btn btn-light btn-cancel px-4"
                onClick={handleClear}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-search"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>


      {/* Conditional Rendering */}
      {showNoResults ? (
        <div className="no-results mt-5 text-center">
          <img
            src="no_data_found.svg"
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
          <div className="row">
            {/* Alphabet Filter */}
            <div className="col-md-12 text-center alphabet-bar d-flex align-items-center justify-content-center mb-4">
              <button className="alphabet-arrow" onClick={handlePrev}>
                <FaChevronLeft />
              </button>
              <div className="alphabet-scroll d-flex justify-content-center mx-2">
                {visibleLetters.map((letter, i) => (
                  <button key={i} className="alphabet-btn">
                    {letter}
                  </button>
                ))}
              </div>
              <button className="alphabet-arrow" onClick={handleNext}>
                <FaChevronRight />
              </button>
            </div>

            {/* Doctors Grid */}
            <div className="row g-4">
              {doctorsToDisplay.map((doctor) => (
                <div key={doctor.id} className="col-md-3 col-sm-6">
                  <div className="doctor-card text-center shadow-sm">
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
            <nav className="pagination-container mt-5">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <span className="page-link">&laquo;</span>
                </li>
                {[...Array(5)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${index === 0 ? "active" : ""}`}
                  >
                    <button className="page-link">{index + 1}</button>
                  </li>
                ))}
                <li className="page-item">
                  <span className="page-link">&raquo;</span>
                </li>
              </ul>
            </nav>
          </div>
        </div> 
      )}
    </section>
  );
}

export default Doctors;