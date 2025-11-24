// src/components/modal/EditModal.jsx
import React, { useEffect, useState } from "react";

export default function EditModal({ post, onClose, onUpdated }) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({
    full_title: "",
    description: "",
    topic_tags: "",
    image: "",
    author: "",
    slug: "",
    status: "draft",
  });

  useEffect(() => {
    if (!post) return;
    const fetchDetail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${encodeURIComponent(post.category)}/${encodeURIComponent(post.id)}`);
        if (!res.ok) {
          setDetail(post);
          setForm({
            full_title: post.title || post.full_title || "",
            description: post.description || "",
            topic_tags: post.topic_tags || "",
            image: post.image || "",
            author: post.author || "",
            slug: post.slug || "",
            status: post.status || "draft",
          });
        } else {
          const data = await res.json();
          setDetail(data);
          setForm({
            full_title: data.full_title || data.title || "",
            description: data.description || "",
            topic_tags: data.topic_tags || "",
            image: data.image || "",
            author: data.author || "",
            slug: data.slug || "",
            status: data.status || "draft",
          });
        }
      } catch (err) {
        console.error("Failed to load details", err);
        setDetail(post);
      }
    };
    fetchDetail();
  }, [post]);

  const updateField = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const handleSave = async () => {
    if (!form.full_title.trim()) return alert("Title is required");
    setLoading(true);
    try {
      const body = {
        full_title: form.full_title,
        description: form.description,
        topic_tags: form.topic_tags,
        image: form.image,
        author: form.author,
        slug: form.slug,
        status: form.status,
      };

      const res = await fetch(`http://localhost:5000/api/posts/${encodeURIComponent(post.category)}/${encodeURIComponent(post.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) {
        alert(json.message || "Update failed");
        setLoading(false);
        return;
      }

      // Pass updated minimal object to parent
      const updated = {
        ...post,
        id: post.id,
        title: form.full_title,
        full_title: form.full_title,
        description: form.description,
        topic_tags: form.topic_tags,
        image: form.image,
        author: form.author,
        slug: form.slug,
        status: form.status,
        updated_at: new Date().toISOString(),
      };

      onUpdated(updated);
      setLoading(false);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
      setLoading(false);
    }
  };

  if (!post) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Post</h2>

        <div className="modal-form">
          <label>Full Title</label>
          <input value={form.full_title} onChange={(e) => updateField("full_title", e.target.value)} />

          <label>Description (HTML allowed)</label>
          <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} />

          <label>Topic Tags (comma separated)</label>
          <input value={form.topic_tags} onChange={(e) => updateField("topic_tags", e.target.value)} />

          <label>Image (filename or absolute url)</label>
          <input value={form.image} onChange={(e) => updateField("image", e.target.value)} />

          <div className="modal-row">
            <div style={{ flex: 1 }}>
              <label>Author</label>
              <input value={form.author} onChange={(e) => updateField("author", e.target.value)} />
            </div>

            <div style={{ flex: 1 }}>
              <label>Status</label>
              <select value={form.status} onChange={(e) => updateField("status", e.target.value)}>
                <option value="draft">Draft</option>
                <option value="posted">Posted</option>
                <option value="published">Published</option>
                <option value="trash">Trash</option>
              </select>
            </div>
          </div>

          <label>Slug</label>
          <input value={form.slug} onChange={(e) => updateField("slug", e.target.value)} />
        </div>

        <div className="modal-buttons">
          <button className="modal-save" onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
          <button className="modal-close" onClick={onClose} disabled={loading}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
