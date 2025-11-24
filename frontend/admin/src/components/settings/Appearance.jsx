// FULLY FIXED VERSION — COMPLETE & WORKING
// localhost:5000 = API
// localhost:5174 = WEBSITE

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

function Appearance() {
  const [selectedLayout, setSelectedLayout] = useState("classic");

  // FONT SYSTEM
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [fontSize, setFontSize] = useState("Medium");
  const [fontColor, setFontColor] = useState("Header");
  const [previewText, setPreviewText] = useState("");

  // THEME COLOR
  const [themeColor, setThemeColor] = useState("bg-primary");

  const [loading, setLoading] = useState(false);
  const [fetchingLayout, setFetchingLayout] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  // -----------------------------
  // FETCH CURRENT LAYOUT
  // -----------------------------
  useEffect(() => {
    fetchCurrentLayout();
  }, []);

  const fetchCurrentLayout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/layout");
      if (res.data.layout) {
        setSelectedLayout(res.data.layout);
      }
    } catch (err) {
      console.error("Failed to fetch layout:", err);
      showMessage("error", "Failed to load current layout settings");
    } finally {
      setFetchingLayout(false);
    }
  };

  // LIVE APPLY LAYOUT
  useEffect(() => {
    document.body.classList.remove("classic", "modern", "compact");
    document.body.classList.add(selectedLayout);
  }, [selectedLayout]);

  // SHOW ALERT MESSAGE
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // -----------------------------
  // SAVE APPEARANCE
  // -----------------------------
  const handleSave = async () => {
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/layout", {
        layout: selectedLayout,
        fontFamily,
        fontSize,
        fontColor,
        themeColor,
      });

      if (res.data.success) {
        Swal.fire({
          title: "Appearance Saved!",
          text: "Your website appearance has been updated.",
          icon: "success",
          confirmButtonText: "Preview Website",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          window.open("http://localhost:5173/", "_blank");
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Failed to save appearance settings.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // CANCEL = RESTORE DEFAULTS
  // -----------------------------
  const handleCancel = () => {
    fetchCurrentLayout();

    setFontFamily("Poppins");
    setFontSize("Medium");
    setFontColor("Header");
    setPreviewText("");
    setThemeColor("bg-primary");

    Swal.fire({
      title: "Changes Reverted",
      text: "Your appearance settings were restored.",
      icon: "info",
      confirmButtonColor: "#2563eb",
    });
  };

  // -----------------------------
  // LAYOUT INFO
  // -----------------------------
  const layoutInfo = {
    classic: {
      title: "Classic Layout",
      description: "Professional medical-style layout",
      features: ["Traditional structure", "Standard ordering", "Blue color theme"],
      preview: "Home → Welcome → Services → Announcements → Contact",
    },
    modern: {
      title: "Modern Layout",
      description: "Contemporary gradient layout",
      features: ["Glass morphism", "Gradient sections", "Reordered UI"],
      preview: "Home → Services → Announcements → Welcome → Contact",
    },
  };

  // ----------------------------------------
  // LIVE FONT PREVIEW STYLE GENERATION
  // ----------------------------------------
  const previewStyle = {
    fontFamily,
    fontSize: fontSize === "Small" ? "14px" : fontSize === "Medium" ? "18px" : "22px",
    color: fontColor === "Header" ? "#000" : "#444",
    minHeight: "60px",
    padding: "12px",
    borderRadius: "6px",
    background:
      themeColor === "bg-primary"
        ? "#e8f0ff"
        : themeColor === "bg-info"
        ? "#e6faff"
        : "#f5f5f5",
  };

  return (
    <div className="cms-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="cms-section-title mb-0">Appearance Settings</h3>
        {fetchingLayout && <span className="badge bg-secondary">Loading current settings...</span>}
      </div>

      {/* INFO MESSAGE */}
      {message.text && (
        <div className={`alert alert-${message.type === "error" ? "danger" : "info"} d-flex align-items-center`}>
          <FaInfoCircle className="me-2" /> {message.text}
        </div>
      )}

      <div className="row">
        {/* FONT FAMILY */}
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Font Family</label>
          <select className="form-select" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
            <option>Poppins</option>
            <option>Roboto</option>
            <option>Inter</option>
            <option>Arial</option>
          </select>
        </div>

        {/* FONT SIZE */}
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Font Size</label>
          <select className="form-select" value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>

        {/* FONT COLOR */}
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Font Color</label>
          <select className="form-select" value={fontColor} onChange={(e) => setFontColor(e.target.value)}>
            <option>Header</option>
            <option>Body</option>
          </select>
        </div>

        {/* PREVIEW TEXT */}
        <div className="col-md-12 mb-4">
          <label className="form-label fw-semibold">Text Preview</label>
          <input
            className="form-control"
            placeholder="Type to preview..."
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
          />

          <div className="mt-3" style={previewStyle}>
            {previewText || "Your preview text will appear here..."}
          </div>
        </div>

        {/* THEME COLORS */}
        <div className="col-md-12 mb-4">
          <h6 className="fw-semibold mb-3">Theme Colors</h6>
          <div className="d-flex gap-3">
            {[
              { color: "bg-primary", name: "Primary Blue", box: "#2563eb" },
              { color: "bg-info", name: "Info Cyan", box: "#0ea5e9" },
              { color: "bg-light", name: "Light Gray", box: "#d1d5db" },
            ].map((theme) => (
              <div key={theme.color} className="text-center">
                <div
                  className="rounded"
                  style={{
                    width: "60px",
                    height: "60px",
                    cursor: "pointer",
                    background: theme.box,
                    border: themeColor === theme.color ? "3px solid #000" : "2px solid #ccc",
                  }}
                  onClick={() => setThemeColor(theme.color)}
                ></div>
                <small>{theme.name}</small>
              </div>
            ))}
          </div>
        </div>

        {/* LAYOUT CARDS */}
        <div className="col-md-12 mt-4">
          <h5 className="fw-bold mb-3">Website Layout</h5>
          <div className="row g-3">
            {["classic", "modern"].map((layout) => (
              <div key={layout} className="col-md-6">
                <div
                  className={`card h-100 ${selectedLayout === layout ? "border-primary border-3" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedLayout(layout)}
                >
                  {selectedLayout === layout && (
                    <div className="position-absolute top-0 end-0 m-2 bg-success text-white px-3 py-1 rounded">
                      <FaCheckCircle /> SELECTED
                    </div>
                  )}

                  <div className="card-body">
                    <div
                      className="rounded mb-3 text-white text-center"
                      style={{
                        height: "120px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background:
                          layout === "modern"
                            ? "linear-gradient(135deg, #4f9cf9, #2563eb)"
                            : "linear-gradient(135deg, #043873, #0a5a9e)",
                      }}
                    >
                      {layout.toUpperCase()}
                    </div>

                    <h6 className="fw-bold">{layoutInfo[layout].title}</h6>
                    <p className="text-muted small">{layoutInfo[layout].description}</p>

                    <div className="p-2 bg-light rounded small mb-2">{layoutInfo[layout].preview}</div>

                    <ul className="small text-muted">
                      {layoutInfo[layout].features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="col-md-12 mt-4">
          <div className="d-flex gap-3">
            <button className="btn btn-primary px-4 py-2" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : <><FaCheckCircle className="me-2" /> Save Changes</>}
            </button>

            <button className="btn btn-secondary px-4 py-2" onClick={handleCancel} disabled={loading}>
              Cancel
            </button>

            <button
              className="btn btn-outline-info px-4 py-2 ms-auto"
              onClick={() => window.open("http://localhost:5173/", "_blank")}
            >
              Preview Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appearance;
