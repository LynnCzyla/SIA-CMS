// src/pages/Posts.jsx
import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";

import ViewModal from "../components/modal/ViewModal";
import EditModal from "../components/modal/EditModal";
import DeleteModal from "../components/modal/DeleteModal";

import "../css/Posts.css";

export default function Posts() {
  const [activeTab, setActiveTab] = useState("All");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // filters
  const [filterAuthor, setFilterAuthor] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // modals
  const [selectedPost, setSelectedPost] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // pagination (client-side)
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // logs (Edit Logs tab)
  const [logs, setLogs] = useState([]);
  const [logsPage, setLogsPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    fetchPosts();
    fetchLogs();
  }, []);

  // fetch aggregated posts
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      // ensure date is present
      const enriched = (data || []).map((p) => ({
        ...p,
        date: p.date || p.created_at || null,
        status: (p.status || "").toLowerCase(),
      }));
      setPosts(enriched);
    } catch (err) {
      console.error("Failed to fetch posts", err);
      alert("Failed to load posts");
    }
  };

  // fetch logs
  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts/logs/all");
      const data = await res.json();
      setLogs(data || []);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  };

  // apply filters
  useEffect(() => {
    let filtered = posts.map((p) => ({
      ...p,
      normalizedStatus:
        ["posted", "publish", "published"].includes((p.status || "").toLowerCase())
          ? "published"
          : ["draft", "pending"].includes((p.status || "").toLowerCase())
          ? "draft"
          : ["trash", "deleted", "archived"].includes((p.status || "").toLowerCase())
          ? "trash"
          : p.status || "draft",
    }));

    if (activeTab === "Published") filtered = filtered.filter((p) => p.normalizedStatus === "published");
    if (activeTab === "Drafts") filtered = filtered.filter((p) => p.normalizedStatus === "draft");
    if (activeTab === "Trash") filtered = filtered.filter((p) => p.normalizedStatus === "trash");

    if (filterAuthor !== "All") filtered = filtered.filter((p) => (p.author || "Unknown") === filterAuthor);
    if (filterCategory !== "All") filtered = filtered.filter((p) => (p.category || "Uncategorized") === filterCategory);

    if (filterDate === "Today") {
      const today = new Date().toISOString().split("T")[0];
      filtered = filtered.filter((p) => (p.date || "").startsWith(today));
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((p) =>
        (p.title || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
    setPage(1);
  }, [activeTab, posts, filterAuthor, filterCategory, filterDate, searchQuery]);

  // open modals
  const openView = (post) => {
    setSelectedPost(post);
    setShowViewModal(true);
  };
  const openEdit = (post) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };
  const openDelete = (post) => {
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const handleApplyEdit = (updated) => {
    setPosts((prev) => prev.map((p) => (String(p.id) === String(updated.id) ? { ...p, ...updated } : p)));
  };

  const handleApplyDelete = (postId) => {
    setPosts((prev) => prev.map((p) => (String(p.id) === String(postId) ? { ...p, status: "trash", normalizedStatus: "trash" } : p)));
  };

  // derived lists for filters
  const authors = ["All", ...Array.from(new Set(posts.map((p) => p.author || "Unknown")))];
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category || "Uncategorized")))];
  
  // pagination helpers
  const total = filteredPosts.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const pageItems = filteredPosts.slice((page - 1) * pageSize, page * pageSize);

  // logs pagination (simple client-side)
  const logsTotal = logs.length;
  const logsPages = Math.max(1, Math.ceil(logsTotal / logsPerPage));
  const logsPageItems = logs.slice((logsPage - 1) * logsPerPage, logsPage * logsPerPage);

  return (
    <div className="cms-announcement-page">
      <h2 className="title">Posts</h2>

      <ul className="breadcrumbs">
        <li>Posts Log</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>

      <div className="tab-row">
        {["All", "Published", "Drafts", "Trash", "Edit Logs"].map((label) => (
          <span
            key={label}
            className={`tab-item ${activeTab === label ? "active" : ""}`}
            onClick={() => setActiveTab(label)}
          >
            {label}
          </span>
        ))}
      </div>

      {activeTab !== "Edit Logs" ? (
        <>
          <div className="filter-bar">
            <button className="sort-btn"><IoFilter /> Sort</button>

            <select className="filter-select" value={filterAuthor} onChange={(e) => setFilterAuthor(e.target.value)}>
              {authors.map((a) => <option key={a}>{a}</option>)}
            </select>

            <select className="filter-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>

            <select className="filter-select" value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
              <option>All</option>
              <option>Today</option>
            </select>

            <div className="search-box">
              <input type="text" placeholder="Search by title..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button className="search-btn"><IoMdSearch /></button>
            </div>
          </div>

          <div className="table-container">
            <table className="posts-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Title</th>
                  <th>Published By</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.length ? pageItems.map((post, idx) => (
                  <tr key={`${post.category}-${post.id}`}>
                    <td>{(page - 1) * pageSize + idx + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.category}</td>
                    <td>{(post.normalizedStatus || post.status || "draft").charAt(0).toUpperCase() + (post.normalizedStatus || post.status || "draft").slice(1)}</td>
                    <td className={!post.date ? "empty-date" : ""}>{post.date ? new Date(post.date).toLocaleString() : "—"}</td>
                    <td className="actions">
                      <button className="actions-btn edit" onClick={() => openEdit(post)}>Edit</button>
                      <button className="actions-btn view" onClick={() => openView(post)}>View</button>
                      <button className="actions-btn delete" onClick={() => openDelete(post)}>Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="7" className="no-posts">No posts found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <div className="pagination">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} className={i + 1 === page ? "active-page" : ""} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>Next</button>
          </div>
        </>
      ) : (
        // Edit Logs tab
        <div>
          <h3>Edit Logs</h3>
          <div className="table-container">
            <table className="posts-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Post ID</th>
                  <th>Category</th>
                  <th>Action</th>
                  <th>Editor</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {logsPageItems.length ? logsPageItems.map((l, idx) => (
                  <tr key={l.id}>
                    <td>{(logsPage - 1) * logsPerPage + idx + 1}</td>
                    <td style={{ fontFamily: "monospace" }}>{l.post_id}</td>
                    <td>{l.category}</td>
                    <td>{l.action}</td>
                    <td>{l.editor}</td>
                    <td style={{ maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.message}</td>
                    <td>{new Date(l.created_at).toLocaleString()}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="7" className="no-posts">No logs</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button onClick={() => setLogsPage((p) => Math.max(1, p - 1))} disabled={logsPage === 1}>Prev</button>
            {Array.from({ length: logsPages }).map((_, i) => (
              <button key={i} className={logsPage === i + 1 ? "active-page" : ""} onClick={() => setLogsPage(i + 1)}>{i + 1}</button>
            ))}
            <button onClick={() => setLogsPage((p) => Math.min(logsPages, p + 1))} disabled={logsPage === logsPages}>Next</button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showViewModal && (
        <ViewModal
          post={selectedPost}
          onClose={() => setShowViewModal(false)}
        />
      )}
      {showEditModal && (
        <EditModal
          post={selectedPost}
          onClose={() => setShowEditModal(false)}
          onUpdated={(updated) => {
            handleApplyEdit(updated);
            setShowEditModal(false);
          }}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          post={selectedPost}
          onClose={() => setShowDeleteModal(false)}
          onDeleted={(id) => {
            handleApplyDelete(id);
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}
