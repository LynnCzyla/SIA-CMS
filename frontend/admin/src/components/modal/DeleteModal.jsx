// src/components/modal/DeleteModal.jsx
import React from "react";
import axios from "axios";

export default function DeleteModal({ post, onClose, onDeleted }) {
  const handleDelete = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/trash/${post.category}/${post.id}`, {
        author: post.author
      });
      onDeleted(post.id);
      onClose();
      alert("Post moved to trash");
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
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

        <h2>Confirm Delete</h2>
        <p>Are you sure you want to move <strong>{post.title}</strong> to trash?</p>
        <div className="modal-buttons">
          <button className="modal-close" onClick={onClose}>Cancel</button>
          <button className="modal-delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
