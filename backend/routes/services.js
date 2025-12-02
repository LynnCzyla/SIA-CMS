import express from "express";
import db from "../src/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// -----------------------------
// Ensure upload folder exists
// -----------------------------
const uploadDir = path.join("uploads", "services");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// -----------------------------
// Multer configuration
// -----------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// -----------------------------
// Helper function to generate slug
// -----------------------------
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// -----------------------------
// CREATE SERVICE
// -----------------------------
router.post("/", upload.single("image"), (req, res) => {
  console.log("FormData body:", req.body);
  const { shortTitle, fullTitle, topicTags, description, status, userId } = req.body;
  const image = req.file ? req.file.filename : null;

  // Check required fields
  if (!shortTitle || !fullTitle || !description || !userId) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  // Generate slug from fullTitle
  const slug = generateSlug(fullTitle);

  const sql = `
    INSERT INTO services
    (id, user_id, short_title, full_title, slug, topic_tags, description, status, image, created_at, updated_at)
    VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  db.query(
    sql,
    [userId, shortTitle, fullTitle, slug, topicTags || null, description, status || "published", image],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: err.sqlMessage });

      res.json({
        success: true,
        message: "Service created successfully",
        slug: slug,
        image_url: image ? `http://localhost:5000/uploads/services/${image}` : null,
      });
    }
  );
});


// -----------------------------
// GET ALL PUBLISHED SERVICES
// -----------------------------
// GET ALL PUBLISHED SERVICES
// -----------------------------
router.get("/", (req, res) => {
  const sql = "SELECT * FROM services WHERE status='published' ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.sqlMessage });

    // Add full URL for images
    const servicesWithUrls = results.map((r) => ({
      ...r,
      image_url: r.image ? `http://localhost:5000/uploads/services/${r.image}` : null,
    }));
    
    console.log("Returning services:", servicesWithUrls.length);
    console.log("First service image_url:", servicesWithUrls[0]?.image_url);
    
    res.json(servicesWithUrls);
  });
});

// -----------------------------
// GET SINGLE SERVICE BY SLUG
// -----------------------------
router.get("/:slug", (req, res) => {
  const sql = "SELECT * FROM services WHERE slug=?";
  db.query(sql, [req.params.slug], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.sqlMessage });
    if (!results.length) return res.status(404).json({ success: false, message: "Service not found" });

    const service = results[0];
    service.image_url = service.image ? `http://localhost:5000/uploads/services/${service.image}` : null;
    res.json(service);
  });
});

// -----------------------------
// Serve uploaded images
// -----------------------------
router.use("/uploads", express.static(path.join(process.cwd(), "uploads", "services")));

export default router;