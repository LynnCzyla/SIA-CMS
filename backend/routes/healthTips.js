import express from "express";
import db from "../src/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure folder exists
const uploadDir = path.join("uploads", "health_tips");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* ============================================================
   GET ALL HEALTH TIPS (ONLY PUBLISHED)
============================================================ */
router.get("/", (req, res) => {
  const sql = `
    SELECT ht.*, u.full_name AS author_name
    FROM health_tips ht
    LEFT JOIN users u ON ht.author = u.id
    WHERE ht.status='published'
    ORDER BY ht.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.sqlMessage });

    res.json(
      results.map((r) => ({
        ...r,
        image_url: r.image ? `http://localhost:5000/uploads/health_tips/${r.image}` : null,
      }))
    );
  });
});

/* ============================================================
   GET SINGLE HEALTH TIP BY ID
============================================================ */
router.get("/:slug", (req, res) => {
  const sql = `
    SELECT ht.*, u.full_name AS author_name
    FROM health_tips ht
    LEFT JOIN users u ON ht.author = u.id
    WHERE ht.slug = ?
  `;
  db.query(sql, [req.params.slug], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.sqlMessage });
    if (results.length === 0) return res.status(404).json({ success: false, message: "Not found" });

    const article = results[0];
    article.image_url = article.image ? `http://localhost:5000/uploads/health_tips/${article.image}` : null;
    res.json(article);
  });
});

/* ============================================================
   CREATE HEALTH TIP
============================================================ */
router.post("/", upload.single("image"), (req, res) => {
  const { short_title, full_title, topic_tags, description, status, author } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!short_title || !full_title || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const tags = Array.isArray(topic_tags) ? topic_tags.join(",") : topic_tags || "";
  const slug = short_title.toLowerCase().replace(/\s+/g, "-");

  const sql = `
    INSERT INTO health_tips
      (short_title, full_title, topic_tags, description, status, author, image, slug, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(sql, [short_title, full_title, tags, description, status || "draft", author || null, image, slug], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.status(201).json({ message: "Health Tip created successfully!", id: result.insertId, slug });
  });
});

export default router;
