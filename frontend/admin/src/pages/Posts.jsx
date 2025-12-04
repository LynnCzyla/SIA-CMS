// frontend/admin/src/pages/Posts.jsx
import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import ViewModal from "../components/modal/ViewModal";
import EditModal from "../components/modal/EditModal";
import DeleteModal from "../components/modal/DeleteModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Posts.css";

export default function Posts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Filters
  const [filterAuthor, setFilterAuthor] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [selectedPost, setSelectedPost] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Logs
  const [logs, setLogs] = useState([]);
  const [logsPage, setLogsPage] = useState(1);
  const logsPerPage = 10;

  // Pending Jobs (from /api/jobs/pending)
  const [pendingJobs, setPendingJobs] = useState([]);
  const [pendingPage, setPendingPage] = useState(1);
  const pendingPerPage = 10;

  const role = localStorage.getItem("role"); 
  console.log("Logged-in role:", role);

  useEffect(() => {
    fetchPosts();
    fetchLogs();
    fetchPendingJobs();
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

  const fetchPendingJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs/pending");
      const data = await res.json();
      if (data.success) {
        setPendingJobs(data.jobs || []);
      }
    } catch (err) {
      console.error("Failed to fetch pending jobs", err);
    }
  };

  // Handle Review - Navigate to Careers page
  const handleReviewInCareers = (jobId) => {
    navigate("/careers", {
      state: {
        pendingJobId: jobId,
        scrollToPending: true,
      },
    });
  };

  // Filter posts
  useEffect(() => {
    let filtered = posts.map((p) => ({
      ...p,
      normalizedStatus: ["posted", "publish", "published"].includes(
        (p.status || "").toLowerCase()
      )
        ? "published"
        : ["draft", "pending"].includes((p.status || "").toLowerCase())
        ? "draft"
        : ["trash", "deleted", "archived"].includes(
            (p.status || "").toLowerCase()
          )
        ? "trash"
        : p.status || "draft",
    }));

    if (activeTab === "Published")
      filtered = filtered.filter((p) => p.normalizedStatus === "published");
    if (activeTab === "Drafts")
      filtered = filtered.filter((p) => p.normalizedStatus === "draft");
    if (activeTab === "Trash")
      filtered = filtered.filter((p) => p.normalizedStatus === "trash");

    if (filterAuthor !== "All")
      filtered = filtered.filter(
        (p) => (p.author || "Unknown") === filterAuthor
      );
    if (filterCategory !== "All")
      filtered = filtered.filter(
        (p) => (p.category || "Uncategorized") === filterCategory
      );

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

  // Open modal helpers
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

  // Apply changes after edit or delete
  const handleApplyEdit = (updated) =>
    setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  const handleApplyDelete = (postId) =>
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, status: "trash", normalizedStatus: "trash" }
          : p
      )
    );

  // Generate unique authors/categories for filters
  const authors = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.author || "Unknown"))),
  ];
  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category || "Uncategorized"))),
  ];

  // Pagination logic
  const total = filteredPosts.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const pageItems = filteredPosts.slice((page - 1) * pageSize, page * pageSize);

  const logsTotal = logs.length;
  const logsPages = Math.max(1, Math.ceil(logsTotal / logsPerPage));
  const logsPageItems = logs.slice(
    (logsPage - 1) * logsPerPage,
    logsPage * logsPerPage
  );

  const pendingTotal = pendingJobs.length;
  const pendingPages = Math.max(1, Math.ceil(pendingTotal / pendingPerPage));
  const pendingPageItems = pendingJobs.slice(
    (pendingPage - 1) * pendingPerPage,
    pendingPage * pendingPerPage
  );

  // Urgency badge styling
  const getUrgencyBadge = (urgency) => {
    const styles = {
      urgent: { bg: "#dc2626", color: "#fff", label: "URGENT" },
      medium: { bg: "#fbbf24", color: "#000", label: "Medium" },
      low: { bg: "#10b981", color: "#fff", label: "Low" },
    };
    const style = styles[urgency] || styles.medium;
    return (
      <span
        style={{
          background: style.bg,
          color: style.color,
          padding: "4px 10px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        {style.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="cms-announcement-page">
      <h2 className="title">Posts</h2>

      <ul className="breadcrumbs">
        <li>Posts Log</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>

      <div className="tab-row">
        {[
          "All",
          "Published",
          "Drafts",
          "Trash",
          "Pending Request",
          "Edit Logs",
        ].map((label) => (
          <span
            key={label}
            className={`tab-item ${activeTab === label ? "active" : ""}`}
            onClick={() => setActiveTab(label)}
          >
            {label}
            {label === "Pending Request" && pendingJobs.length > 0 && (
              <span className="tab-badge">{pendingJobs.length}</span>
            )}
          </span>
        ))}
      </div>

      {activeTab === "Pending Request" ? (
        <>
          {/* Pending Jobs Table */}
          <div className="pending-jobs-info">
            <p className="info-text">
              📋 Job posting requests submitted from EMS awaiting review and
              approval
            </p>
          </div>

          <div className="table-container">
            <table className="posts-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Job Type</th>
                  <th>Urgency</th>
                  <th>Has Notes</th>
                  <th>Submitted By</th>
                  <th>Submitted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingPageItems.length ? (
                  pendingPageItems.map((job, idx) => (
                    <tr key={job.id} className="pending-job-row">
                      <td>{(pendingPage - 1) * pendingPerPage + idx + 1}</td>
                      <td className="job-title-cell">
                        <strong>{job.job_title}</strong>
                        {job.short_title && (
                          <div className="short-title">{job.short_title}</div>
                        )}
                      </td>
                      <td>
                        <span className="department-badge">
                          {job.department}
                        </span>
                      </td>
                      <td>{job.job_type}</td>
                      <td>{getUrgencyBadge(job.urgency_level)}</td>
                      <td className="text-center">
                        {job.ems_notes ? (
                          <span className="has-notes-badge">✓ Yes</span>
                        ) : (
                          <span className="no-notes-badge">—</span>
                        )}
                      </td>
                      <td>
                        <div className="submitter-info">
                          <strong>{job.ems_user_name}</strong>
                          <div className="submitter-source">EMS</div>
                        </div>
                      </td>
                      <td>{formatDate(job.created_at)}</td>
                      <td className="actions">
                        <button
                          className="actions-btn review"
                          onClick={() => {
                            if (role === "super_administrator") {
                              handleReviewInCareers(job.id);
                            }
                          }}
                          disabled={role !== "super_administrator"}
                          title={
                            role === "super_administrator"
                              ? "Review and approve/reject this job request"
                              : "Only Super Admin can review job requests"
                          }
                          style={{
                            opacity: role === "super_administrator" ? 1 : 0.4,
                            cursor:
                              role === "super_administrator"
                                ? "pointer"
                                : "not-allowed",
                          }}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-posts">
                      <div className="no-pending-illustration">
                        <span className="no-pending-icon">✓</span>
                        <p>No pending job requests at this time</p>
                        <small>All submissions have been processed</small>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pending Jobs Pagination */}
          {pendingPages > 1 && (
            <nav aria-label="Pending jobs pagination">
              <ul className="pagination justify-content-center mt-3">
                <li
                  className={`page-item ${pendingPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPendingPage(pendingPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: pendingPages }).map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      pendingPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPendingPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    pendingPage === pendingPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPendingPage(pendingPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      ) : activeTab !== "Edit Logs" ? (
        <>
          {/* Filters */}
          <div className="filter-bar">
            <select
              className="filter-select"
              value={filterAuthor}
              onChange={(e) => setFilterAuthor(e.target.value)}
            >
              {authors.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            >
              <option>All</option>
              <option>Today</option>
            </select>
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
                {pageItems.length ? (
                  pageItems.map((post, idx) => (
                    <tr key={post.id}>
                      <td>{(page - 1) * pageSize + idx + 1}</td>
                      <td>
                        {post.title || post.full_title || post.short_title}
                      </td>
                      <td>{post.author}</td>
                      <td>{post.category}</td>
                      <td>
                        {post.normalizedStatus.charAt(0).toUpperCase() +
                          post.normalizedStatus.slice(1)}
                      </td>
                      <td>{post.date ? formatDate(post.date) : "—"}</td>
                      <td className="actions">
                        <button
                          className="actions-btn edit"
                          onClick={() => openEdit(post)}
                        >
                          Edit
                        </button>
                        <button
                          className="actions-btn view"
                          onClick={() => openView(post)}
                        >
                          View
                        </button>
                        <button
                          className="actions-btn delete"
                          onClick={() => openDelete(post)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-posts">
                      No posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav aria-label="Posts pagination">
            <ul className="pagination justify-content-center mt-3">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>
                  Previous
                </button>
              </li>
              {Array.from({ length: pages }).map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${page === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${page === pages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          {/* Edit Logs Table */}
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
                {logsPageItems.length ? (
                  logsPageItems.map((l, idx) => (
                    <tr key={l.id}>
                      <td>{(logsPage - 1) * logsPerPage + idx + 1}</td>
                      <td style={{ fontFamily: "monospace" }}>{l.post_id}</td>
                      <td>{l.category}</td>
                      <td>{l.action}</td>
                      <td>{l.editor}</td>
                      <td
                        style={{
                          maxWidth: 400,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {l.message}
                      </td>
                      <td>{formatDate(l.created_at)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-posts">
                      No logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Logs Pagination */}
          <nav aria-label="Logs pagination">
            <ul className="pagination justify-content-center mt-3">
              <li className={`page-item ${logsPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setLogsPage(logsPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: logsPages }).map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${logsPage === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setLogsPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  logsPage === logsPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setLogsPage(logsPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
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
          onUpdated={handleApplyEdit}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          post={selectedPost}
          onClose={() => setShowDeleteModal(false)}
          onDeleted={handleApplyDelete}
        />
      )}
    </div>
  );
}
