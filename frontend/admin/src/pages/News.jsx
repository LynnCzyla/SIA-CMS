// frontend/admin/src/pages/News.jsx
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Quill from "quill";
import Swal from "sweetalert2";
import "../css/News.css";
import "quill/dist/quill.snow.css";
import { IoMdCreate } from "react-icons/io";

export default function News() {
  const location = useLocation();
  const post = location.state?.post; // post data passed via navigate
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please log in first!");
    return null;
  }

  const [shortTitle, setShortTitle] = useState("");
  const [fullTitle, setFullTitle] = useState("");
  const [tags, setTags] = useState("");
  const [fileInfo, setFileInfo] = useState(null);
  const [quillReady, setQuillReady] = useState(false);

  // Initialize Quill editor
  // Initialize Quill once
  useEffect(() => {
    console.log("🚀 Location state:", location.state);
    console.log("🚀 Post from state:", location.state?.post);
  }, [location.state]);
  
  useEffect(() => {
    if (!quillRef.current) {
      console.log("❌ Quill ref not ready yet");
      return;
    }
  
    if (quillRef.current.__quill) {
      console.log("✅ Quill already initialized");
      return;
    }
  
    console.log("⚡ Initializing Quill...");
    const quill = new Quill(quillRef.current, {
      theme: "snow",
      placeholder: "Write your news article here...",
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
    setQuillReady(true);
    console.log("✅ Quill initialized");
  
  }, []);
  
  useEffect(() => {
    console.log("📝 Pre-fill useEffect", { post, quillReady });
  
    if (!post) {
      console.log("❌ No post to pre-fill");
      return;
    }
  
    if (!quillReady) {
      console.log("⏳ Quill not ready yet, waiting...");
      return;
    }
  
    console.log("✅ Pre-filling form fields...");
  
    setShortTitle(post.short_title || "");
    setFullTitle(post.full_title || "");
    setTags(post.topic_tags || "");
  
    quillRef.current.__quill.clipboard.dangerouslyPasteHTML(post.description || "");
  
    if (post.image_url) {
      setFileInfo({
        file: null,
        name: post.image_name || "Existing Image",
        isImage: true,
        preview: post.image_url,
      });
    }
  
  }, [post, quillReady]);
  

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const preview = isImage ? URL.createObjectURL(file) : null;

    setFileInfo({ file, name: file.name, isImage, preview });
  };

  // Handle form submit
  const handleSubmit = async (status) => {
    const description = quillRef.current.__quill.root.innerHTML;
    const formData = new FormData();

    formData.append("short_title", shortTitle);
    formData.append("full_title", fullTitle);
    formData.append("topic_tags", tags);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("author", user.id);

    if (fileInfo?.file) formData.append("image", fileInfo.file);

    try {
      const url = post
        ? `http://localhost:5000/api/news/${post.id}` // PUT for edit
        : "http://localhost:5000/api/news";          // POST for create
      const method = post ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: `News ${post ? "updated" : status === "posted" ? "posted" : "saved"} successfully!`,
          timer: 2000,
          showConfirmButton: false,
        });
        if (!post) {
          // Reset form only for new posts
          setShortTitle("");
          setFullTitle("");
          setTags("");
          quillRef.current.__quill.setContents([]);
          setFileInfo(null);
        }
      } else {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Something went wrong" });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Server Error", text: "Failed to connect to backend." });
    }
  };

  return (
    <div className="cms-announcement-page">
      <h2 className="title">{post ? "Edit News Article" : "Create News Article"}</h2>
      <ul className="breadcrumbs">
        <li>News</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>

      {/* Header Card */}
      <div className="card announcement-card">
        <div className="head">
          <h3 className="announcement-title">
            {post ? "Edit News Article" : "Create a News Article"}
          </h3>
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
        <form className="cms-form" onSubmit={(e) => e.preventDefault()}>
          <div className="cms-form-row">
            <div className="cms-form-group">
              <label>Short Title</label>
              <input placeholder="Enter Short Title" type="text" value={shortTitle} onChange={(e) => setShortTitle(e.target.value)} />
            </div>
            <div className="cms-form-group">
              <label>Full Title</label>
              <input  placeholder="Enter Full Title"type="text" value={fullTitle} onChange={(e) => setFullTitle(e.target.value)} />
            </div>
            <div className="cms-form-group">
              <label>Topic Tags</label>
              <input placeholder="Enter Topic Tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
          </div>

          {/* Description + Image Upload */}
          <div className="cms-form-row" style={{ alignItems: "flex-start" }}>
            <div className="cms-form-group" style={{ flex: 2 }}>
              <label>Description Box</label>
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
                  <IoMdCreate style={{ marginRight: "8px" }} />
                  Choose Image
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
