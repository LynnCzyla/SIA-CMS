// frontend/website/src/components/DoctorModal.jsx
import React from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaHospital 
} from 'react-icons/fa';
import './components-css/DoctorModal.css';


const DoctorModal = ({ doctor, isOpen, onClose }) => {
  if (!isOpen || !doctor) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="doctor-modal-overlay" onClick={handleOverlayClick}>
      <div className="doctor-modal-container">
        {/* Header with heartbeat line and logo */}
        <div className="doctor-modal-header">
          <div className="heartbeat-decoration">
            <svg viewBox="0 0 200 40" className="heartbeat-svg">
              <polyline
                points="0,20 40,20 45,10 55,30 60,20 200,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="modal-branding">
            <span className="brand-name">MediSync</span>
            <span className="brand-subtitle">Licensed Doctor</span>
          </div>
        </div>

        {/* Close Button */}
        <button 
          className="modal-close-button" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Body Content */}
        <div className="doctor-modal-body">
          <div className="modal-content-wrapper">
            {/* Doctor Photo Section */}
            <div className="doctor-photo-section">
              <div className="doctor-photo-frame">
                <img 
                  src={doctor.img} 
                  alt={doctor.name}
                  className="doctor-photo"
                />
              </div>
            </div>

            {/* Doctor Info Section */}
            <div className="doctor-info-section">
              <h2 className="doctor-modal-name">{doctor.name}</h2>
              <p className="doctor-modal-specialization">{doctor.spec}</p>

              <div className="doctor-details-list">
                <div className="detail-row">
                  <FaHospital className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Department</span>
                    <span className="detail-value">{doctor.department}</span>
                  </div>
                </div>

                <div className="detail-row">
                  <FaPhone className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Office Number</span>
                    <span className="detail-value">{doctor.contactNumber}</span>
                  </div>
                </div>

                <div className="detail-row">
                  <FaEnvelope className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{doctor.email}</span>
                  </div>
                </div>

                <div className="detail-row">
                  <FaCalendarAlt className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Schedule</span>
                    <span className="detail-value">{doctor.schedule}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;