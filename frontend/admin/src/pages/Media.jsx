import { useEffect, useState } from "react";
import { FaUpload, FaEye, FaTrash, FaTag } from "react-icons/fa";
import Swal from "sweetalert2";
import "../css/Media.css";

export default function Media() {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 5;
  const API_BASE = "http://26.41.72.16:5000";

  // ------------------ Fetch files ------------------
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/media/files`);
      const data = await res.json();
      if (data.files) setFiles(data.files);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

 const uploadFiles = async (fileList) => {
  for (let file of fileList) {
    const { value: title } = await Swal.fire({
      title: "Enter File Title",
      input: "text",
      inputLabel: `Title for: ${file.name}`,
      inputPlaceholder: "Enter title here",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "Title is required!";
      },
      inputAttributes: {
        style: "width: 100%; max-width: 450px; padding: 8px; border-radius: 6px; border: 1px solid #4f9cf9;",
      },
      confirmButtonColor: "#043873",
      background: "#f3f7ff",
      color: "#043873",
    });

    if (!title) continue;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      const res = await fetch(`${API_BASE}/api/media/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setFiles((prev) => [data.file, ...prev]);
      setCurrentPage(1);
    } catch (err) {
      console.error("Upload error:", err);
      Swal.fire({
        title: "Error!",
        text: `Failed to upload ${file.name}`,
        icon: "error",
        confirmButtonColor: "#e11d48",
        background: "#f3f7ff",
        color: "#043873",
      });
    }
  }

  Swal.fire({
    title: "✅ Uploaded!",
    text: "Files uploaded successfully.",
    icon: "success",
    confirmButtonColor: "#043873",
    background: "#f3f7ff",
    color: "#043873",
  });
};


  const handleFileUpload = (e) => uploadFiles(e.target.files);
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) uploadFiles(e.dataTransfer.files);
  };
  const handleDragOver = (e) => e.preventDefault();

  // ------------------ View file ------------------
  const handleView = (fileUrl, fileName) => {
    Swal.fire({
      title: fileName,
      html: `<img src="${fileUrl}" alt="${fileName}" style="max-width:100%; border-radius:10px;" />`,
      showCloseButton: true,
      showConfirmButton: false,
      background: "#f3f7ff",
      color: "#043873",
    });
  };

  // ------------------ Assign / Unassign ------------------
  const handleAssign = async (filename, currentSection) => {
    const { value: section } = await Swal.fire({
      title: "Assign File",
      html: `
        <div style="font-family: Inter, sans-serif;">
          <label style="font-weight: 600; color: #043873;">Choose Section:</label>
          <select id="assignSelect" style="width:100%; padding:10px; border:1px solid #4f9cf9; border-radius:8px;">
            <option value="">-- Unassigned --</option>
            <option value="home-carousel">Home Carousel</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => document.getElementById("assignSelect").value,
    });

    if (section !== undefined) {
      try {
        const res = await fetch(`${API_BASE}/api/media/assign`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename, section: section || null }),
        });
        if (!res.ok) throw new Error("Assign failed");
        const data = await res.json();

        setFiles((prev) =>
          prev.map((f) =>
            f.filename === filename ? { ...f, section: data.section } : f
          )
        );

        Swal.fire({
          title: "✅ Success",
          text: `File ${section ? "assigned to " + section.replace("-", " ") : "unassigned"}`,
          icon: "success",
          confirmButtonColor: "#043873",
          background: "#f3f7ff",
          color: "#043873",
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "Failed to assign file",
          icon: "error",
          confirmButtonColor: "#e11d48",
          background: "#f3f7ff",
          color: "#043873",
        });
      }
    }
  };

  // ------------------ Delete file ------------------
  const handleDelete = (filename) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This file will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#4f9cf9",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "#f3f7ff",
      color: "#043873",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_BASE}/api/media/delete/${filename}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Delete failed");
          setFiles((prev) => prev.filter((f) => f.filename !== filename));
          Swal.fire({
            title: "Deleted!",
            text: "File deleted successfully.",
            icon: "success",
            confirmButtonColor: "#043873",
            background: "#f3f7ff",
            color: "#043873",
          });
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete file.",
            icon: "error",
            confirmButtonColor: "#e11d48",
            background: "#f3f7ff",
            color: "#043873",
          });
        }
      }
    });
  };

  // ------------------ Pagination ------------------
  const totalPages = Math.ceil(files.length / filesPerPage);
  const currentFiles = files.slice(
    (currentPage - 1) * filesPerPage,
    currentPage * filesPerPage
  );

  // ------------------ JSX ------------------
  return (
   <div className="cms-announcement-page">
      <h2 className="title">Media Library</h2>
      <ul className="breadcrumbs">
        <li>Media Library</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>
      {/* Upload */}
      <div
        className="cms-card media-upload-card"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="upload-area">
          <input
            type="file"
            id="mediaUpload"
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <label htmlFor="mediaUpload" className="upload-box">
            <FaUpload className="upload-icon" />
            <p>
              <strong>Drag and Drop Files</strong> or <span>Browse</span>
            </p>
            <small>Supported formats: jpg and png</small>
          </label>
        </div>
      </div>

      {/* Files Table */}
      <div className="cms-card media-table-card">
        <table className="media-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>File Name</th>
              <th>Size</th>
              <th>Assigned Section</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFiles.length ? (
              currentFiles.map((file) => (
                <tr key={file.id || file.filename}>
                  <td>{file.date_uploaded ? new Date(file.date_uploaded).toLocaleDateString() : "—"}</td>
                  <td>{file.name}</td>
                  <td>{file.size}</td>
                  <td>
                    {file.section ? (
                      <span className="assigned">{file.section.replace("-", " ")}</span>
                    ) : (
                      <span className="unassigned">Unassigned</span>
                    )}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="view" onClick={() => handleView(file.url, file.name)}>
                        <FaEye /> View
                      </button>
                      <button className="assign" onClick={() => handleAssign(file.filename, file.section)}>
                        <FaTag /> {file.section ? "Change" : "Assign"}
                      </button>
                      {file.section && (
                        <button className="unassign" onClick={() => handleAssign(file.filename, null)}>
                          Unassign
                        </button>
                      )}
                      <button className="delete" onClick={() => handleDelete(file.filename)}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-records">
                  No uploads yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="media-pagination">
            <span
              className={currentPage === 1 ? "disabled" : ""}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >
              ← Previous
            </span>
            {[...Array(totalPages)].map((_, i) => (
              <span
                key={i}
                className={`page ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </span>
            ))}
            <span
              className={currentPage === totalPages ? "disabled" : ""}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            >
              Next →
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
