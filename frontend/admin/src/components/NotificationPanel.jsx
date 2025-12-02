// frontend/admin/src/components/NotificationPanel.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./components-css/NotificationPanel.css";

class NotificationService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetchNotifications(userId) {
    const response = await fetch(
      `${this.baseURL}/api/notifications/${userId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.json();
  }

  async markAsRead(notificationId) {
    const response = await fetch(
      `${this.baseURL}/api/notifications/${notificationId}/read`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.json();
  }

  async clearRead(userId) {
    const response = await fetch(
      `${this.baseURL}/api/notifications/clear-read/${userId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.json();
  }
}

export default function NotificationPanel({
  userId,
  baseURL = "http://localhost:5000",
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState({});
  const [unreadCount, setUnreadCount] = useState(0);
  const panelRef = useRef(null);
  const notificationService = useRef(new NotificationService(baseURL));

  useEffect(() => {
    if (userId) loadNotifications();
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const loadNotifications = async () => {
    try {
      const data = await notificationService.current.fetchNotifications(userId);
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error("❌ Error loading notifications:", error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationService.current.markAsRead(notificationId);
      loadNotifications();
    } catch (error) {
      console.error("❌ Error marking notification as read:", error);
    }
  };

  const handleReviewClick = (notif) => {
    // Mark as read first
    if (!notif.is_read) {
      handleMarkAsRead(notif.id);
    }

    // Parse metadata
    try {
      const metadata =
        typeof notif.metadata === "string"
          ? JSON.parse(notif.metadata)
          : notif.metadata;

      // Navigate based on notification type
      switch (notif.type) {
        case "job_approval":
        case "job_posting":
          if (metadata?.job_id) {
            // Close panel and navigate to Careers with job ID in state
            setIsOpen(false);
            navigate("/careers", {
              state: {
                pendingJobId: metadata.job_id,
                scrollToPending: true,
              },
            });
          }
          break;
        case "announcement":
          if (metadata?.announcement_id) {
            navigate(`/announcements/${metadata.announcement_id}`);
          }
          break;
        default:
          console.log("No specific action for this notification type");
      }
    } catch (error) {
      console.error("Error handling review click:", error);
    }
  };


  const handleClearRead = async () => {
    try {
      await notificationService.current.clearRead(userId);
      loadNotifications(); // Refresh list
    } catch (error) {
      console.error("❌ Error clearing read notifications:", error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "job_posting":
      case "job_approval":
        return "💼";
      case "announcement":
        return "📢";
      case "alert":
        return "⚠️";
      default:
        return "🔔";
    }
  };

  const getBadgeColor = (badge) => {
    if (!badge) return "#6c757d";

    if (badge.color) return badge.color;

    const label = badge.label || badge;
    const colors = {
      "🔴 URGENT": "#dc3545",
      Urgent: "#dc3545",
      "🟡 Medium Priority": "#ffc107",
      "Medium Priority": "#ffc107",
      "🟢 Low Priority": "#28a745",
      "Low Priority": "#28a745",
      Medical: "#28a745",
      "HR Department": "#28a745",
      "Just now": "#28a745",
      EMS: "#007bff",
      "Full-time": "#6c757d",
      Nursing: "#007bff",
    };

    return colors[label] || "#007bff";
  };

  return (
    <div className="notification-wrapper" ref={panelRef}>
      <div
        className="notification-icon-container"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBell className="notification-bell" />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </div>

      {isOpen && (
        <div className="notification-panel">
          <div className="notification-header">
            <div className="notification-header-left">
              <h3>Notification</h3>
              {unreadCount > 0 && (
                <span className="unread-badge">
                  You have {unreadCount} unread notification
                  {unreadCount > 1 ? "s" : ""}
                </span>
              )}
            </div>
            <div className="notification-header-right">

              <button
                className="clear-read-btn"
                onClick={handleClearRead}
                title="Delete all read notifications"
              >
                Clear Read
              </button>
            </div>
          </div>

          <div className="notification-content">
            {Object.keys(notifications).length === 0 ? (
              <div className="no-notifications">
                <p>No notifications yet</p>
              </div>
            ) : (
              Object.entries(notifications).map(([dateLabel, items]) => (
                <div key={dateLabel} className="notification-group">
                  <div className="date-divider">{dateLabel}</div>
                  {items.map((notif) => {
                    let parsedMetadata = {};
                    try {
                      parsedMetadata =
                        typeof notif.metadata === "string"
                          ? JSON.parse(notif.metadata)
                          : notif.metadata || {};
                    } catch (e) {
                      console.error("Error parsing metadata:", e);
                    }

                    return (
                      <div
                        key={notif.id}
                        className={`notification-item ${
                          !notif.is_read ? "unread" : ""
                        }`}
                        onClick={() =>
                          !notif.is_read && handleMarkAsRead(notif.id)
                        }
                      >
                        <div className="notification-icon">
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="notification-body">
                          <div className="notification-title-row">
                            <span className="notification-type">
                              {notif.type.replace("_", " ").toUpperCase()}
                            </span>
                          </div>
                          <p className="notification-title">{notif.title}</p>

                          {parsedMetadata.badges &&
                            parsedMetadata.badges.length > 0 && (
                              <div className="notification-badges">
                                {parsedMetadata.badges.map((badge, idx) => (
                                  <span
                                    key={idx}
                                    className="badge"
                                    style={{
                                      backgroundColor: getBadgeColor(badge),
                                    }}
                                  >
                                    {badge.label || badge}
                                  </span>
                                ))}
                              </div>
                            )}

                          <button
                            className="review-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReviewClick(notif);
                            }}
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
