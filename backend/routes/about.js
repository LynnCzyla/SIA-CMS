import express from "express";
import db from "../src/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    db.query("SELECT * FROM about_hospital LIMIT 1", (err, results) => {
      if (err) {
        console.error("Error fetching about info:", err);
        return res.status(500).json({ error: "Server error fetching about info" });
      }
      res.json(results[0] || {});
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 Insert or Update About Info
router.post("/", async (req, res) => {
  const {
    aboutHospital,
    mission,
    vision,
    qualityPolicy,
    coreValues,
    ourHistory,
    privacyPolicy,
  } = req.body;

  try {
    db.query("SELECT id FROM about_hospital LIMIT 1", (err, rows) => {
      if (err) {
        console.error("Error checking row:", err);
        return res.status(500).json({ error: "Server error" });
        
      }

      if (rows.length === 0) {
        // INSERT
        db.query(
          `INSERT INTO about_hospital 
            (aboutHospital, mission, vision, qualityPolicy, coreValues, ourHistory, privacyPolicy)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [aboutHospital, mission, vision, qualityPolicy, coreValues, ourHistory, privacyPolicy],
          (err) => {
            if (err) {
              console.error("Insert error:", err);
              return res.status(500).json({ error: "Insert failed" });
            }
            res.json({ message: "About info created successfully!" });
          }
        );
      } else {
        // UPDATE
        db.query(
          `UPDATE about_hospital SET 
            aboutHospital = ?, 
            mission = ?, 
            vision = ?, 
            qualityPolicy = ?, 
            coreValues = ?, 
            ourHistory = ?, 
            privacyPolicy = ?
          WHERE id = ?`,
          [aboutHospital, mission, vision, qualityPolicy, coreValues, ourHistory, privacyPolicy, rows[0].id],
          (err) => {
            if (err) {
              console.error("Update error:", err);
              return res.status(500).json({ error: "Update failed" });
            }
            res.json({ message: "About info updated successfully!" });
          }
        );
      }
    });
  } catch (error) {
    console.error("Error updating about info:", error);
    res.status(500).json({ error: "Server error updating about info" });
  }
});

export default router;
