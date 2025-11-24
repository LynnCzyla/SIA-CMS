// src/components/modal/EditModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditModal({ post, onClose, onUpdated }) {
  const [form, setForm] = useState({
    short_title: "",
    full_title: "",
    topic_tags: "",
    description: "",
    author: "",
    image: null
  });

  useEffect(() => {
    if (!post) return;
    axios
      .get(`http://localhost:5000/api/posts/${post.category}/${post.id}`)
      .then((res) => {
        const d = res.data;
        setForm({
          short_title: d.short_title || "",
          full_title: d.full_title || "",
          topic_tags: d.topic_tags || "",
          description: d.description || "",
          author: d.author || "",
          image: null
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch post");
        onClose();
      });
  }, [post]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("short_title", form.short_title);
      data.append("full_title", form.full_title);
      data.append("topic_tags", form.topic_tags);
      data.append("description", form.description);
      data.append("author", form.author);
      if (form.image) data.append("image", form.image);

      await axios.put(`http://localhost:5000/api/posts/${post.category}/${post.id}`, data);
      onUpdated({ ...post, ...form }); // Update frontend immediately
      onClose();
      alert("Post updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!post) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* Close button upper-right */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "transparent",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          &times;
        </button>

        <h2>Edit Post</h2>
        <div className="modal-form">
          <label>Short Title</label>
          <input name="short_title" value={form.short_title} onChange={handleChange} />
          <label>Full Title</label>
          <input name="full_title" value={form.full_title} onChange={handleChange} />
          <label>Tags (comma-separated)</label>
          <input name="topic_tags" value={form.topic_tags} onChange={handleChange} />
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
          <label>Author</label>
          <input name="author" value={form.author} onChange={handleChange} />
          <label>Image</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>
        <div className="modal-buttons">
          <button className="modal-close" onClick={onClose}>Cancel</button>
          <button className="modal-save" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}
