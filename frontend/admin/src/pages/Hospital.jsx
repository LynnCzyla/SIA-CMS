import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Swal from "sweetalert2";

import "../css/about.css";
import "quill/dist/quill.snow.css";
import { IoMdCreate } from "react-icons/io";
import "../css/News.css";
import GeneralSettings from "../components/settings/General";

export default function Hospital() {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("general");

  const [aboutForm, setAboutForm] = useState({
    aboutHospital: "",
    mission: "",
    vision: "",
    qualityPolicy: "",
    coreValues: "",
    ourHistory: "",
    privacyPolicy: "",
  });

  // ✅ UPDATED: Contact form state structure
  const [contactForm, setContactForm] = useState({
    contact_us: "",
    contact_info: "",
    hospital_address: "",
    telephone: "",
    mobile_numbers: {
      admitting: "",
      sales: "",
      emergency: "",
      outpatient: "",
      radiology: ""
    },
    email: ""
  });

  const [servicesForm, setServicesForm] = useState({
    shortTitle: "",
    fullTitle: "",
    topicTags: "",
  });

  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    alert("Please log in first!");
    return null;
  }

  // Initialize Quill editor for Services
  useEffect(() => {
    if (activeTab === "services" && quillRef.current && !quillRef.current.__quill) {
      const q = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Write your service description here...",
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
      quillRef.current.__quill = q;
    }
  }, [activeTab]);

  // Fetch About info whenever About tab is active
  useEffect(() => {
    if (activeTab === "about") {
      fetch("http://localhost:5000/api/about")
        .then((res) => res.json())
        .then((data) => {
          setAboutForm({
            aboutHospital: data.aboutHospital || "",
            mission: data.mission || "",
            vision: data.vision || "",
            qualityPolicy: data.qualityPolicy || "",
            coreValues: data.coreValues || "",
            ourHistory: data.ourHistory || "",
            privacyPolicy: data.privacyPolicy || "",
          });
        })
        .catch((err) => console.error("Error fetching about info:", err));
    }
  }, [activeTab]);

  // ✅ NEW: Fetch contact info when Contact tab is active
  useEffect(() => {
    if (activeTab === "contact") {
      fetch("http://localhost:5000/api/contact")
        .then((res) => res.json())
        .then((data) => {
          setContactForm({
            contact_us: data.contact_us || "",
            contact_info: data.contact_info || "",
            hospital_address: data.hospital_address || "",
            telephone: data.telephone || "",
            mobile_numbers: data.mobile_numbers || {
              admitting: "",
              sales: "",
              emergency: "",
              outpatient: "",
              radiology: ""
            },
            email: data.email || ""
          });
        })
        .catch((err) => console.error("Error fetching contact info:", err));
    }
  }, [activeTab]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isImage = file.type.startsWith("image/");
      const preview = isImage ? URL.createObjectURL(file) : null;
      setFileInfo({ name: file.name, type: file.type, preview, isImage });
    } else {
      setFileInfo(null);
    }
  };

  const handleAboutFormChange = (field, value) =>
    setAboutForm((prev) => ({ ...prev, [field]: value || "" }));

  // ✅ UPDATED: Handle contact form changes
  const handleContactFormChange = (field, value) =>
    setContactForm((prev) => ({ ...prev, [field]: value || "" }));

  // ✅ NEW: Handle mobile number changes
  const handleMobileNumberChange = (key, value) => {
    setContactForm((prev) => ({
      ...prev,
      mobile_numbers: {
        ...prev.mobile_numbers,
        [key]: value || ""
      }
    }));
  };

  const handleServicesFormChange = (field, value) =>
    setServicesForm((prev) => ({ ...prev, [field]: value || "" }));

  // Submit handler
  const handleSubmit = async (status) => {
    const mode = status === "draft" ? "Draft Saved" : "Published";

    try {
      if (activeTab === "general") {
        Swal.fire({ icon: "success", title: "General Settings Updated!" });
      } else if (activeTab === "about") {
        const res = await fetch("http://localhost:5000/api/about", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aboutForm),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Save failed");

        Swal.fire({ icon: "success", title: "About Info Updated!" });
      } else if (activeTab === "contact") {
        // ✅ UPDATED: Actually save contact info to database
        const res = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactForm),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Save failed");

        Swal.fire({ icon: "success", title: "Contact Info Updated!" });
      } else if (activeTab === "services") {
        const description = quillRef.current?.__quill?.root.innerHTML.trim();

        if (
          !servicesForm.shortTitle.trim() ||
          !servicesForm.fullTitle.trim() ||
          !description ||
          description === "<p><br></p>"
        ) {
          Swal.fire({
            icon: "error",
            title: "Missing Fields",
            text: "Please fill in Short Title, Full Title, and Description.",
          });
          return;
        }

        const formData = new FormData();
        formData.append("shortTitle", servicesForm.shortTitle.trim());
        formData.append("fullTitle", servicesForm.fullTitle.trim());
        formData.append("topicTags", servicesForm.topicTags.trim());
        formData.append("description", description);
        formData.append("status", status);

        if (fileInputRef.current?.files[0]) {
          formData.append("image", fileInputRef.current.files[0]);
        }

        formData.append("userId", currentUser.id);

        const res = await fetch("http://localhost:5000/api/services", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        Swal.fire({
          icon: "success",
          title: status === "draft" ? "Draft Saved!" : "Published Successfully!",
          confirmButtonColor: "#043873",
        });

        // Reset form
        setServicesForm({ shortTitle: "", fullTitle: "", topicTags: "" });
        setFileInfo(null);
        quillRef.current.__quill.setContents([]);
      }
    } catch (err) {
      console.error("Submission error:", err);
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  return (
    <div className="cms-announcement-page">
      <h2 className="title">About Hospital</h2>
      <ul className="breadcrumbs">
        <li>CMS</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>

      {/* Tabs */}
      <div className="cms-tabs">
        {["general", "about", "services", "contact"].map((tab) => (
          <div
            key={tab}
            className={`cms-tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("services", "Services")}
          </div>
        ))}
      </div>

      {/* Action Card */}
      <div className="card announcement-card">
        <div className="head">
          <h3 className="announcement-title">
            {activeTab === "general" && "General Settings Update"}
            {activeTab === "about" && "About Hospital Update"}
            {activeTab === "services" && "Services Update"}
            {activeTab === "contact" && "Contact Update"}
          </h3>
          <div className="announcement-actions">
            <button className="btn submit" onClick={() => handleSubmit("published")}>
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="cms-card cms-form-card">
        <form className="cms-form" onSubmit={(e) => e.preventDefault()}>
          {/* GENERAL */}
          {activeTab === "general" && <GeneralSettings />}

          {/* ABOUT */}
          {activeTab === "about" && (
            <div className="about-form-container">
              {[
                "Update the About Hospital",
                "Update the Mission",
                "Update the Vision",
                "Update the Quality Policy",
                "Update the Core Values",
                "Update the Our History",
                "Update the Privacy Policy",
              ].map((field) => (
                <div className="about-form-group" key={field}>
                  <label>{field.replace(/([A-Z])/g, " $1")}</label>
                  <textarea
                    value={aboutForm[field] || ""}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                    onChange={(e) => handleAboutFormChange(field, e.target.value)}
                    rows={4}
                  />
                </div>
              ))}
            </div>
          )}

          {/* ✅ UPDATED: CONTACT SECTION - Completely replaced */}
          {activeTab === "contact" && (
            <div className="about-form-container">
              <div className="about-form-group">
                <label>Contact Us Title</label>
                <input
                  type="text"
                  value={contactForm.contact_us || ""}
                  placeholder="Enter title (e.g., Get in Touch)"
                  onChange={(e) => handleContactFormChange("contact_us", e.target.value)}
                />
              </div>

              <div className="about-form-group">
                <label>Contact Info Description</label>
                <textarea
                  value={contactForm.contact_info || ""}
                  placeholder="Enter description"
                  onChange={(e) => handleContactFormChange("contact_info", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="about-form-group">
                <label>Hospital Address</label>
                <textarea
                  value={contactForm.hospital_address || ""}
                  placeholder="Enter hospital address"
                  onChange={(e) => handleContactFormChange("hospital_address", e.target.value)}
                  rows={2}
                />
              </div>

              <div className="about-form-group">
                <label>Telephone</label>
                <input
                  type="text"
                  value={contactForm.telephone || ""}
                  placeholder="Enter telephone number"
                  onChange={(e) => handleContactFormChange("telephone", e.target.value)}
                />
              </div>

              <div className="about-form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={contactForm.email || ""}
                  placeholder="Enter email address"
                  onChange={(e) => handleContactFormChange("email", e.target.value)}
                />
              </div>

              <div className="about-form-group">
                <label>Mobile Numbers</label>
                
                <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <label style={{ fontSize: "14px", fontWeight: "normal" }}>Admitting Section</label>
                    <input
                      type="text"
                      value={contactForm.mobile_numbers?.admitting || ""}
                      placeholder="Enter admitting section number"
                      onChange={(e) => handleMobileNumberChange("admitting", e.target.value)}
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label style={{ fontSize: "14px", fontWeight: "normal" }}>Sales and Marketing</label>
                    <input
                      type="text"
                      value={contactForm.mobile_numbers?.sales || ""}
                      placeholder="Enter sales number"
                      onChange={(e) => handleMobileNumberChange("sales", e.target.value)}
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label style={{ fontSize: "14px", fontWeight: "normal" }}>Emergency Department</label>
                    <input
                      type="text"
                      value={contactForm.mobile_numbers?.emergency || ""}
                      placeholder="Enter emergency number"
                      onChange={(e) => handleMobileNumberChange("emergency", e.target.value)}
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label style={{ fontSize: "14px", fontWeight: "normal" }}>Outpatient Department</label>
                    <input
                      type="text"
                      value={contactForm.mobile_numbers?.outpatient || ""}
                      placeholder="Enter outpatient number"
                      onChange={(e) => handleMobileNumberChange("outpatient", e.target.value)}
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label style={{ fontSize: "14px", fontWeight: "normal" }}>Radiology Department</label>
                    <input
                      type="text"
                      value={contactForm.mobile_numbers?.radiology || ""}
                      placeholder="Enter radiology number"
                      onChange={(e) => handleMobileNumberChange("radiology", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SERVICES */}
          {activeTab === "services" && (
            <>
              <div className="cms-form-row">
                {[
                  { key: "shortTitle", label: "Short Title" },
                  { key: "fullTitle", label: "Full Title" },
                  { key: "topicTags", label: "Topic Tags" },
                ].map(({ key, label }) => (
                  <div className="cms-form-group" key={key}>
                    <label>{label}</label>
                    <input
                      type="text"
                      value={servicesForm[key]}
                      placeholder={`Enter ${label}`}
                      onChange={(e) => handleServicesFormChange(key, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="cms-form-row" style={{ alignItems: "flex-start" }}>
                <div className="cms-form-group" style={{ flex: 2 }}>
                  <label>Description Box</label>
                  <div ref={quillRef} className="cms-quill-editor"></div>
                </div>

                <div className="cms-form-group" style={{ flex: 1 }}>
                  <label>Upload Image</label>
                  <div
                    className="file-upload-container"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file-input-hidden"
                    />
                    <label className="upload-label">
                      <IoMdCreate /> Choose Image
                    </label>
                    <div className="file-preview-area">
                      {fileInfo ? (
                        fileInfo.isImage && fileInfo.preview ? (
                          <img
                            src={fileInfo.preview}
                            alt="preview"
                            className="file-preview-img"
                          />
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
            </>
          )}

        </form>
      </div>
    </div>
  );
}