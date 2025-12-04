import express from "express";
import db from "../src/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import slugify from "slugify";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join("uploads", "announcements");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* ============================================================
   CREATE ANNOUNCEMENT
============================================================ */
router.post("/", upload.single("image"), (req, res) => {
  const { short_title, full_title, topic_tags, description, status, scheduled_at, author } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!short_title || !full_title || !description) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const tags = Array.isArray(topic_tags) ? topic_tags.join(",") : topic_tags || "";

  // Generate slug
  let slug = slugify(short_title || full_title, { lower: true, strict: true });

  // Make slug unique
  db.query("SELECT COUNT(*) AS count FROM announcement WHERE slug = ?", [slug], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    if (result[0].count > 0) slug += "-" + Date.now();

    const sql = `
      INSERT INTO announcement
      (short_title, full_title, topic_tags, description, status, scheduled_at, author, image, slug)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [short_title, full_title, tags, description, status || "draft", scheduled_at || null, author || 1, image, slug],
      (err, result) => {
        if (err) return res.status(500).json({ message: "DB error", error: err });
        res.status(201).json({ message: "Announcement created", id: result.insertId, slug, image });
      }
    );
  });
});

/* ============================================================
   GET ALL ANNOUNCEMENTS
============================================================ */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM announcement ORDER BY created_at DESC";

  const stripHtml = (html) => html.replace(/<[^>]*>/g, "");

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    const announcements = results.map((row) => ({
      ...row,
      image: row.image
        ? `http://26.41.72.16:5000/uploads/announcements/${row.image}`
        : null,
      short_description: row.description
        ? stripHtml(row.description).split(" ").slice(0, 5).join(" ") + "..."
        : "",
    }));

    res.json(announcements);
  });
});


/* ==================Nnew DATABASE
pl============================================================ */
router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  const sql = "SELECT * FROM announcement WHERE slug = ?";
  db.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    if (results.length === 0) return res.status(404).json({ message: "Announcement not found" });

    const announcement = results[0];
    announcement.image = announcement.image
      ? `http://26.41.72.16:5000/uploads/announcements/${announcement.image}`
      : null;

    res.json(announcement);
  });
});

export default router;
