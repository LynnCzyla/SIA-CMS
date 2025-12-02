// src/components/PatientRegistrationModal.jsx

import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import "../css/AppointmentModal.css";

const AppointmentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const payload = {
      action: "register_patient",
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      age: Number(formData.age),
      gender: formData.gender,
      phone_number: formData.phoneNumber.trim(),
      email_address: formData.emailAddress.trim(),
      address: formData.address.trim(),
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "http://26.22.170.205/PatientManagementSystem/api/api_register_patient.php",
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("API response:", response.data);

      if (response.data && response.data.success) {
        setSuccess(true);
        setTimeout(() => onClose(), 2000);
      } else {
        setError(response.data?.message || "Failed to register patient");
      }
    } catch (err) {
      console.error("Registration submit error:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        phoneNumber: "",
        emailAddress: "",
        address: "",
        password: "",
      });
      setError("");
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="appointment-modal-overlay">
      <div className="appointment-modal-container-wide">
        <div className="appointment-modal-header-blue">
          <div>
            <h2 className="appointment-modal-title-white">Appointment Booking</h2>
            <p className="appointment-modal-subtitle">Personal Information</p>
          </div>
          <button onClick={onClose} className="appointment-modal-close-btn-white">
            <MdClose size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="appointment-modal-form-wide">
          {/* Row 1 - 3 columns: First Name, Last Name, Age */}
          <div className="appointment-modal-row">
            <div className="appointment-modal-form-group">
              <label className="appointment-modal-label-blue">FIRST NAME</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="appointment-modal-input"
                placeholder="Enter First Name"
                required
              />
            </div>

            <div className="appointment-modal-form-group">
              <label className="appointment-modal-label-blue">LAST NAME</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="appointment-modal-input"
                placeholder="Enter Last Name"
                required
              />
            </div>

            <div className="appointment-modal-form-group">
              <label className="appointment-modal-label-blue">AGE</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="appointment-modal-input"
                placeholder="Enter Age"
                required
              />
            </div>
          </div>

          {/* Row 2 - 3 columns: Gender, Phone Number, Email Address */}
          <div className="appointment-modal-row">
            <div className="appointment-modal-form-group">
              <label className="appointment-modal-label-blue">GENDER</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="appointment-modal-select"
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="appointment-modal-form-group">
              <label className="appointment-modal-label-blue">PHONE NUMBER</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="appointment-modal-input"
                placeholder="Enter Phone Number e.g. (+63) 9123456789"
                required
              />
            </div>

            <div className="appointment-modal-form-group">
              <label className="appointment-modal-label-blue">EMAIL ADDRESS</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className="appointment-modal-input"
                placeholder="Enter Email Address"
                required
              />
            </div>
          </div>

          {/* Row 3 - Full width: Address */}
          <div className="appointment-modal-row">
            <div className="appointment-modal-form-group appointment-modal-form-group-wide">
              <label className="appointment-modal-label-blue">ADDRESS</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="appointment-modal-textarea"
                rows="3"
                placeholder="Enter full address"
                required
              />
            </div>
          </div>


          {/* Messages */}
          {success && (
            <div className="appointment-modal-success">
              Patient registered successfully! Closing in 2s...
            </div>
          )}
          {error && <div className="appointment-modal-error">{error}</div>}

          {/* Actions */}
          <div className="appointment-modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="appointment-modal-btn appointment-modal-btn-cancel-red"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="appointment-modal-btn appointment-modal-btn-submit-blue"
            >
                {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;