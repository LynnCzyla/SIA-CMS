// src/components/modal/ViewModal.jsx
import React, { useEffect, useState } from "react";

export default function ViewModal({ post, onClose }) {
  const [details, setDetails] = useState(post);

  useEffect(() => {
    if (!post) return;
    // Fetch fresh details from server
    const fetchDetail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${encodeURIComponent(post.category)}/${encodeURIComponent(post.id)}`);
        if (res.ok) {
          const data = await res.json();
          setDetails(data);
        } else {
          setDetails(post); // fallback
        }
      } catch (err) {
        console.error("Failed to fetch post details", err);
        setDetails(post);
      }
    };
    fetchDetail();
  }, [post]);

  if (!details) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>{details.full_title || details.title || details.short_title}</h2>

        <div className="modal-content">
          <p><strong>Author:</strong> {details.author || "—"}</p>
          <p><strong>Category:</strong> {post.category}</p>
          <p><strong>Status:</strong> {details.status}</p>
          <p><strong>Date:</strong> {details.created_at ? new Date(details.created_at).toLocaleString() : "—"}</p>

          {details.image && (
            <div style={{ marginTop: 10 }}>
              <img src={typeof details.image === "string" && details.image.startsWith("http") ? details.image : `http://localhost:5000/uploads/${post.category.toLowerCase().replace(/\s/g,'_')}/${details.image}`} alt="post" style={{ width: "100%", borderRadius: 6 }} />
            </div>
          )}

          {details.description && (
            <>
              <hr />
              <div className="modal-text-box" dangerouslySetInnerHTML={{ __html: details.description }} />
            </>
          )}
        </div>

        <div style={{ marginTop: 14, textAlign: "right" }}>
          <button className="modal-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
