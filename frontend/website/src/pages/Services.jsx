import React, { useState } from 'react';
import '../css/services.css';

// SVG Icons
const BabyIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="50" cy="45" r="30" />
    <path d="M35 40 Q40 35 45 40" />
    <path d="M55 40 Q60 35 65 40" />
    <path d="M40 55 Q50 60 60 55" />
    <path d="M30 25 Q25 15 30 10" />
  </svg>
);

const UterusIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M30 30 Q20 35 20 50 Q20 70 35 75 L50 80 L65 75 Q80 70 80 50 Q80 35 70 30" />
    <circle cx="30" cy="30" r="8" />
    <circle cx="70" cy="30" r="8" />
    <path d="M25 25 Q20 20 15 25" />
    <path d="M75 25 Q80 20 85 25" />
  </svg>
);

const StethoscopeIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M25 20 L25 45 Q25 55 35 60" />
    <path d="M45 20 L45 45 Q45 55 35 60" />
    <path d="M35 60 L35 75 Q35 85 45 85 L60 85" />
    <circle cx="70" cy="85" r="8" />
    <circle cx="70" cy="30" r="8" />
    <path d="M70 38 L70 77" />
  </svg>
);

const HeartIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M50 75 Q30 60 25 45 Q20 30 30 25 Q40 20 50 30 Q60 20 70 25 Q80 30 75 45 Q70 60 50 75" />
    <path d="M35 35 L45 45" />
    <path d="M45 40 L50 50" />
    <path d="M55 45 L60 35" />
  </svg>
);

const BrainIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="50" cy="40" rx="25" ry="30" />
    <path d="M30 25 Q25 20 25 30 Q25 40 30 45" />
    <path d="M70 25 Q75 20 75 30 Q75 40 70 45" />
    <path d="M35 35 Q40 30 45 35 Q50 40 55 35 Q60 30 65 35" />
    <path d="M35 45 Q40 50 50 50 Q60 50 65 45" />
    <line x1="50" y1="70" x2="50" y2="85" />
    <line x1="45" y1="80" x2="55" y2="80" />
  </svg>
);

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
    { id: 1, icon: <BabyIcon />, name: 'Pediatrics' },
    { id: 2, icon: <UterusIcon />, name: 'Gynecology' },
    { id: 3, icon: <StethoscopeIcon />, name: 'General Medicine' },
    { id: 4, icon: <HeartIcon />, name: 'Cardiology' },
  ];

  const serviceCards = [
    {
      id: 1,
      icon: <BrainIcon />,
      title: 'Psychiatry / Behavioral Health',
      description: 'Offers compassionate mental and emotional health treatment, encompassing initial Medical and behavioral care for a wide range of conditions, from anxiety and depression to more severe mental illnesses.'
    },
    {
      id: 2,
      icon: <BrainIcon />,
      title: 'Psychiatry / Behavioral Health',
      description: 'Offers compassionate mental and emotional health treatment, encompassing initial Medical and behavioral care for a wide range of conditions, from anxiety and depression to more severe mental illnesses.'
    },
    {
      id: 3,
      icon: <BrainIcon />,
      title: 'Psychiatry / Behavioral Health',
      description: 'Offers compassionate mental and emotional health treatment, encompassing initial Medical and behavioral care for a wide range of conditions, from anxiety and depression to more severe mental illnesses.'
    },
  ];

  return (
    <div className="services-page">
      {/* Our Services Section */}
      <div className="services-header-section">
        <h2 className="title-center mb-4 text-primary">
            Latest <span className="title-primary">Careers</span>
          </h2>
        
        <div className="top-services-grid">
          {topServices.map((service) => (
            <div key={service.id} className="service-icon-box">
              {service.icon}
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
              {card.icon}
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