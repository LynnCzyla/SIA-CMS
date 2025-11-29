// frontend/admin/src/pages/Careers.jsx
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Quill from "quill";
import "../css/Careers.css";
import "quill/dist/quill.snow.css";
import { IoMdCreate } from "react-icons/io";

export default function Careers() {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileInfo, setFileInfo] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const [departments, setDepartments] = useState([
    "Administration",
    "Nursing",
    "Radiology",
    "Pharmacy",
  ]);
  const [newDepartment, setNewDepartment] = useState("");

  if (!user) {
    alert("Please log in first!");
    return null;
  }

  // Initialize Quill
  useEffect(() => {
    if (quillRef.current && !quillRef.current.__quill) {
      const quill = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Write the job description here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "", "code-block"],
            ["clean"],
          ],
        },
      });
      quillRef.current.__quill = quill;
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const preview = isImage ? URL.createObjectURL(file) : null;

    setFileInfo({ file, name: file.name, isImage, preview });
  };

  const handleSubmit = async (status) => {
    const quillEditor = quillRef.current.__quill;
    const description = quillEditor.root.innerHTML;

    const formData = new FormData();
    formData.append("job_title", document.getElementById("cms-job-title").value);
    formData.append("short_title", document.getElementById("cms-short-title").value);
    formData.append("department", document.getElementById("cms-department").value);
    formData.append("job_type", document.getElementById("cms-job-type").value);
    formData.append("location", document.getElementById("cms-location").value);
    formData.append("qualifications", document.getElementById("cms-qualifications").value);
    formData.append("application_deadline", document.getElementById("cms-deadline").value);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("author", user.id);

    if (fileInfo?.file) {
      formData.append("image", fileInfo.file);
    }

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: `Job ${status} successfully!`,
          timer: 2000,
          showConfirmButton: false,
        });

        // Reset fields
        setFileInfo(null);
        quillEditor.setContents([]);
        document.getElementById("cms-job-title").value = "";
        document.getElementById("cms-short-title").value = "";
        document.getElementById("cms-department").value = departments[0] || "";
        document.getElementById("cms-job-type").value = "Full-time";
        document.getElementById("cms-location").value = "";
        document.getElementById("cms-qualifications").value = "";
        document.getElementById("cms-deadline").value = "";
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Something went wrong while saving the job.",
        });
      }
    } catch (err) {
      console.error("❌ Server error:", err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to connect to the backend.",
      });
    }
  };

  return (
    <div className="cms-announcement-page">
      <h2 className="title">Careers</h2>
      <ul className="breadcrumbs">
        <li>HR and Careers</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>

      {/* Header Card */}
      <div className="card announcement-card">
        <div className="head">
          <h3 className="announcement-title">Create a Job Posting</h3>
          <div className="announcement-actions">
            <button className="btn draft" onClick={() => handleSubmit("draft")}>
              Draft
            </button>
            <button className="btn submit" onClick={() => handleSubmit("posted")}>
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div className="cms-card cms-form-card">
        <form className="cms-form">
          {/* Top Row: Job Title, Short Title, Department, Add Department */}
          <div className="cms-form-row">
            <div className="cms-form-group">
              <label htmlFor="cms-job-title">Job Title</label>
              <input type="text" id="cms-job-title" placeholder="Enter job title" />
            </div>

            <div className="cms-form-group">
              <label htmlFor="cms-short-title">Short Title</label>
              <input type="text" id="cms-short-title" placeholder="Enter short title" />
            </div>

            <div className="cms-form-group">
              <label htmlFor="cms-department">Department</label>
              <select id="cms-department">
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="cms-form-group">
              <label>Add Department</label>
              <div className="add-department">
                <input
                  type="text"
                  placeholder="New department"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                />
                <button
                  type="button"
                  className="btn add-dept-btn"
                  onClick={() => {
                    const trimmed = newDepartment.trim();
                    if (trimmed && !departments.includes(trimmed)) {
                      setDepartments([...departments, trimmed]);
                      setNewDepartment("");
                      alert(`Department "${trimmed}" added!`);
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row: Job Type, Location, Qualifications, Deadline */}
          <div className="cms-form-row">
            <div className="cms-form-group">
              <label htmlFor="cms-job-type">Job Type</label>
              <select id="cms-job-type">
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </div>

            <div className="cms-form-group">
              <label htmlFor="cms-location">Location</label>
              <input type="text" id="cms-location" placeholder="e.g. Quezon City, Pasig City" />
            </div>

            <div className="cms-form-group">
              <label htmlFor="cms-qualifications">Qualifications</label>
              <input type="text" id="cms-qualifications" placeholder="e.g. BSc Nursing, 2 yrs experience" />
            </div>

            <div className="cms-form-group">
              <label htmlFor="cms-deadline">Application Deadline</label>
              <input type="date" id="cms-deadline" />
            </div>
          </div>

          {/* Description + Image */}
          <div className="cms-form-row" style={{ alignItems: "flex-start" }}>
            <div className="cms-form-group" style={{ flex: 2 }}>
              <label>Description</label>
              <div ref={quillRef} className="cms-quill-editor"></div>
            </div>

            <div className="cms-form-group" style={{ flex: 1, minWidth: "250px" }}>
              <label>Upload Image</label>
              <div className="file-upload-container" onClick={() => fileInputRef.current?.click()}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input-hidden"
                />
                <label className="upload-label">
                  <IoMdCreate style={{ marginRight: "8px" }} /> Choose Image
                </label>
                <div className="file-preview-area">
                  {fileInfo ? (
                    fileInfo.isImage && fileInfo.preview ? (
                      <img src={fileInfo.preview} alt="preview" className="file-preview-img" />
                    ) : (
                      <p className="file-name">{fileInfo.name}</p>
                    )
                  ) : (
                    <p className="file-placeholder">No image chosen</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
