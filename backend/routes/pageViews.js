// backend/routes/pageViews.js
import express from "express";
import db from "../src/db.js";

const router = express.Router();

// Helper function to handle dead connections
function queryWithRetry(sql, params, callback) {
  db.query(sql, params, (err, results) => {
    if (err && err.fatal) {
      // Connection died - reconnect once and retry
      console.warn("⚠️ Connection lost, reconnecting...");
      db.connect((connectErr) => {
        if (connectErr) {
          console.error("❌ Reconnection failed:", connectErr);
          return callback(connectErr);
        }
        // Retry the query after reconnecting
        db.query(sql, params, callback);
      });
    } else {
      callback(err, results);
    }
  });
}

// Track page visit
router.post("/", (req, res) => {
  const { page } = req.body;

  if (!page) {
    return res.status(400).json({ error: "Page name is required" });
  }

  const sql = `
    INSERT INTO page_views (page_name, view_date, visit_count)
    VALUES (?, CURDATE(), 1)
    ON DUPLICATE KEY UPDATE visit_count = visit_count + 1
  `;

  queryWithRetry(sql, [page], (err) => {
    if (err) {
      console.error("Page tracker error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    console.log(`✅ Tracked view for: ${page}`);
    res.json({ message: "Visit recorded", page });
  });
});

// Get all page views
router.get("/", (req, res) => {
  const query = `
    SELECT 
      page_name, 
      DATE_FORMAT(view_date, '%Y-%m-%d') AS view_date, 
      visit_count 
    FROM page_views 
    ORDER BY view_date ASC
  `;

  queryWithRetry(query, [], (err, results) => {
    if (err) {
      console.error("❌ Error fetching page views:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
});

// Get weekly page views
router.get("/weekly", (req, res) => {
  const sql = `
    SELECT 
      page_name,
      DATE_FORMAT(view_date, '%Y-%m-%d') AS date,
      SUM(visit_count) AS total
    FROM page_views
    WHERE view_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY page_name, view_date
    ORDER BY page_name, date ASC
  `;

  queryWithRetry(sql, [], (err, results) => {
    if (err) {
      console.error("❌ Weekly fetch error:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json(results);
  });
});

// Get monthly page views
router.get("/monthly", (req, res) => {
  const sql = `
    SELECT 
      page_name,
      DATE_FORMAT(view_date, '%Y-%m-%d') AS date,
      SUM(visit_count) AS total
    FROM page_views
    WHERE MONTH(view_date) = MONTH(CURDATE())
      AND YEAR(view_date) = YEAR(CURDATE())
    GROUP BY page_name, view_date
    ORDER BY page_name, date ASC
  `;

  queryWithRetry(sql, [], (err, results) => {
    if (err) {
      console.error("❌ Monthly fetch error:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json(results);
  });
});

// Get monthly summary
router.get("/monthly-summary", (req, res) => {
  const sql = `
    SELECT 
      page_name,
      SUM(visit_count) AS total
    FROM page_views
    WHERE MONTH(view_date) = MONTH(CURDATE())
      AND YEAR(view_date) = YEAR(CURDATE())
    GROUP BY page_name
    ORDER BY total DESC
  `;

  queryWithRetry(sql, [], (err, results) => {
    if (err) {
      console.error("❌ Monthly summary error:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json(results);
  });
});

export default router;