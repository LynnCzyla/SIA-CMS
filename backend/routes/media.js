// backend/routes/media.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import db from "../src/db.js";

const router = express.Router();

// Ensure upload folder exists
const uploadDir = path.resolve("uploads", "media");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // Use title from frontend if provided, else original name
    const title = req.body.title || file.originalname;
    const ext = path.extname(file.originalname);
    const safeTitle = title.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9\-]/g, ""); // clean string
    cb(null, `${safeTitle}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// ------------------ Upload Files ------------------
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const uploadedFile = {
    name: req.body.title || req.file.originalname,
    filename: req.file.filename,
    url: `/uploads/media/${req.file.filename}`,
    size: `${(req.file.size / 1024).toFixed(1)} KB`,
    status: "Active",
    section: null,
    date_uploaded: new Date().toISOString(),
  };

  // Insert into database
  db.query(
    "INSERT INTO files (name, filename, url, status, section, date_uploaded) VALUES (?, ?, ?, ?, ?, ?)",
    [
      uploadedFile.name,
      uploadedFile.filename,
      uploadedFile.url,
      uploadedFile.status,
      uploadedFile.section,
      uploadedFile.date_uploaded,
    ],
    (err) => {
      if (err) {
        console.error("MySQL Insert Error:", err.sqlMessage);
        return res.status(500).json({ message: "Database insert failed" });
      }

      const baseUrl = `http://26.41.72.16:5000`;
      uploadedFile.url = baseUrl + uploadedFile.url;
      res.status(201).json({ file: uploadedFile });
    }
  );
});

// ------------------ Get All Files ------------------
router.get("/files", (req, res) => {
  db.query("SELECT * FROM files ORDER BY date_uploaded DESC", (err, results) => {
    if (err) {
      console.error("MySQL Fetch Error:", err.sqlMessage);
      return res.status(500).json({ message: "Database fetch failed" });
    }

    const baseUrl = `http://26.41.72.16:5000`;
    const files = results.map((file) => ({
      ...file,
      url: baseUrl + file.url,
    }));

    res.json({ files });
  });
});

// ------------------ Delete File ------------------
router.delete("/delete/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);

  fs.unlink(filePath, (err) => {
    if (err) console.warn("File missing:", err.message);

    db.query("DELETE FROM files WHERE filename = ?", [filename], (dbErr) => {
      if (dbErr) {
        console.error("MySQL Delete Error:", dbErr.sqlMessage);
        return res.status(500).json({ message: "Database delete failed" });
      }
      res.json({ message: "File deleted successfully" });
    });
  });
});

// ------------------ Assign / Unassign ------------------
router.post("/assign", (req, res) => {
  const { filename, section } = req.body;
  if (!filename) return res.status(400).json({ message: "Filename required" });

  db.query(
    "UPDATE files SET section = ? WHERE filename = ?",
    [section || null, filename],
    (err) => {
      if (err) {
        console.error("MySQL Assign Error:", err.sqlMessage);
        return res.status(500).json({ message: "Database update failed" });
      }
      res.json({ message: "File updated successfully", section: section || null });
    }
  );
});

export default router;
