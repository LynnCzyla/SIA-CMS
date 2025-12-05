import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function User() {
  // Main state
  const [userSubTab, setUserSubTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  // Summary counts
  const totalUsers = users.length;
  const contentAdmins = users.filter((u) => u.role === "content_administrator").length;
  const superAdmins = users.filter((u) => u.role === "super_administrator").length;

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://26.41.72.16:5000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire("Error", "Could not load users.", "error");
    }
  };

  useEffect(() => {
    if (userSubTab === "users") fetchUsers();
  }, [userSubTab]);

  // Clear form
  const clearForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setRole("");
    setIsEditMode(false);
    setEditingUserId(null);
  };

  // Create new user
  const handleCreateUser = async () => {
    if (!fullName || !email || !password || !role) {
      Swal.fire("Warning", "Please fill in all fields.", "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success", data.message || "User created!", "success");
        clearForm();
        fetchUsers();
      } else {
        Swal.fire("Error", data.message || "Failed to create user.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Server connection failed.", "error");
    }
  };

  // Edit user click
  const handleEditClick = (user) => {
    setFullName(user.full_name);
    setEmail(user.email);
    setPassword("");
    setRole(user.role);
    setEditingUserId(user.id);
    setIsEditMode(true);
    setUserSubTab("adduser");
  };

  // Update user
  const handleUpdateUser = async () => {
    if (!fullName || !email || !role) {
      Swal.fire("Warning", "Please fill in all required fields.", "warning");
      return;
    }

    try {
      const payload = { full_name: fullName, email, role };
      if (password) payload.password = password;

      const response = await fetch(`http://localhost:5000/api/users/${editingUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success", data.message || "User updated!", "success");
        setUsers(users.map(u =>
          u.id === editingUserId ? { ...u, full_name: fullName, email, role } : u
        ));
        clearForm();
        setUserSubTab("users");
      } else {
        Swal.fire("Error", data.message || "Failed to update user.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Server error.", "error");
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, { method: "DELETE" });
        const data = await response.json();

        if (response.ok) {
          Swal.fire("Deleted!", data.message || "User deleted.", "success");
          setUsers(users.filter((user) => user.id !== userId));
        } else {
          Swal.fire("Error", data.message || "Failed to delete user.", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Server error.", "error");
      }
    }
  };

  return (
    <div className="cms-card cms-userrole-card">
      <h3 className="cms-section-title">User Role Management</h3>

      {/* Summary */}
      <div className="role-summary">
        <div className="summary-card"><h2>{totalUsers}</h2><p>Users</p></div>
        <div className="summary-card"><h2>{contentAdmins}</h2><p>Content Administrator</p></div>
        <div className="summary-card"><h2>{superAdmins}</h2><p>Super Administrator</p></div>
      </div>

      {/* Sub Tabs */}
      <div className="role-subnav">
        <div className="tabs">
          {["users","adduser"].map(sub=>(
            <span key={sub} className={userSubTab===sub?"active":""} onClick={()=>setUserSubTab(sub)}>
              {sub==="users"?"Users":"Add New User"}
            </span>
          ))}
        </div>

        <div className="filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>🔍</button>
          </div>
        </div>
      </div>

      {/* USERS TABLE */}
      {userSubTab === "users" && (
        <>
          <h6 className="cms-table-title">User Accounts</h6>
          <table className="cms-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users
                  .filter((user) => {
                    const query = searchTerm.toLowerCase();
                    return (
                      user.full_name.toLowerCase().includes(query) ||
                      user.email.toLowerCase().includes(query) ||
                      (user.role && user.role.toLowerCase().includes(query))
                    );
                  })
                  .map((user) => (
                    <tr key={user.id}>
                      <td>{user.full_name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.last_login ? new Date(user.last_login).toLocaleString() : "Never"}</td>
                      <td>
                        <span className="edit" onClick={() => handleEditClick(user)}>Edit</span> |{" "}
                        <span className="delete" onClick={() => handleDeleteUser(user.id)} style={{ color: "red", cursor: "pointer" }}>Delete</span>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr><td colSpan="5" className="text-center">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {/* ADD / EDIT USER FORM */}
      {userSubTab === "adduser" && (
        <div className="mt-3">
          <h5>{isEditMode ? "Edit User" : "Add New User"}</h5>
          <div className="row">
            <div className="col-md-6">
              <label>Full name</label>
              <input type="text" placeholder="Enter Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Email</label>
              <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="col-md-6 mt-3 password-field" style={{ position: "relative" }}>
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="col-md-6 mt-3">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="content_administrator">Content Administrator</option>
                <option value="super_administrator">Super Administrator</option>
                <option value="hr_administrator">HR Administrator</option>
              </select>
            </div>
            <div className="mt-4 d-flex gap-3">
              <button
                className="btn btn-primary"
                onClick={isEditMode ? handleUpdateUser : handleCreateUser}
              >
                {isEditMode ? "Update User" : "Create User"}
              </button>
              <button className="btn btn-secondary" onClick={clearForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
