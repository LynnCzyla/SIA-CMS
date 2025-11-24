// src/components/modal/DeleteModal.jsx
import React, { useState } from "react";

export default function DeleteModal({ post, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");

  const handleTrash = async () => {
    if (!post) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/posts/trash/${encodeURIComponent(post.category)}/${encodeURIComponent(post.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: author || post.author || "admin" }),
      });

      const json = await res.json();
      if (!res.ok) {
        alert(json.message || "Failed to move to trash");
        setLoading(false);
        return;
      }
      onDeleted(post.id);
      setLoading(false);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to connect");
      setLoading(false);
    }
  };

  if (!post) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Move to Trash?</h3>
        <p>Move <strong>{post.title || post.full_title || post.short_title}</strong> to trash?</p>

        <label>Editor (optional)</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" />

        <div className="modal-buttons">
          <button className="modal-delete" onClick={handleTrash} disabled={loading}>{loading ? "Moving..." : "Yes, Move to Trash"}</button>
          <button className="modal-close" onClick={onClose} disabled={loading}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
