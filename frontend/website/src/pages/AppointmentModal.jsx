// src/components/AppointmentModal.jsx

import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
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

  useEffect(() => {
    if (!isOpen) return;
    const loadDoctors = async () => {
      try {
        const res = await axios.get(
          "http://147.185.221.27:34249/Group-4-SIA-EMS/api/api.php?module=employee&filter_doctors=1"
        );
        const doctorList = res.data.map((doc) => ({
          id: Number(doc.employeeID),
          name: `Dr. ${doc.firstName} ${doc.lastName}`,
        }));
        setDoctors(doctorList);
      } catch (err) {
        console.error("Failed to load doctors:", err);
        setDoctors([
          { id: 1, name: "Dr. Andrea Orel Valle" },
          { id: 2, name: "Dr. Eileen Liesl Cubillan" },
          { id: 3, name: "Dr. Patricia Maningat" },
          { id: 4, name: "Dr. Evelyn Paraan" },
        ]);
      }
    };
    loadDoctors();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidTimeHHMM = (time) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("First name and last name are required.");
      setLoading(false);
      return;
    }

    if (!formData.doctor) {
      setError("Please select a doctor.");
      setLoading(false);
      return;
    }

    if (!formData.appointmentDate) {
      setError("Please select an appointment date.");
      setLoading(false);
      return;
    }

    if (!isValidTimeHHMM(formData.appointmentTime)) {
      setError("Invalid time format. Use HH:MM (24-hour format).");
      setLoading(false);
      return;
    }

    if (formData.appointmentType === "Other" && !formData.specifyType.trim()) {
      setError("Please specify the appointment type.");
      setLoading(false);
      return;
    }

    const doctorObj = doctors.find((d) => d.id === Number(formData.doctor));

    const payload = {
      action: "create_appointment",
      patient_first_name: formData.firstName.trim(),
      patient_last_name: formData.lastName.trim(),
      doctor_id: Number(formData.doctor),
      doctor_name: doctorObj ? doctorObj.name : "",
      appointment_date: formData.appointmentDate,
      appointment_time: formData.appointmentTime,
      appointment_type: formData.appointmentType, // dropdown value
      specify_appointment_type:
        formData.appointmentType === "Other" ? formData.specifyType.trim() : "", // exactly typed
      notes: formData.notes.trim() || "",
      status: "Scheduled",
    };

    try {
      const response = await axios.post(
        "http://26.22.170.205/PatientManagementSystem/api/api_schedule_appointment.php",
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.data?.success) {
        setSuccess(true);
        Swal.fire({
          icon: "success",
          title: "Appointment Booked!",
          text: "Your appointment has been scheduled successfully.",
          timer: 2000,
          showConfirmButton: false,
          customClass: { popup: "swal-high-zindex" },
        });
        setTimeout(() => onClose(), 2000);
      } else {
        const errMsg = response.data?.message || "Failed to create appointment";
        setError(errMsg);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errMsg,
          customClass: { popup: "swal-high-zindex" },
        });
      }
    } catch (err) {
      console.error("Appointment submit error:", err);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Server error. Ensure backend accepts JSON.";
      setError(errMsg);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errMsg,
        customClass: { popup: "swal-high-zindex" },
      });
    } finally {
      setLoading(false);
    }
  };

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
                placeholder="Enter First Name"
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
                placeholder="Enter Last Name"
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
                <option value="">Select a doctor</option>
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
                <option value="Consultation">Consultation</option>
                <option value="Follow-up Checkup">Follow-up Checkup</option>
                <option value="Check-up">Check-up</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 3: Show specifyType if Other */}
          {formData.appointmentType === "Other" && (
            <div className="appointment-modal-row">
              <div className="appointment-modal-form-group">
                <label className="appointment-modal-label-blue">Specify Appointment Type *</label>
                <input
                  type="text"
                  name="specifyType"
                  value={formData.specifyType}
                  onChange={handleChange}
                  className="appointment-modal-input"
                  placeholder="Enter appointment type"
                  required
                />
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="appointment-modal-row">
            <div className="appointment-modal-form-group appointment-modal-form-group-wide">
              <label className="appointment-modal-label-blue">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="appointment-modal-textarea"
                rows="3"
                placeholder="Symptoms, allergies, special requests..."
              />
            </div>
          </div>

          {/* Messages */}
          {success && <div className="appointment-modal-success">Appointment booked successfully! Closing in 2s...</div>}
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
              {loading ? "Scheduling..." : "Schedule Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
