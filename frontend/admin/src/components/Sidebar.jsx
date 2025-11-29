// frontend/admin/src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFolderOpen,
  FaBullhorn,
  FaNewspaper,
  FaBriefcase,
  FaHeart,
  FaEdit,
  FaUserMd,
  FaCamera,
  FaBuilding,
  FaChartBar,
  FaCog,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "../components/components-css/Sidebar.css";
import Logo from "/src/assets/logo1.svg";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Load role from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setRole(parsedUser.role);
    }
  }, []);

  // ==============================
  // Menu Definitions
  // ==============================
  const dashboard = { icon: <FaTachometerAlt />, label: "Dashboard", path: "/dashboard" };

  const contentMenu = {
    label: "Content Creation",
    icon: <FaFolderOpen />,
    children: [
      { icon: <FaBullhorn />, label: "Announcements", path: "/announcements" },
      { icon: <FaNewspaper />, label: "News", path: "/news" },
      { icon: <FaBriefcase />, label: "Careers", path: "/careers" },
      { icon: <FaHeart />, label: "HealthTips", path: "/health" },
      { icon: <FaEdit />, label: "PostsLog", path: "/posts" },
    ],
  };

  const doctors = { icon: <FaUserMd />, label: "Doctors", path: "/doctors" };
  const mediaLibrary = { icon: <FaCamera />, label: "Media Library", path: "/media" };
  const aboutHospital = { icon: <FaBuilding />, label: "About Hospital", path: "/hospital" };
  const analytics = { icon: <FaChartBar />, label: "Analytics", path: "/analytics" };
  const settings = { icon: <FaCog />, label: "Settings", path: "/settings" };

  const hrMenu = [
    { icon: <FaBriefcase />, label: "HR & Careers", path: "/careers" },
    { icon: <FaUserMd />, label: "Doctors", path: "/doctors" },
    { icon: <FaEdit />, label: "Post Log", path: "/posts" },
  ];

  // ==============================
  // Combine menu by role
  // ==============================
  let menuItems = [];

  if (role === "super_administrator") {
    menuItems = [
      dashboard,
      contentMenu,
      doctors,
      mediaLibrary,
      aboutHospital,
      analytics,
      settings,
    ];
  } else if (role === "content_administrator") {
    menuItems = [dashboard, contentMenu, doctors, mediaLibrary];
  } else if (role === "hr_administrator") {
    menuItems = [...hrMenu];
  }

  // ==============================
  // Dropdown logic
  // ==============================
  useEffect(() => {
    const activeDropdown = menuItems.find(
      (item) =>
        item.children?.some((child) => location.pathname === child.path)
    );
    setOpenDropdown(activeDropdown ? activeDropdown.label : null);
  }, [location.pathname]);

  const toggleDropdown = (label) => setOpenDropdown((prev) => (prev === label ? null : label));

  const isParentActive = (item) => {
    if (!item.children) return false;
    return item.children.some((child) => location.pathname === child.path);
  };

  // ==============================
  // Render Sidebar
  // ==============================
  return (
    <aside id="sidebar" className={isOpen ? "" : "collapsed"}>
      <div className="brand">
        <img src={Logo} alt="MediSync Logo" className="brand-logo" />
        {isOpen && (
          <span className="brand-name">
            <span className="brand-text">Medi</span>
            <span className="brand-text2">Sync</span>
          </span>
        )}
      </div>

      <ul className="side-menu">
        {menuItems.map((item) => {
          const parentActive = isParentActive(item);

          if (item.children) {
            const isOpenDropdown = openDropdown === item.label;
            return (
              <li
                key={item.label}
                className={`dropdown ${isOpenDropdown ? "open" : ""} ${parentActive ? "active" : ""}`}
              >
                <button className="dropdown-toggle" onClick={() => toggleDropdown(item.label)}>
                  <span className="icon">{item.icon}</span>
                  {isOpen && <span className="label">{item.label}</span>}
                  {isOpen && (isOpenDropdown ? <FaChevronUp /> : <FaChevronDown />)}
                </button>
                <ul className={`side-dropdown ${isOpenDropdown ? "show" : ""}`}>
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <Link
                        to={child.path}
                        className={location.pathname === child.path ? "active" : ""}
                      >
                        <span className="icon">{child.icon}</span>
                        <span className="label">{child.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          }

          return (
            <li key={item.label}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                <span className="icon">{item.icon}</span>
                {isOpen && <span className="label">{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
