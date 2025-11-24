// routes/posts.js
import express from "express";
import db from "../src/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

/* --------------------------------------------------
   TABLE MAP
-------------------------------------------------- */
const tableMap = {
  News: "news",
  Announcements: "announcement",
  "Events & Careers": "events_careers",
  Jobs: "jobs",
  "Health Tips": "health_tips",
};

/* --------------------------------------------------
   UPLOAD CONFIG (ONE PER TABLE)
-------------------------------------------------- */
const getUpload = (category) => {
  const uploadDir = path.join("uploads", category.toLowerCase().replace(/\s+/g, "_"));
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname)),
  });

  return multer({ storage });
};

/* --------------------------------------------------
   ⚠️ LOGS ROUTE MUST COME FIRST
-------------------------------------------------- */
router.get("/logs/all", (req, res) => {
  const sql = `SELECT * FROM post_logs ORDER BY created_at DESC`;
  db.query(sql, (err, logs) => {
    if (err) return res.status(500).json({ message: "Failed to load logs" });
    res.json(logs);
  });
});

/* --------------------------------------------------
   GET ALL POSTS (UNION)
-------------------------------------------------- */
router.get("/", (req, res) => {
  const sql = `
    SELECT id, full_title, short_title, author, 'News' AS category, status, created_at AS date FROM news
    UNION ALL
    SELECT id, full_title, short_title, author, 'Announcements' AS category, status, created_at AS date FROM announcement
    UNION ALL
    SELECT id, full_title, short_title, author, 'Events & Careers' AS category, status, created_at AS date FROM events_careers
    UNION ALL
    SELECT id, full_title, short_title, author, 'Jobs' AS category, status, created_at AS date FROM jobs
    UNION ALL
    SELECT id, full_title, short_title, author, 'Health Tips' AS category, status, created_at AS date FROM health_tips
    ORDER BY date DESC;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch posts" });
    res.json(results);
  });
});

/* --------------------------------------------------
   GET SINGLE POST
-------------------------------------------------- */
router.get("/:category/:id", (req, res) => {
  const { category, id } = req.params;
  const table = tableMap[category];
  if (!table) return res.status(400).json({ message: "Invalid category" });

  const sql = `SELECT * FROM ${table} WHERE id = ? LIMIT 1`;
  db.query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ message: "Failed to load post" });
    res.json(rows[0] || null);
  });
});

/* --------------------------------------------------
   CREATE POST
-------------------------------------------------- */
router.post("/:category", (req, res) => {
  const { category } = req.params;
  const table = tableMap[category];
  if (!table) return res.status(400).json({ message: "Invalid category" });

  const upload = getUpload(category);
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(500).json({ message: "Image upload failed" });

    const { short_title, full_title, topic_tags, description, status, author } = req.body;
    if (!short_title || !full_title || !description)
      return res.status(400).json({ message: "Required fields missing" });

    const tags = Array.isArray(topic_tags) ? topic_tags.join(",") : topic_tags || "";
    const image = req.file ? req.file.filename : null;

    const sql = `INSERT INTO ${table} (short_title, full_title, topic_tags, description, status, author, image, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;
    db.query(sql, [short_title, full_title, tags, description, status || "draft", author || "System", image], (err, result) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.status(201).json({ message: "Post created", id: result.insertId, image });
    });
  });
});

/* --------------------------------------------------
   UPDATE POST (LIMITED FIELDS)
-------------------------------------------------- */
router.put("/:category/:id", (req, res) => {
  const { category, id } = req.params;
  const table = tableMap[category];
  if (!table) return res.status(400).json({ message: "Invalid category" });

  const upload = getUpload(category);
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(500).json({ message: "Image upload failed" });

    const { short_title, full_title, topic_tags, description, author } = req.body;
    const tags = Array.isArray(topic_tags) ? topic_tags.join(",") : topic_tags || "";
    const image = req.file ? req.file.filename : null;

    let sql = `UPDATE ${table} SET short_title = ?, full_title = ?, topic_tags = ?, description = ?, updated_at = NOW()`;
    const values = [short_title, full_title, tags, description];

    if (image) {
      sql += `, image = ?`;
      values.push(image);
    }
    sql += ` WHERE id = ?`;
    values.push(id);

    db.query(sql, values, (err, result) => {
      if (err) return res.status(500).json({ message: "Update failed" });

      // Log edit
      const logSQL = `INSERT INTO post_logs (post_id, category, action, editor, message) VALUES (?, ?, 'edit', ?, 'Post updated')`;
      db.query(logSQL, [id, category, author || "System"], () => {});

      res.json({ message: "Post updated successfully" });
    });
  });
});

/* --------------------------------------------------
   TRASH POST
-------------------------------------------------- */
router.put("/trash/:category/:id", (req, res) => {
  const { category, id } = req.params;
  const table = tableMap[category];
  if (!table) return res.status(400).json({ message: "Invalid category" });

  const sql = `UPDATE ${table} SET status = 'trash' WHERE id = ?`;
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to move to trash" });

    const logSQL = `INSERT INTO post_logs (post_id, category, action, editor, message) VALUES (?, ?, 'trash', ?, 'Post moved to trash')`;
    db.query(logSQL, [id, category, req.body.author || "System"]);

    res.json({ message: "Post moved to trash" });
  });
});

export default router;
