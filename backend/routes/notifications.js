// backend/routes/notifications.js
import express from "express";
import db from "../src/db.js";

const router = express.Router();

// Middleware to verify token (optional, but recommended)
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  // You can add JWT verification here if needed
  next();
}

// ===== Get notifications for a user =====
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  
  const query = `
    SELECT 
      n.*,
      DATE(n.created_at) as notification_date,
      CASE 
        WHEN DATE(n.created_at) = CURDATE() THEN 'TODAY'
        WHEN DATE(n.created_at) = CURDATE() - INTERVAL 1 DAY THEN 'YESTERDAY'
        ELSE DATE_FORMAT(n.created_at, '%M %d, %Y')
      END as date_label
    FROM notifications n
    WHERE n.user_id = ? OR n.user_id IS NULL OR n.type = 'job_approval'
    ORDER BY n.created_at DESC
    LIMIT 50
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching notifications:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    // Group notifications by date
    const grouped = results.reduce((acc, notif) => {
      const label = notif.date_label;
      if (!acc[label]) acc[label] = [];
      acc[label].push(notif);
      return acc;
    }, {});

    const unreadCount = results.filter(n => !n.is_read).length;

    res.json({
      success: true,
      notifications: grouped,
      unreadCount
    });
  });
});

// ===== Mark notification as read =====
router.put("/:notificationId/read", (req, res) => {
  const { notificationId } = req.params;

  db.query(
    "UPDATE notifications SET is_read = TRUE WHERE id = ?",
    [notificationId],
    (err) => {
      if (err) {
        console.error("❌ Error marking notification as read:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      res.json({ success: true, message: "Notification marked as read" });
    }
  );
});

// ===== Mark all notifications as read =====
router.put("/user/:userId/read-all", (req, res) => {
  const { userId } = req.params;

  db.query(
    "UPDATE notifications SET is_read = TRUE WHERE user_id = ? OR user_id IS NULL",
    [userId],
    (err) => {
      if (err) {
        console.error("❌ Error marking all notifications as read:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      res.json({ success: true, message: "All notifications marked as read" });
    }
  );
});

// ===== Create a new notification (for job postings, etc.) =====
router.post("/", (req, res) => {
  const { type, title, description, metadata, userId } = req.body;

  const query = `
    INSERT INTO notifications (type, title, description, metadata, user_id, created_at)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;

  db.query(
    query,
    [type, title, description, JSON.stringify(metadata), userId || null],
    (err, result) => {
      if (err) {
        console.error("❌ Error creating notification:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      res.json({ 
        success: true, 
        message: "Notification created",
        notificationId: result.insertId 
      });
    }
  );
});

export default router;