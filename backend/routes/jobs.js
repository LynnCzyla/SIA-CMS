// backend/routes/jobs.js
import express from "express";
import db from "../src/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure uploads folder exists BEFORE multer is used
const uploadDir = path.join(process.cwd(), "uploads/jobs");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ============================================
// 🔐 MIDDLEWARE: Validate API Key for EMS
// ============================================
const validateEMSApiKey = (req, res, next) => {
  const apiKey = req.body?.api_key || req.query?.api_key;

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API key is required",
    });
  }

  if (apiKey !== process.env.EMS_API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Invalid API key",
    });
  }

  next();
};

// ============================================
// 🆕 EMS ENDPOINT: Submit Job for Approval
// ============================================



router.post("/ems/submit", upload.single("image"), validateEMSApiKey, (req, res) => {
  const {
    job_title,
    short_title = "",
    department,
    job_type = "Regular / Permanent",
    location,
    qualifications = "",
    application_deadline,
    description = "",
    ems_user_id,
    ems_user_name,
    ems_notes = "",           
    urgency_level = "medium",
  } = req.body;

  // Validate urgency level
  const validUrgency = ['urgent', 'medium', 'low'];
  const finalUrgency = validUrgency.includes(urgency_level?.toLowerCase()) 
    ? urgency_level.toLowerCase() 
    : 'medium';

  // Validate required fields
  if (!job_title || !department || !location || !ems_user_id || !ems_user_name) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields: job_title, department, location, ems_user_id, ems_user_name" 
    });
  }

  const sql = `
    INSERT INTO jobs
    (job_title, short_title, department, job_type, location, qualifications,
      application_deadline, description, status, image, author,
      submitted_by_ems, ems_user_id, ems_user_name, ems_notes, urgency_level, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending_approval', ?, NULL,
            1, ?, ?, ?, ?, NOW())
  `;

  db.query(
    sql,
    [
      job_title,
      short_title || job_title,
      department,
      job_type,
      location,
      qualifications,
      application_deadline || null,
      description,
      req.file?.filename || null,
      ems_user_id,
      ems_user_name,
      ems_notes || null,    
      finalUrgency,      
    ],
    (err, result) => {
      if (err) {
        console.error("❌ DB Error (EMS submit):", err);
        return res.status(500).json({ 
          success: false, 
          message: "Database error", 
          error: err.message 
        });
      }

      const jobId = result.insertId;

      // 🆕 NEW: Create urgency badge based on level
      const urgencyBadge = {
        urgent: { label: "🔴 URGENT", color: "#dc3545" },
        medium: { label: "🟡 Medium Priority", color: "#ffc107" },
        low: { label: "🟢 Low Priority", color: "#28a745" }
      };

      // Create notification for CMS admins
      const notificationMetadata = {
        badges: [
          urgencyBadge[finalUrgency],              
          { label: "Just now", color: "#28a745" },
          { label: "EMS", color: "#007bff" },
          { label: department, color: "#6c757d" }
        ],
        job_id: jobId,
        department: department,
        deadline: application_deadline,
        urgency: finalUrgency,   
        has_notes: !!ems_notes  
      };

      db.query(
        `INSERT INTO notifications (user_id, type, title, description, metadata, created_at)
         SELECT id, 'job_approval', ?, ?, ?, NOW()
         FROM users WHERE role IN ('super_administrator')`,
        [
          `New ${finalUrgency.toUpperCase()} job posting from EMS: "${job_title}"`,
          `${ems_user_name} submitted a ${job_type} position for ${department}${ems_notes ? ' (with notes)' : ''}`,
          JSON.stringify(notificationMetadata)
        ],
        (notifErr) => {
          if (notifErr) console.error("⚠️ Notification error:", notifErr);
        }
      );

      // Log EMS submission
      db.query(
        `INSERT INTO ems_job_logs (job_id, action, ems_user_id, timestamp)
         VALUES (?, 'submitted', ?, NOW())`,
        [jobId, ems_user_id],
        (logErr) => {
          if (logErr) console.error("⚠️ Log error:", logErr);
        }
      );

      console.log(`✅ EMS job submitted: ID ${jobId} by ${ems_user_name} (${finalUrgency})`);

      res.status(201).json({
        success: true,
        message: "Job submitted successfully. Awaiting CMS approval.",
        data: {
          job_id: jobId,
          status: "pending_approval",
          urgency_level: finalUrgency,
          has_notes: !!ems_notes,
          submitted_at: new Date().toISOString()
        }
      });
    }
  );
});

// ============================================
// 🆕 EMS ENDPOINT: Check Job Status
// ============================================
router.get("/ems/status/:job_id", validateEMSApiKey, (req, res) => {
  const { job_id } = req.params;

  const sql = `
    SELECT 
      id, job_title, status, urgency_level, ems_notes,
      created_at, reviewed_at, rejection_reason, ems_user_name
    FROM jobs 
    WHERE id = ? AND submitted_by_ems = 1
  `;

  db.query(sql, [job_id], (err, results) => {
    if (err) {
      console.error("❌ DB Error (status check):", err);
      return res.status(500).json({ 
        success: false, 
        message: "Database error" 
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Job not found or not submitted by EMS" 
      });
    }

    const job = results[0];

    res.json({
      success: true,
      data: {
        job_id: job.id,
        job_title: job.job_title,
        status: job.status,
        urgency_level: job.urgency_level,
        ems_notes: job.ems_notes,
        submitted_by: job.ems_user_name,
        submitted_at: job.created_at,
        reviewed_at: job.reviewed_at || null,
        rejection_reason: job.rejection_reason || null
      }
    });
  });
});

// ============================================
// 🆕 EMS ENDPOINT: Get All Jobs by EMS User
// ============================================
router.get("/ems/all", validateEMSApiKey, (req, res) => {
  const { ems_user_id, status, urgency } = req.query;

  let sql = `
    SELECT 
      id, job_title, short_title, department, job_type, 
      location, status, urgency_level, ems_notes,
      created_at, reviewed_at, ems_user_name,
      rejection_reason
    FROM jobs 
    WHERE submitted_by_ems = 1
  `;

  const params = [];

  if (ems_user_id) {
    sql += " AND ems_user_id = ?";
    params.push(ems_user_id);
  }

  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }

  if (urgency) {
    sql += " AND urgency_level = ?";
    params.push(urgency);
  }

  sql += " ORDER BY FIELD(urgency_level, 'urgent', 'medium', 'low'), created_at DESC";

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("❌ DB Error (get all):", err);
      return res.status(500).json({ 
        success: false, 
        message: "Database error" 
      });
    }

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  });
});

// ============================================
// 🆕 CMS ADMIN: Get Pending Jobs from EMS
// ============================================
router.get("/pending", (req, res) => {
  const sql = `
    SELECT 
      j.*, 
      u.full_name as reviewer_name
    FROM jobs j
    LEFT JOIN users u ON j.reviewed_by = u.id
    WHERE j.status = 'pending_approval' AND j.submitted_by_ems = 1
    ORDER BY FIELD(j.urgency_level, 'urgent', 'medium', 'low'), j.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ DB Error (pending jobs):", err);
      return res.status(500).json({ 
        success: false, 
        message: "Database error" 
      });
    }

    res.json({ 
      success: true, 
      count: results.length,
      jobs: results 
    });
  });
});

// ============================================
// 🆕 CMS ADMIN: Approve/Reject Job
// ============================================
router.patch("/:id/review", (req, res) => {
  const { id } = req.params;
  const { action, reviewer_id, rejection_reason } = req.body;

  if (!["approve", "reject"].includes(action)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid action. Use 'approve' or 'reject'" 
    });
  }

  if (!reviewer_id) {
    return res.status(400).json({ 
      success: false, 
      message: "reviewer_id is required" 
    });
  }

  const newStatus = action === "approve" ? "posted" : "rejected";

  const sql = `
    UPDATE jobs 
    SET status = ?, reviewed_by = ?, reviewed_at = NOW(), 
        rejection_reason = ?
    WHERE id = ? AND submitted_by_ems = 1
  `;

  db.query(
    sql,
    [newStatus, reviewer_id, rejection_reason || null, id],
    (err, result) => {
      if (err) {
        console.error("❌ DB Error (review):", err);
        return res.status(500).json({ 
          success: false, 
          message: "Failed to update job" 
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ 
          success: false, 
          message: "Job not found or not from EMS" 
        });
      }

      // Log the review action
      db.query(
        `INSERT INTO ems_job_logs (job_id, action, cms_reviewer_id, timestamp)
         VALUES (?, ?, ?, NOW())`,
        [id, action, reviewer_id],
        (logErr) => {
          if (logErr) console.error("⚠️ Log error:", logErr);
        }
      );

      console.log(`✅ Job ${id} ${action}d by reviewer ${reviewer_id}`);

      res.json({ 
        success: true, 
        message: `Job ${action}d successfully`,
        job_id: id,
        new_status: newStatus
      });
    }
  );
});

// ============================================
// 📝 CMS INTERNAL: Create Job (existing)
// ============================================
router.post("/", upload.single("image"), (req, res) => {
  const {
    job_title,
    short_title = "",
    department,
    job_type = "Regular / Permanent",
    location,
    qualifications,
    application_deadline,
    description,
    status = "draft",
    author,
  } = req.body;

  const sql = `
    INSERT INTO jobs
    (job_title, short_title, department, job_type, location, qualifications, 
     application_deadline, description, status, image, author, submitted_by_ems)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
  `;

  db.query(
    sql,
    [
      job_title,
      short_title,
      department,
      job_type,
      location,
      qualifications,
      application_deadline,
      description,
      status,
      req.file?.filename || null,
      author,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ DB Error (POST job):", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true, id: result.insertId });
    }
  );
});

// ============================================
// 📝 CMS INTERNAL: Update Job (existing)
// ============================================
router.put("/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const {
    job_title,
    short_title = "",
    department,
    job_type = "Regular / Permanent",
    location,
    qualifications,
    application_deadline,
    description,
    status = "draft",
    author,
  } = req.body;

  let sql = `
    UPDATE jobs
    SET job_title = ?, short_title = ?, department = ?, job_type = ?, 
        location = ?, qualifications = ?, application_deadline = ?, 
        description = ?, status = ?, author = ?
  `;
  
  const values = [
    job_title, short_title, department, job_type, location,
    qualifications, application_deadline, description, status, author,
  ];

  if (req.file?.filename) {
    sql += `, image = ?`;
    values.push(req.file.filename);
  }

  sql += ` WHERE id = ? AND submitted_by_ems = 0`;
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ DB Error (PUT job):", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  
    // If no row was updated, job is from EMS
    if (result.affectedRows === 0) {
      return res.status(403).json({
        success: false,
        message: "Cannot modify EMS-submitted job. Only CMS-created jobs can be edited."
      });
    }
  
    res.json({ success: true, affectedRows: result.affectedRows });
  });

});

// ============================================
// 📖 PUBLIC: Get Published Jobs (existing)
// ============================================
router.get("/", (req, res) => {
  const { keyword, department, location, sort } = req.query;

  let sql = `
    SELECT * FROM jobs
    WHERE status IN ('posted', 'publish', 'published')
  `;
  const values = [];

  if (keyword) {
    sql += ` AND (job_title LIKE ? OR short_title LIKE ? OR description LIKE ?)`;
    values.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
  }

  if (department) {
    sql += ` AND department = ?`;
    values.push(department);
  }

  if (location) {
    sql += ` AND location = ?`;
    values.push(location);
  }

  if (sort === "title") {
    sql += ` ORDER BY job_title ASC`;
  } else if (sort === "date") {
    sql += ` ORDER BY application_deadline DESC`;
  } else if (sort === "department") {
    sql += ` ORDER BY department ASC`;
  } else {
    sql += ` ORDER BY id DESC`;
  }

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("❌ DB Error (GET jobs):", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, jobs: results });
  });
});

// ============================================
// 📖 PUBLIC: Get Single Job (existing)
// ============================================
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT * FROM jobs
    WHERE id = ? AND status IN ('posted', 'publish', 'published')
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ DB Error (GET job):", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    if (!results[0]) {
      return res.status(404).json({ 
        success: false, 
        message: "Job not found or not published" 
      });
    }

    res.json({ success: true, job: results[0] });
  });
});

export default router;