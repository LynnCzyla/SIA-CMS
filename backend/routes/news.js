// backend/routes/news.js
import express from "express";
import db from "../src/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import slugify from "slugify";

const router = express.Router();

const uploadDir = path.join("uploads", "news");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* CREATE NEWS */
router.post("/", upload.single("image"), (req, res) => {
  const { short_title, full_title, topic_tags, description, status, scheduled_at, author } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!short_title || !full_title || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const tags = Array.isArray(topic_tags) ? topic_tags.join(",") : topic_tags || "";
  let slug = slugify(short_title || full_title, { lower: true, strict: true });

  db.query("SELECT COUNT(*) AS count FROM news WHERE slug = ?", [slug], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    if (result[0].count > 0) slug += "-" + Date.now();

    const sql = `
      INSERT INTO news
      (id, short_title, full_title, topic_tags, description, status, image, scheduled_at, created_at, updated_at, author, slug)
      VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)
    `;
    db.query(sql, [short_title, full_title, tags, description, status || "draft", image, scheduled_at || null, author || null, slug], (err) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json({ success: true, message: "News created successfully", slug, image_url: image ? `http://localhost:5000/uploads/news/${image}` : null });
    });
  });
});

/* GET ALL NEWS */
router.get("/", (req, res) => {
  const sql = `
    SELECT n.*, u.full_name AS author_name
    FROM news n
    LEFT JOIN users u ON n.author = u.id
    WHERE n.status='posted'
    ORDER BY n.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.json(
      results.map((r) => ({
        ...r,
        image_url: r.image ? `http://localhost:5000/uploads/news/${r.image}` : null,
      }))
    );
  });
});

/* GET SINGLE NEWS BY SLUG */
router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  const sql = `
    SELECT n.*, u.full_name AS author_name
    FROM news n
    LEFT JOIN users u ON n.author = u.id
    WHERE n.slug = ?
  `;
  db.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    if (results.length === 0) return res.status(404).json({ message: "News not found" });

    const article = results[0];
    article.image_url = article.image ? `http://localhost:5000/uploads/news/${article.image}` : null;
    res.json(article);
  });
});

router.use("/uploads", express.static(path.join(process.cwd(), "uploads/news")));

export default router;
