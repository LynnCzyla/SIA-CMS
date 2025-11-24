import { useState, useEffect } from "react";
import { IoFilter } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../css/Posts.css";

const MySwal = withReactContent(Swal);

export default function Posts() {
  const [activeTab, setActiveTab] = useState("All");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Filters
  const [filterAuthor, setFilterAuthor] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        Swal.fire("Error", "Failed to load posts", "error");
      }
    };
    fetchPosts();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...posts];

    filtered = filtered.map((p) => {
      const s = p.status?.toLowerCase();
      return {
        ...p,
        normalizedStatus:
          s === "posted" || s === "publish" || s === "published"
            ? "published"
            : s || "draft",
      };
    });

    if (activeTab === "Published")
      filtered = filtered.filter((p) => p.normalizedStatus === "published");
    if (activeTab === "Drafts")
      filtered = filtered.filter((p) => p.normalizedStatus === "draft");
    if (activeTab === "Trash")
      filtered = filtered.filter((p) => p.normalizedStatus === "trash");

    if (filterAuthor !== "All")
      filtered = filtered.filter((p) => p.author === filterAuthor);

    if (filterCategory !== "All")
      filtered = filtered.filter((p) => p.category === filterCategory);

    if (filterDate === "Today") {
      const today = new Date().toISOString().split("T")[0];
      filtered = filtered.filter((p) => p.date?.startsWith(today));
    }

    if (searchQuery.trim())
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    setFilteredPosts(filtered);
  }, [
    activeTab,
    posts,
    filterAuthor,
    filterCategory,
    filterDate,
    searchQuery,
  ]);

  const handleView = async (post) => {
    MySwal.fire({
      title: `<strong>${post.title}</strong>`,
      html: `
        <div style="text-align: left; font-size: 15px;">
          <p><strong>Author:</strong> ${post.author}</p>
          <p><strong>Category:</strong> ${post.category}</p>
          <p><strong>Status:</strong> <span style="text-transform: capitalize;">${post.normalizedStatus}</span></p>
          <p><strong>Date:</strong> ${post.date || "—"}</p>
          ${post.content ? `<hr><p><strong>Content:</strong></p><p style="background:#f3f4f6;padding:12px;border-radius:8px;margin-top:8px;">${post.content}</p>` : ""}
        </div>
      `,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#4f9cf9",
      width: "600px",
    });
  };

  const handleEdit = async (post) => {
    const { value: formValues } = await MySwal.fire({
      title: "Edit Post",
      html: `
        <div style="text-align: left;">
          <label style="display:block;margin-bottom:8px;font-weight:600;">Title</label>
          <input id="swal-title" class="swal2-input" value="${post.title}" style="margin-bottom:16px;">

          <label style="display:block;margin-bottom:8px;font-weight:600;">Content</label>
          <textarea id="swal-content" class="swal2-textarea" style="height:100px;margin-bottom:16px;">${post.content || ""}</textarea>

          <div style="display:flex;gap:12px;">
            <div style="flex:1;">
              <label style="display:block;margin-bottom:8px;font-weight:600;">Author</label>
              <input id="swal-author" class="swal2-input" value="${post.author}">
            </div>
            <div style="flex:1;">
              <label style="display:block;margin-bottom:8px;font-weight:600;">Category</label>
              <input id="swal-category" class="swal2-input" value="${post.category}">
            </div>
          </div>

          <label style="display:block;margin-top:12px;margin-bottom:8px;font-weight:600;">Status</label>
          <select id="swal-status" class="swal2-select" style="width:100%;padding:10px;border-radius:6px;border:1px solid #ccc;">
            <option value="draft" ${post.normalizedStatus === "draft" ? "selected" : ""}>Draft</option>
            <option value="published" ${post.normalizedStatus === "published" ? "selected" : ""}>Published</option>
            <option value="trash" ${post.normalizedStatus === "trash" ? "selected" : ""}>Trash</option>
          </select>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#4f9cf9",
      preConfirm: () => {
        const title = document.getElementById("swal-title").value.trim();
        if (!title) {
          Swal.showValidationMessage("Title is required");
          return false;
        }
        return {
          title,
          content: document.getElementById("swal-content").value,
          author: document.getElementById("swal-author").value,
          category: document.getElementById("swal-category").value,
          status: document.getElementById("swal-status").value,
        };
      },
    });

    if (formValues) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/posts/${encodeURIComponent(post.category)}/${post.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formValues),
          }
        );

        const data = await res.json();

        if (res.ok) {
          Swal.fire("Success!", "Post has been updated.", "success");
          setPosts((prev) =>
            prev.map((p) =>
              p.id === post.id ? { ...p, ...formValues } : p
            )
          );
        } else {
          Swal.fire("Error", data.message || "Failed to update", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to connect to server", "error");
      }
    }
  };

  const handleDelete = async (post) => {
    const result = await Swal.fire({
      title: "Move to trash?",
      text: `Move "${post.title}" to trash?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Move to Trash",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/posts/trash/${encodeURIComponent(post.category)}/${post.id}`,
          { method: "PUT" }
        );
        const data = await res.json();

        if (res.ok) {
          Swal.fire("Moved!", data.message || "Post moved to trash", "success");
          setPosts((prev) =>
            prev.map((p) =>
              p.id === post.id ? { ...p, status: "trash" } : p
            )
          );
        }
      } catch {
        Swal.fire("Error", "Failed to move to trash", "error");
      }
    }
  };

  const authors = ["All", ...new Set(posts.map((p) => p.author))];
  const categories = ["All", ...new Set(posts.map((p) => p.category))];

  return (
    <div className="cms-announcement-page">
      <h2 className="title">Posts</h2>

      {/* Breadcrumbs */}
      <ul className="breadcrumbs">
        <li>Posts Log</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>

      {/* Tabs */}
      <div className="tab-row">
        {["All", "Published", "Drafts", "Trash"].map((label) => (
          <span
            key={label}
            className={`tab-item ${activeTab === label ? "active" : ""}`}
            onClick={() => setActiveTab(label)}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <button className="sort-btn">
          <IoFilter /> Sort
        </button>

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

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">
            <IoMdSearch />
          </button>
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
            {filteredPosts.length ? (
              filteredPosts.map((post, index) => (
                <tr key={`${post.category}-${post.id}`}>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{post.category}</td>
                  <td>
                    {post.normalizedStatus.charAt(0).toUpperCase() +
                      post.normalizedStatus.slice(1)}
                  </td>
                  <td className={!post.date ? "empty-date" : ""}>
                    {post.date || "—"}
                  </td>

                  <td className="actions">
                    <button
                      className="actions-btn edit"
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="actions-btn view"
                      onClick={() => handleView(post)}
                    >
                      View
                    </button>
                    <button
                      className="actions-btn delete"
                      onClick={() => handleDelete(post)}
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
    </div>
  );
}