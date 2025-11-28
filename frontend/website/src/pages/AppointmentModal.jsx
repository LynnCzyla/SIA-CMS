import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import "../css/AppointmentModal.css";

const AppointmentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    doctor: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentType: "Consultation",
    specifyType: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Clear specifyType when appointmentType changes to non-Other
      ...(name === "appointmentType" && value !== "Other" && { specifyType: "" })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your API call or further processing here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="appointment-modal-overlay">
      <div className="appointment-modal-container-wide">
        {/* Header */}
        <div className="appointment-modal-header-blue">
          <h2 className="appointment-modal-title-white">Schedule Appointment</h2>
          <button onClick={onClose} className="appointment-modal-close-btn-white">
            <MdClose size={28} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="appointment-modal-form-wide">
          {/* Row 1: First Name, Last Name, Select Doctor */}
          <div className="appointment-modal-row">
            <div className="appointment-modal-form-group">
              <label htmlFor="firstName" className="appointment-modal-label-blue">
                Patient First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Type your first name here"
                className="appointment-modal-input"
                required
              />
            </div>

            <div className="appointment-modal-form-group">
              <label htmlFor="lastName" className="appointment-modal-label-blue">
                Patient Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Type your last name here"
                className="appointment-modal-input"
                required
              />
            </div>

            <div className="appointment-modal-form-group">
              <label htmlFor="doctor" className="appointment-modal-label-blue">
                Select Doctor
              </label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="appointment-modal-select"
                required
              >
                <option value="">Select a doctor</option>
                <option value="dr-orel-valle">Dr. Andrea Orel Valle</option>
                <option value="dr-cubillan">Dr. Eileen Liesl Cubillan</option>
                <option value="dr-maningat">Dr. Patricia Maningat</option>
                <option value="dr-paraan">Dr. Evelyn Paraan</option>
              </select>
            </div>
          </div>

          {/* Row 2: Appointment Date, Time, Type */}
          <div className="appointment-modal-row">
            <div className="appointment-modal-form-group">
              <label htmlFor="appointmentDate" className="appointment-modal-label-blue">
                Appointment Date
              </label>
              <input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="appointment-modal-input"
                required
              />
            </div>

            <div className="appointment-modal-form-group">
              <label htmlFor="appointmentTime" className="appointment-modal-label-blue">
                Appointment Time
              </label>
              <input
                type="time"
                id="appointmentTime"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                className="appointment-modal-input"
                required
              />
            </div>

            <div className="appointment-modal-form-group">
              <label htmlFor="appointmentType" className="appointment-modal-label-blue">
                Appointment Type
              </label>
              <select
                id="appointmentType"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
                className="appointment-modal-select"
              >
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Check-up">Check-up</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 3: Specify Type (conditional) and Notes */}
          <div className="appointment-modal-row">
            {/* Only show Specify Type when "Other" is selected */}
            {formData.appointmentType === "Other" && (
              <div className="appointment-modal-form-group">
                <label htmlFor="specifyType" className="appointment-modal-label-blue">
                  Specify Appointment Type
                </label>
                <input
                  type="text"
                  id="specifyType"
                  name="specifyType"
                  value={formData.specifyType}
                  onChange={handleChange}
                  placeholder="Specify your appointment (e.g Dental Checkup)"
                  className="appointment-modal-input"
                  required
                />
                <p className="appointment-modal-helper-text-blue">
                  Please specify the appointment type
                </p>
              </div>
            )}

            <div className={`appointment-modal-form-group ${formData.appointmentType === "Other" ? "" : "appointment-modal-form-group-full"}`}>
              <label htmlFor="notes" className="appointment-modal-label-blue">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any special notes or instructions"
                rows="3"
                className="appointment-modal-textarea"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="appointment-modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="appointment-modal-btn appointment-modal-btn-cancel-red"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="appointment-modal-btn appointment-modal-btn-submit-blue"
            >
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;