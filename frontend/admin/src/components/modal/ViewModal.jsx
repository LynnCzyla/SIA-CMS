// src/components/modal/ViewModal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewModal({ post, onClose }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!post) return;
    axios
      .get(`http://localhost:5000/api/posts/${post.category}/${post.id}`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch post details");
        onClose();
      });
  }, [post]);

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

        <h2>{data?.full_title || post.title}</h2>
        <p><strong>Author:</strong> {data?.author || post.author}</p>
        <p><strong>Category:</strong> {post.category}</p>
        <p><strong>Status:</strong> {post.status}</p>
        {data?.image && (
          <img
            src={`http://localhost:5000/uploads/${post.category.toLowerCase().replace(/\s+/g,'_')}/${data.image}`}
            alt="post"
            style={{ maxWidth: "100%", marginTop: "10px", borderRadius: "6px" }}
          />
        )}
        <div className="modal-text-box" style={{ marginTop: "12px" }}>
          <p>{data?.description}</p>
        </div>
        <div className="modal-buttons">
          <button className="modal-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
