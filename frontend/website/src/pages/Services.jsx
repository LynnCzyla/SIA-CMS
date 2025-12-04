import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
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

// Function to remove HTML tags and limit text
const cleanDescription = (html, maxLength = 100) => {
  if (!html) return "No description available";
  
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, '');
  
  // Limit length and add ellipsis if needed
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  
  return text;
};

// Function to get placeholder image
const getPlaceholderImage = (serviceName) => {
  const colors = ['#4f9cf9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  const colorIndex = serviceName.length % colors.length;
  return `https://via.placeholder.com/400x200/${colors[colorIndex].replace('#', '')}/ffffff?text=${encodeURIComponent(serviceName)}`;
};

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  const topServices = [
    { id: 1, icon: '/Psychiatry.png', name: 'Psychiatry' },
    { id: 2, icon: '/Gynecology.png', name: 'Gynecology' },
    { id: 3, icon: '/GeneralMedicine.png', name: 'General Medicine' },
    { id: 4, icon: '/Cardiology.png', name: 'Cardiology' },
  ];

  // Helper function to get first 5-7 words
  const getFirstWords = (text) => {
    if (!text) return "";
    // Strip HTML tags
    const stripped = text.replace(/<[^>]*>/g, '');
    // Split by spaces and take first 7 words
    const words = stripped.trim().split(/\s+/);
    const firstWords = words.slice(0, 7).join(' ');
    return firstWords + (words.length > 7 ? '...' : '');
  };

  // Fetch services from backend
  useEffect(() => {
    fetch("http://26.41.72.16:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched services:", data);
        setServices(data);
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Filter services for search
  const filteredServices = services.filter(
    (s) =>
      s.short_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.full_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle image loading errors
  const handleImageError = (serviceId) => {
    console.log(`Image failed to load for service ${serviceId}`);
    setImageErrors(prev => ({ ...prev, [serviceId]: true }));
  };

  return (
    <div className="page-transition">
    <div className="services-page">
      {/* Header / Top Services */}
      <div className="services-header-section">
        <h2 className="title-center mb-4 text-primary">
          Our <span className="title-primary">Services</span>
        </h2>

        {/* Top Services */}
        <div className="top-services-section">
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
        {filteredServices.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-card-icon">
                <img
                  src={service.image_url || "/default.png"}
                  alt={service.full_title}
                  style={{ width: "250px", height: "250px", objectFit: "contain", backgroundSize: "cover",
                backgroundPosition: "center"}}
                />
              </div>            
            
            <div>
              <p className="text-muted small mb-1 fw-semibold text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                {service.short_title}
              </p>
            
              <h5 className="card-title fw-bold text-primary mb-2">
                {service.full_title}
              </h5>
              
              <p className="text-muted small mb-3" style={{ fontSize: '0.8rem' }}>
                {service.created_at ? new Date(service.created_at).toLocaleDateString() : ""}
              </p>
              
              <span className="card-text text-secondary small">
                {getFirstWords(service.description)}
              </span>
            </div>
            
            <Link to={`/services/${service.slug}`} className="read-more-btn">
              Read More <ArrowIcon />
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}