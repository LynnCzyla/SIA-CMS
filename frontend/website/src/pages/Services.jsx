import React, { useState } from "react";
import "../css/Services.css";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');

  const topServices = [
    { id: 1, icon: '/Psychiatry.png', name: 'Psychiatry' },
    { id: 2, icon: '/Gynecology.png', name: 'Gynecology' },
    { id: 3, icon: '/GeneralMedicine.png', name: 'General Medicine' },
    { id: 4, icon: '/Cardiology.png', name: 'Cardiology' },
  ];

  const serviceCards = [
    {
      id: 1,
      icon: '/Psychiatry.png',
      title: 'Psychiatry / Behavioral Health',
      description: 'Offers compassionate mental and emotional health treatment, encompassing initial Medical and behavioral care for a wide range of conditions, from anxiety and depression to more severe mental illnesses.'
    },
    {
      id: 4,
      icon: '/Cardiology.png',
      title: 'Cardiology',
      description: 'Comprehensive heart care services including diagnosis, treatment, and prevention of cardiovascular diseases with state-of-the-art technology and experienced cardiologists.'
    },
    {
      id: 2,
      icon: '/Gynecology.png',
      title: 'Gynecology',
      description: 'Women\'s health services covering reproductive health, prenatal care, and treatment of gynecological conditions with compassionate and professional care.'
    },
    {
      id: 3,
      icon: '/GeneralMedicine.png',
      title: 'General Medicine',
      description: 'Primary healthcare services for adults, including diagnosis and treatment of common illnesses, health screenings, and ongoing management of chronic conditions.'
    },
  ];

  return (
    <div className="services-page">
      {/* Our Services Section */}
      <div className="services-header-section">
        <h2 className="title-center mb-4 text-primary">
            Our <span className="title-primary">Services</span>
          </h2>
        
        <div className="top-services-grid">
          {topServices.map((service) => (
            <div key={service.id} className="service-icon-box">
              <img 
                src={service.icon} 
                alt={service.name} 
                style={{ width: '120px', height: '120px', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>

        <div className="services-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      {/* Search Section */}
      <div className="services-search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
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
        {serviceCards.map((card) => (
          <div key={card.id} className="service-card">
            <div className="service-card-icon">
              <img 
                src={card.icon} 
                alt={card.title} 
                style={{ width: '120px', height: '120px', objectFit: 'contain' }}
              />
            </div>
            <h3 className="service-card-title">{card.title}</h3>
            <p className="service-card-description">{card.description}</p>
            <button className="read-more-btn">
              Read More <ArrowIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}