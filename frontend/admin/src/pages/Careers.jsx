// frontend/admin/src/pages/Careers.jsx
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Quill from "quill";
import "../css/Careers.css";
import "quill/dist/quill.snow.css";

export default function Careers() {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileInfo, setFileInfo] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [departments] = useState([
    "Administration",
    "Nursing",
    "Radiology",
    "Pharmacy",
  ]);

  const [pendingJobs, setPendingJobs] = useState([]);
  const [isLoadingPending, setIsLoadingPending] = useState(false);

  if (!user) {
    alert("Please log in first!");
    return null;
  }

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
            ["link", "code-block"],
            ["clean"],
          ],
        },
      });
      quillRef.current.__quill = quill;
    }
  }, []);

  useEffect(() => {
    if (user.role === "hr_administrator" || user.role === "super_administrator") {
      fetchPendingJobs();
    }
  }, []);

  const fetchPendingJobs = async () => {
    setIsLoadingPending(true);
    try {
      const res = await fetch("http://localhost:5000/api/jobs/pending");
      const data = await res.json();
      if (data.success) setPendingJobs(data.jobs);
    } catch (err) {
      console.error("Error fetching pending jobs:", err);
    } finally {
      setIsLoadingPending(false);
    }
  };

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
    if (fileInfo?.file) formData.append("image", fileInfo.file);

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({ icon: "success", title: `Job ${status} successfully!`, timer: 2000, showConfirmButton: false });
        setFileInfo(null);
        quillEditor.setContents([]);
        document.getElementById("cms-job-title").value = "";
        document.getElementById("cms-short-title").value = "";
        document.getElementById("cms-department").value = departments[0] || "";
        document.getElementById("cms-job-type").value = "Regular / Permanent";
        document.getElementById("cms-location").value = "";
        document.getElementById("cms-qualifications").value = "";
        document.getElementById("cms-deadline").value = "";
      } else {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Something went wrong." });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Server Error", text: "Failed to connect to the backend." });
    }
  };

  const handleApproval = async (jobId, action, reason = "") => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/review`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reviewer_id: user.id, rejection_reason: reason }),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: `Job ${action}d!`,
          text: action === "approve"
            ? "The job has been published and is now live on the website."
            : "The job has been rejected and EMS will be notified.",
          timer: 2500,
          showConfirmButton: false,
        });
        fetchPendingJobs();
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to process approval." });
    }
  };

  const getUrgencyBadge = (urgency) => {
    const badges = {
      urgent: { label: "Urgent", class: "urgency-urgent" },
      medium: { label: "Medium Priority", class: "urgency-medium" },
      low: { label: "Low Priority", class: "urgency-low" },
    };
    return badges[urgency] || badges.medium;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const showJobDetails = (job) => {
    const imageUrl = job.image ? `http://localhost:5000/uploads/jobs/${job.image}` : null;
    
    Swal.fire({
      html: `
        <div class="job-details-modal">
          <div class="modal-header-section">
            <h2 class="modal-job-title">${job.job_title}</h2>
            <div class="modal-badges">
              <span class="modal-badge submitted-badge">Submitted by: ${job.ems_user_name} (Pilot Tester) (EMS)</span>
              <span class="modal-badge date-badge">Date: ${formatDate(job.created_at)}</span>
            </div>
          </div>

          <div class="modal-content-wrapper">
            ${imageUrl ? `
              <div class="modal-image-section">
                <img src="${imageUrl}" alt="${job.job_title}" class="modal-job-image" />
              </div>
            ` : ''}
            
            <div class="modal-info-grid">
            <div class="modal-info-row">
              <span class="modal-label">Job Title:</span>
              <span class="modal-value">${job.job_title || 'N/A'}</span>
            </div>
            <div class="modal-info-row">
              <span class="modal-label">Department:</span>
              <span class="modal-value">${job.department || 'N/A'}</span>
            </div>
            <div class="modal-info-row">
              <span class="modal-label">Short Title:</span>
              <span class="modal-value">${job.short_title || 'N/A'}</span>
            </div>
            <div class="modal-info-row">
              <span class="modal-label">Location:</span>
              <span class="modal-value">${job.location || 'N/A'}</span>
            </div>
            <div class="modal-info-row">
              <span class="modal-label">Job Type:</span>
              <span class="modal-value">${job.job_type || 'N/A'}</span>
            </div>
            <div class="modal-info-row">
              <span class="modal-label">Application Deadline:</span>
              <span class="modal-value">${formatDate(job.application_deadline)}</span>
            </div>
            <div class="modal-info-row full-width">
              <span class="modal-label">Qualification:</span>
              <span class="modal-value">${job.qualifications || 'N/A'}</span>
            </div>
            </div>
          </div>

          <div class="modal-description-section">
            <h3 class="modal-section-title">Description:</h3>
            <div class="modal-description-content">${job.description || 'No description provided.'}</div>
          </div>
        </div>
      `,
      width: '80%',
      showConfirmButton: false,
      showCloseButton: true,
      customClass: {
        popup: 'job-details-modal-popup',
        closeButton: 'job-details-close-btn'
      }
    });
  };

  // Add state for pagination
const [currentPendingPage, setCurrentPendingPage] = useState(1);
const pendingPerPage = 1;
const totalPendingPages = Math.ceil(pendingJobs.length / pendingPerPage);

// Get current pending job
const displayedPendingJob = pendingJobs.slice(
  (currentPendingPage - 1) * pendingPerPage,
  currentPendingPage * pendingPerPage
);

// Pagination handler
const goToPendingPage = (page) => {
  if (page >= 1 && page <= totalPendingPages) setCurrentPendingPage(page);
};


  return (
    <div className="cms-announcement-page">
      <h2 className="title">Careers</h2>
      <ul className="breadcrumbs">
        <li>Content Creation</li>
        <li className="divider">/</li>
        <li>Careers</li>
      </ul>

      {/* Pending Approvals Section */}
      {(user.role === "hr_administrator" || user.role === "super_administrator") && (
        <>
          {isLoadingPending ? (
            <div className="cms-card pending-loading">Loading pending jobs...</div>
          ) : pendingJobs.length > 0 ? (
            <div className="pending-approvals-section">
              <div className="pending-header">
                <h3 className="pending-title">Pending Request</h3>
                <button className="refresh-btn" onClick={fetchPendingJobs}>Refresh</button>
              </div>
              
              <div className="pending-cards-container">
                {pendingJobs.map((job) => {
                  const badge = getUrgencyBadge(job.urgency_level);
                  return (
                    <div key={job.id} className="pending-job-card">
                      <div className="card-header">
                        <h4 className="card-job-title">{job.job_title}</h4>
                        <span className={`card-urgency-badge ${badge.class}`}>{badge.label}</span>
                      </div>
                      
                      <div className="card-meta">
                        <span className="meta-badge">Submitted by: {job.ems_user_name} (Pilot Tester) (EMS)</span>
                        <span className="meta-badge">Date: {formatDate(job.created_at)}</span>
                      </div>

                      <div className="card-details">
                        <div className="detail-item">
                          <strong>Department:</strong> {job.department}
                        </div>
                        <div className="detail-item">
                          <strong>Job Type:</strong> {job.job_type}
                        </div>
                        <div className="detail-item">
                          <strong>Location:</strong> {job.location}
                        </div>
                        <div className="detail-item">
                          <strong>Application Deadline:</strong> {formatDate(job.application_deadline)}
                        </div>
                      </div>

                      {job.ems_notes && (
                        <div className="card-notes">
                          <strong>Notes from EMS:</strong>
                          <p>{job.ems_notes}</p>
                        </div>
                      )}

                      <div className="card-actions">
                        <button className="btn-view" onClick={() => showJobDetails(job)}>
                          View Full Details
                        </button>
                        <button className="btn-approve" onClick={() => {
                          Swal.fire({
                            title: "Approve Job Posting?",
                            text: `"${job.job_title}" will be published.`,
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonColor: "#10b981",
                            cancelButtonColor: "#6b7280",
                            confirmButtonText: "Yes, Approve",
                          }).then((result) => result.isConfirmed && handleApproval(job.id, "approve"));
                        }}>
                          Approve & Published
                        </button>
                        <button className="btn-reject" onClick={async () => {
                          const { value: reason } = await Swal.fire({
                            title: "Reject Job Posting",
                            input: "textarea",
                            inputPlaceholder: "Enter rejection reason...",
                            showCancelButton: true,
                            confirmButtonText: "Reject",
                            inputValidator: (value) => !value && "Reason is required!",
                          });
                          if (reason) handleApproval(job.id, "reject", reason);
                        }}>
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="no-pending-card">
              <p>No pending job approvals at this time</p>
            </div>
          )}
        </>
      )}

      {/* Create Job Section */}
      <div className="card announcement-card">
        <div className="head">
          <h3 className="announcement-title">Create a Job Posting</h3>
          <div className="announcement-actions">
            <button className="btn draft" onClick={() => handleSubmit("draft")}>Draft</button>
            <button className="btn submit" onClick={() => handleSubmit("posted")}>Post</button>
          </div>
        </div>
      </div>

      <div className="cms-card cms-form-card">
        <form className="cms-form">
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
                  <option key={idx} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="cms-form-group">
              <label htmlFor="cms-job-type">Job Type</label>
              <select id="cms-job-type">
                <option>Regular / Permanent</option>
                <option>Contractual</option>
                <option>Job Order (JO)</option>
                <option>Part-Time</option>
                <option>Probationary</option>
                <option>Project-Based</option>
                <option>Volunteer</option>
                <option>Trainee / Intern</option>
                <option>Relief Staff / Reliever</option>
              </select>
            </div>
          </div>

          <div className="cms-form-row">
            <div className="cms-form-group">
              <label htmlFor="cms-location">Location</label>
              <input type="text" id="cms-location" placeholder="e.g. Quezon City, Pasig City" />
            </div>
            <div className="cms-form-group">
              <label htmlFor="cms-deadline">Application Deadline</label>
              <input type="date" id="cms-deadline" />
            </div>
            <div className="cms-form-group">
              <label htmlFor="cms-qualifications">Qualifications</label>
              <input type="text" id="cms-qualifications" placeholder="e.g. BSc Nursing, 2 yrs experience" />
            </div>
          </div>

          <div className="cms-form-row description-row">
            <div className="cms-form-group editor-group">
              <label>Description</label>
              <div ref={quillRef} className="cms-quill-editor"></div>
            </div>
            <div className="cms-form-group upload-group">
              <label>Upload Image</label>
              <div className="file-upload-container" onClick={() => fileInputRef.current?.click()}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="file-input-hidden" />
                <label className="upload-label">Choose Image</label>
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