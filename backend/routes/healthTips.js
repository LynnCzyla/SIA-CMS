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
   GET ALL HEALTH TIPS (ONLY PUBLISHED) - ID ONLY
============================================================ */
router.get("/", (req, res) => {
  const sql = `
    SELECT *
    FROM health_tips
    WHERE status='published'
    ORDER BY created_at DESC
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: err.sqlMessage });
    }
    
    res.json(
      results.map((r) => ({
        ...r,
        image_url: r.image ? `http://26.41.72.16:5000/uploads/health_tips/${r.image}` : null,
      }))
    );
  });
});

/* ============================================================
   GET SINGLE HEALTH TIP BY SLUG - ID ONLY
============================================================ */
router.get("/:slug", (req, res) => {
  const sql = `
    SELECT *
    FROM health_tips
    WHERE slug = ?
  `;
  
  db.query(sql, [req.params.slug], (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: err.sqlMessage });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Health tip not found" });
    }
    
    const article = results[0];
    article.image_url = article.image 
      ? `http://26.41.72.16:5000/uploads/health_tips/${article.image}` 
      : null;
    
    res.json(article);
  });
});

/* ============================================================
   CREATE HEALTH TIP - STORE USER ID
============================================================ */
router.post("/", upload.single("image"), (req, res) => {
  console.log("📝 Received body:", req.body);
  console.log("📎 Received file:", req.file);
  
  const { short_title, full_title, topic_tags, description, status, author } = req.body;
  const image = req.file ? req.file.filename : null;
  
  // Validation
  if (!short_title || !full_title || !description) {
    return res.status(400).json({ 
      success: false,
      message: "Missing required fields: short_title, full_title, and description are required" 
    });
  }
  
  // Process tags
  const tags = Array.isArray(topic_tags) ? topic_tags.join(",") : topic_tags || "";
  
  // Generate slug from short_title
  const slug = short_title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  
  // Convert author to integer (user ID)
  const authorId = author ? parseInt(author, 10) : null;
  
  if (!authorId) {
    return res.status(400).json({ 
      success: false,
      message: "Author ID is required" 
    });
  }
  
  const sql = `
    INSERT INTO health_tips
      (short_title, full_title, topic_tags, description, status, author, image, slug, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;
  
  console.log("🔍 Executing query with:", { 
    short_title, 
    full_title, 
    tags, 
    description, 
    status: status || "draft", 
    authorId, 
    image, 
    slug 
  });
  
  db.query(
    sql, 
    [short_title, full_title, tags, description, status || "draft", authorId, image, slug], 
    (err, result) => {
      if (err) {
        console.error("❌ Database error:", err);
        return res.status(500).json({ 
          success: false,
          message: "Database error occurred", 
          error: err.message,
          code: err.code,
          sqlMessage: err.sqlMessage 
        });
      }
      
      console.log("✅ Successfully created health tip with ID:", result.insertId);
      
      res.status(201).json({ 
        success: true,
        message: "Health Tip created successfully!", 
        id: result.insertId, 
        slug 
      });
    }
  );
});

/* ============================================================
   GET ALL HEALTH TIPS (INCLUDING DRAFTS) - FOR ADMIN
============================================================ */
router.get("/admin/all", (req, res) => {
  const sql = `
    SELECT *
    FROM health_tips
    ORDER BY created_at DESC
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: err.sqlMessage });
    }
    
    res.json(
      results.map((r) => ({
        ...r,
        image_url: r.image ? `http://26.41.72.16:5000/uploads/health_tips/${r.image}` : null,
      }))
    );
  });
});

/* ============================================================
   UPDATE HEALTH TIP
============================================================ */
router.put("/:id", upload.single("image"), (req, res) => {
  const { short_title, full_title, topic_tags, description, status, author } = req.body;
  const image = req.file ? req.file.filename : null;
  
  const tags = Array.isArray(topic_tags) ? topic_tags.join(",") : topic_tags || "";
  const slug = short_title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  
  const authorId = author ? parseInt(author, 10) : null;
  
  let sql = `
    UPDATE health_tips 
    SET short_title=?, full_title=?, topic_tags=?, description=?, status=?, author=?, slug=?
  `;
  
  const params = [short_title, full_title, tags, description, status, authorId, slug];
  
  if (image) {
    sql += ", image=?";
    params.push(image);
  }
  
  sql += " WHERE id=?";
  params.push(req.params.id);
  
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("❌ Update error:", err);
      return res.status(500).json({ success: false, message: err.sqlMessage });
    }
    
    res.json({ success: true, message: "Health Tip updated successfully!" });
  });
});

/* ============================================================
   DELETE HEALTH TIP
============================================================ */
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM health_tips WHERE id=?";
  
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("❌ Delete error:", err);
      return res.status(500).json({ success: false, message: err.sqlMessage });
    }
    
    res.json({ success: true, message: "Health Tip deleted successfully!" });
  });
});

export default router;