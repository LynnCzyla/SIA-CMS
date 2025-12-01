// frontend/admin/src/layouts/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Outlet } from "react-router-dom";
import { FaBars, FaUserCircle, FaChevronDown } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import NotificationPanel from "../components/NotificationPanel";
import "../css/Global.css";
import "../css/DashboardLayout.css";

class UserService {
  constructor() {
    this.token = localStorage.getItem("token");
  }

  decodeToken() {
    if (!this.token) return null;
    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  getUserFromToken() {
    const decoded = this.decodeToken();
    return decoded ? {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      full_name: decoded.full_name || "Admin User"
    } : null;
  }

  logout() {
    localStorage.removeItem("token");
  }
}

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const userService = new UserService();

  useEffect(() => {
    const userData = userService.getUserFromToken();
    if (userData) {
      setUser(userData);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        userService.logout();
        Swal.fire("Logged Out!", "You have been logged out.", "success").then(
          () => {
            window.location.href = "/login";
          }
        );
      }
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`dashboard-layout ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main content */}
      <section id="content">
        {/* ===== Navbar ===== */}
        <nav className="navbar">
          <div className="navbar-left">
            <FaBars
              className="toggle-sidebar"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            />
            <h1 className="title-name">Welcome, {user.full_name || "Admin"}!</h1>
          </div>

          <div className="navbar-right">
            {/* Notification Panel */}
            <NotificationPanel 
              userId={user.id} 
              baseURL="http://localhost:5000" 
            />

            {/* User Profile Dropdown */}
            <div className="user-profile-container">
              <div 
                className="user-profile" 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <FaUserCircle className="profile-icon" />
                <div className="user-info">
                  <span className="user-name">{user.full_name || "Admin"}</span>
                  <span className="user-email">{user.email}</span>
                </div>
                <FaChevronDown className="dropdown-icon" />
              </div>

              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <FaUserCircle className="profile-icon-large" />
                    <div>
                      <p className="dropdown-name">{user.full_name || "Admin User"}</p>
                      <p className="dropdown-email">{user.email}</p>
                      <span className="role-badge">{user.role || "Admin"}</span>
                    </div>
                  </div>
                  <div className="profile-dropdown-divider"></div>
                  <button className="dropdown-item" onClick={() => window.location.href = "/settings"}>
                    ⚙️ Settings
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* ===== Page Content ===== */}
        <main>
          <Outlet />
        </main>
      </section>
    </div>
  );
}