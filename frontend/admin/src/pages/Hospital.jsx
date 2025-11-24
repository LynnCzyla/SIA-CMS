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

  const [contactForm, setContactForm] = useState({
    contactUs: "",
    contactInfo: "",
    mobileNumbers: "",
  });

  const [servicesForm, setServicesForm] = useState({
    shortTitle: "",
    fullTitle: "",
    topicTags: "",
  });

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isImage = file.type.startsWith("image/");
      const preview = isImage ? URL.createObjectURL(file) : null;
      setFileInfo({ name: file.name, type: file.type, preview, isImage });
    }
  };

  const handleAboutFormChange = (field, value) =>
    setAboutForm((prev) => ({ ...prev, [field]: value }));

  const handleContactFormChange = (field, value) =>
    setContactForm((prev) => ({ ...prev, [field]: value }));

  const handleServicesFormChange = (field, value) =>
    setServicesForm((prev) => ({ ...prev, [field]: value }));

  // Submit handler
  const handleSubmit = async (status) => {
    const mode = status === "draft" ? "Draft Saved" : "Published";

    try {
      let content;

      if (activeTab === "general") {
        content = "General Settings Updated";
      } else if (activeTab === "about") {
        // Send About form to backend
        const res = await fetch("http://localhost:5000/api/about", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aboutForm),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Save failed");

        // Refetch latest about info to update input fields
        const latest = await fetch("http://localhost:5000/api/about").then((r) => r.json());
        setAboutForm({
          aboutHospital: latest.aboutHospital || "",
          mission: latest.mission || "",
          vision: latest.vision || "",
          qualityPolicy: latest.qualityPolicy || "",
          coreValues: latest.coreValues || "",
          ourHistory: latest.ourHistory || "",
          privacyPolicy: latest.privacyPolicy || "",
        });

        content = data;
      } else if (activeTab === "contact") {
        content = contactForm;
      } else if (activeTab === "services") {
        const description = quillRef.current?.__quill?.root.innerHTML || "";

        const formData = new FormData();
        formData.append("shortTitle", servicesForm.shortTitle);
        formData.append("fullTitle", servicesForm.fullTitle);
        formData.append("topicTags", servicesForm.topicTags);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("author", "Admin");
        if (fileInfo?.preview) formData.append("image", fileInputRef.current.files[0]);

        const res = await fetch("http://localhost:5000/api/services", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        content = data;
        setServicesForm({ shortTitle: "", fullTitle: "", topicTags: "" });
        setFileInfo(null);
        quillRef.current.__quill.setContents([]);
      }

      Swal.fire({
        icon: "success",
        title: `${mode} Successfully!`,
        text: `Your content has been ${status}.`,
        confirmButtonColor: "#043873",
      });

      console.log({ tab: activeTab, content, status });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  return (
    <div className="cms-announcement-page">
      <h2 className="title">Hospital CMS Management</h2>
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
                "aboutHospital",
                "mission",
                "vision",
                "qualityPolicy",
                "coreValues",
                "ourHistory",
                "privacyPolicy",
              ].map((field) => (
                <div className="about-form-group" key={field}>
                <label>{field.replace(/([A-Z])/g, " $1")}</label>
                <textarea
                  value={aboutForm[field]}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                  onChange={(e) => handleAboutFormChange(field, e.target.value)}
                  rows={4} // you can adjust the number of visible rows
                />
              </div>
              ))}
            </div>
          )}

          {/* CONTACT */}
          {activeTab === "contact" && (
            <div className="about-form-container">
              {["contactUs", "contactInfo", "mobileNumbers"].map((field) => (
                <div className="about-form-group" key={field}>
                  <label>{field.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    type="text"
                    value={contactForm[field]}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                    onChange={(e) => handleContactFormChange(field, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* SERVICES */}
          {activeTab === "services" && (
            <>
              <div className="cms-form-row">
                {["ShortTitle", "FullTitle", "TopicTags"].map((field) => (
                  <div className="cms-form-group" key={field}>
                    <label>{field.replace(/([A-Z])/g, " $1")}</label>
                    <input
                      type="text"
                      value={servicesForm[field]}
                      placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                      onChange={(e) => handleServicesFormChange(field, e.target.value)}
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
            </>
          )}
        </form>
      </div>
    </div>
  );
}
