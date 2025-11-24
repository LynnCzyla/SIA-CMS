// src/pages/Posts.jsx
import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Posts.css";

export default function Posts() {
  const [activeTab, setActiveTab] = useState("All");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterAuthor, setFilterAuthor] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [logs, setLogs] = useState([]);
  const [logsPage, setLogsPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    fetchPosts();
    fetchLogs();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
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

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts/logs/all");
      const data = await res.json();
      setLogs(data || []);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  };

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
      filtered = filtered.filter((p) => (p.title || "").toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredPosts(filtered);
    setPage(1);
  }, [activeTab, posts, filterAuthor, filterCategory, filterDate, searchQuery]);

  // Handlers using SweetAlert2
  const handleView = (post) => {
    Swal.fire({
      title: post.title,
      html: `
        <p><strong>Author:</strong> ${post.author || "Unknown"}</p>
        <p><strong>Category:</strong> ${post.category || "Uncategorized"}</p>
        <p><strong>Status:</strong> ${post.normalizedStatus}</p>
        <p><strong>Date:</strong> ${post.date ? new Date(post.date).toLocaleString() : "—"}</p>
        <hr>
        <p>${post.content || "No content"}</p>
      `,
      width: 600,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Close",
    });
  };

  const handleEdit = (post) => {
    Swal.fire({
      title: "Edit Post",
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Title" value="${post.title || ""}">
        <input id="swal-category" class="swal2-input" placeholder="Category" value="${post.category || ""}">
        <textarea id="swal-content" class="swal2-textarea" placeholder="Content">${post.content || ""}</textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        const title = document.getElementById("swal-title").value;
        const category = document.getElementById("swal-category").value;
        const content = document.getElementById("swal-content").value;
        return { ...post, title, category, content };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPost = result.value;
        setPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
        Swal.fire("Saved!", "Post updated successfully.", "success");
      }
    });
  };

  const handleDelete = (post) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will move the post to Trash!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, status: "trash", normalizedStatus: "trash" } : p))
        );
        Swal.fire("Deleted!", "Post has been moved to Trash.", "success");
      }
    });
  };

  const authors = ["All", ...Array.from(new Set(posts.map((p) => p.author || "Unknown")))];
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category || "Uncategorized")))];

  const total = filteredPosts.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const pageItems = filteredPosts.slice((page - 1) * pageSize, page * pageSize);

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
          {/* Filters */}
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

          {/* Posts Table */}
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
                  <tr key={post.id}>
                    <td>{(page - 1) * pageSize + idx + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.category}</td>
                    <td>{post.normalizedStatus.charAt(0).toUpperCase() + post.normalizedStatus.slice(1)}</td>
                    <td>{post.date ? new Date(post.date).toLocaleString() : "—"}</td>
                    <td className="actions">
                      <button className="actions-btn edit" onClick={() => handleEdit(post)}>Edit</button>
                      <button className="actions-btn view" onClick={() => handleView(post)}>View</button>
                      <button className="actions-btn delete" onClick={() => handleDelete(post)}>Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="7" className="no-posts">No posts found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav aria-label="Posts pagination">
            <ul className="pagination justify-content-center mt-3">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
              </li>
              {Array.from({ length: pages }).map((_, i) => (
                <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${page === pages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          {/* Logs Table */}
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
                )) : <tr><td colSpan="7" className="no-posts">No logs found.</td></tr>}
              </tbody>
            </table>
          </div>

          {/* Logs Pagination */}
          <nav aria-label="Logs pagination">
            <ul className="pagination justify-content-center mt-3">
              <li className={`page-item ${logsPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setLogsPage(logsPage - 1)}>Previous</button>
              </li>
              {Array.from({ length: logsPages }).map((_, i) => (
                <li key={i} className={`page-item ${logsPage === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setLogsPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${logsPage === logsPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setLogsPage(logsPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
