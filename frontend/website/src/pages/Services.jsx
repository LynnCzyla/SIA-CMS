import React, { useState, useEffect } from "react";
import "../css/Services.css";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);

  const topServices = [
    { id: 1, icon: '/Psychiatry.png', name: 'Psychiatry' },
    { id: 2, icon: '/Gynecology.png', name: 'Gynecology' },
    { id: 3, icon: '/GeneralMedicine.png', name: 'General Medicine' },
    { id: 4, icon: '/Cardiology.png', name: 'Cardiology' },
  ];

  // Fetch services from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched services:", data);
        setServices(data); // save to state
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Filter services for search
  const filteredServices = services.filter(
    (s) =>
      s.short_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.full_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="services-page">
      {/* Header / Top Services */}
      <div className="services-header-section">
        <h2 className="title-center mb-4 text-primary">
          Our <span className="title-primary">Services</span>
        </h2>

        {/* Top Services */}
        <div className="top-services-section">
          <h3>Top Services</h3>
          <div className="top-services-grid">
            {topServices.map((service) => (
              <div key={service.id} className="top-service-card">
                <img
                  src={service.icon}
                  alt={service.name}
                  style={{ width: "100px", height: "100px", objectFit: "contain" }}
                />
                <h4>{service.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="services-search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search services"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">
            <SearchIcon />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="service-cards-grid">
        {filteredServices.length === 0 ? (
          <p>No services found.</p>
        ) : (
          filteredServices.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card-icon">
                <img
                  src={service.image_url || "/default.png"}
                  alt={service.full_title}
                  style={{ width: "120px", height: "120px", objectFit: "contain" }}
                />
              </div>
              <h3 className="service-card-title">{service.full_title}</h3>
              <p className="service-card-description">{service.description}</p>
              <button className="read-more-btn">
                Read More <ArrowIcon />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
