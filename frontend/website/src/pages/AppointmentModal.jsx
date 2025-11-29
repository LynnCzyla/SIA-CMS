// src/components/AppointmentModal.jsx

import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
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

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch doctors when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const loadDoctors = async () => {
      try {
        const res = await axios.get(
          "http://147.185.221.27:34249/Group-4-SIA-EMS/api/api.php?module=employee&filter_doctors=1"
        );

        const doctorList = res.data.map((doc) => ({
          id: doc.employeeID,
          name: `Dr. ${doc.firstName} ${doc.lastName}`.trim(),
        }));

        setDoctors(doctorList);
      } catch (err) {
        console.error("Failed to load doctors", err);
        // Fallback doctors
        setDoctors([
          { id: "1", name: "Dr. Andrea Orel Valle" },
          { id: "2", name: "Dr. Eileen Liesl Cubillan" },
          { id: "3", name: "Dr. Patricia Maningat" },
          { id: "4", name: "Dr. Evelyn Paraan" },
        ]);
      }
    };

    loadDoctors();
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const finalType =
      formData.appointmentType === "Other" && formData.specifyType.trim()
        ? formData.specifyType.trim()
        : formData.appointmentType;

    // CLEAN MODERN JSON PAYLOAD
    const payload = {
      action: "create_appointment",
      patient_first_name: formData.firstName.trim(),
      patient_last_name: formData.lastName.trim(),
      doctor_id: Number(formData.doctor),
      appointment_date: formData.appointmentDate,
      appointment_time: formData.appointmentTime + ":00",
      appointment_type: finalType,
      notes: formData.notes.trim() || null,
      status: "Scheduled",
    };

    try {
      const response = await axios.post(
        "http://147.185.221.27:34249/Group-4-SIA-EMS/api/api.php?module=appointment",
        payload,
        {
          headers: {
            "Content-Type": "application/json", // Real JSON!
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => onClose(), 2000);
      } else {
        setError(response.data.message || "Failed to create appointment");
      }
    } catch (err) {
      console.error("Appointment submit error:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Server error. Make sure the JSON fix is applied on api.php";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Reset form on close
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: "",
        lastName: "",
        doctor: "",
        appointmentDate: "",
        appointmentTime: "",
        appointmentType: "Consultation",
        specifyType: "",
        notes: "",
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
          <h2 className="appointment-modal-title-white">Schedule Appointment</h2>
          <button onClick={onClose} className="appointment-modal-close-btn-white">
            <MdClose size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="appointment-modal-form-wide">
          {/* Row 1 */}
          <div className="appointment-modal-row">
            <div className="appointment-modal-form-group">
              <label className="appointment-modal-label-blue">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="appointment-modal-input"
                required
              />
            </div>

            <div className="appointment-modal-form-group">
              <label className="appointment-modal-label-blue">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="appointment-modal-input"
                required
              />
            </div>

            <div className="appointment-modal-form-group">
              <label className="appointment-modal-label-blue">Select Doctor *</label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="appointment-modal-select"
                required
              >
                <option value="">Choose Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="appointment-modal-row">
            <div className="appointment-modal-form-group">
              <label className="appointment-modal-label-blue">Date *</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="appointment-modal-input"
                required
              />
            </div>

            <div className="appointment-modal-form-group">
              <label className="appointment-modal-label-blue">Time *</label>
              <input
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                className="appointment-modal-input"
                required
              />
            </div>

            <div className="appointment-modal-form-group">
              <label className="appointment-modal-label-blue">Type</label>
              <select
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
                className="appointment-modal-select"
              >
                <option>Consultation</option>
                <option>Follow-up</option>
                <option>Check-up</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Specify Other */}
          {formData.appointmentType === "Other" && (
            <div className="appointment-modal-row">
              <div className="appointment-modal-form-group">
                <label className="appointment-modal-label-blue">Specify Type *</label>
                <input
                  type="text"
                  name="specifyType"
                  value={formData.specifyType}
                  onChange={handleChange}
                  placeholder="e.g., Dental Cleaning, Vaccination"
                  className="appointment-modal-input"
                  required={formData.appointmentType === "Other"}
                />
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="appointment-modal-row">
            <div className="appointment-modal-form-group appointment-modal-form-group-wide">
              <label className="appointment-modal-label-blue">Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Symptoms, allergies, special requests..."
                rows="3"
                className="appointment-modal-textarea"
              />
            </div>
          </div>

          {/* Messages */}
          {success && (
            <div className="appointment-modal-success">
              Appointment booked successfully! Closing in 2s...
            </div>
          )}
          {error && <div className="appointment-modal-error">{error}</div>}

          {/* Buttons */}
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
              {loading ? "Scheduling..." : "Schedule Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;