// backend/routes/doctorsVisibility.js
import express from "express";
import db from "../src/db.js";

const router = express.Router();

console.log("✅ Doctors visibility routes loaded");

// Helper: Promisify db.query for this file only
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// 1. Get ALL visibility records (for Admin panel)
router.get("/visibility", async (req, res) => {
  console.log("📍 GET /visibility");
  try {
    const rows = await query(
      // ← Changed from db.query to query
      "SELECT employee_id, is_shown FROM doctors_visibility"
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ GET /visibility error:", err);
    res.json([]); // Return empty array on error
  }
});

// 2. Save or update visibility toggle
router.post("/visibility", async (req, res) => {
  console.log("📍 POST /visibility", req.body);
  const { employeeID, isShown } = req.body;

  if (!employeeID || isShown === undefined) {
    return res.json({ success: false, message: "Missing data" });
  }

  try {
    await query(
      // ← Changed from db.query to query
      `INSERT INTO doctors_visibility (employee_id, is_shown)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE is_shown = VALUES(is_shown)`,
      [employeeID, isShown]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("❌ POST /visibility error:", err);
    res.json({ success: false }); // Always return JSON
  }
});

// 3. Get visible doctor IDs only
router.get("/visible", async (req, res) => {
  console.log("📍 GET /visible");
  try {
    const rows = await query(
      // ← Changed from db.query to query
      "SELECT employee_id FROM doctors_visibility WHERE is_shown = 1"
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ GET /visible error:", err);
    res.json([]);
  }
});

// 4. Get FULL visible doctors (for website)
router.get("/visible-full", async (req, res) => {
  console.log("📍 GET /visible-full");
  try {
    // Get visible IDs
    const visibility = await query(
      // ← Changed from db.query to query
      "SELECT employee_id FROM doctors_visibility WHERE is_shown = 1"
    );
    const visibleIds = visibility.map((v) => v.employee_id);

    console.log("✅ Visible IDs:", visibleIds);

    if (visibleIds.length === 0) {
      return res.json([]); // No visible doctors
    }

    // Fetch from EMS
    const emsResponse = await fetch(
      "http://147.185.221.27:34249/Group-4-SIA-EMS/api/api.php?module=employee&filter_doctors=1",
      { signal: AbortSignal.timeout(8000) }
    );

    if (!emsResponse.ok) {
      console.warn("⚠️ EMS API unreachable");
      return res.json([]);
    }

    const employees = await emsResponse.json();
    console.log(`✅ Fetched ${employees.length} doctors from EMS`);

    // Filter only visible doctors
    const filtered = employees.filter((emp) => {
      const id = Number(emp.employeeID); // ← Critical fix
      return emp.employeeID && visibleIds.includes(id);
    });

    console.log(`✅ Returning ${filtered.length} visible doctors`);
    res.json(filtered);
  } catch (err) {
    console.error("❌ GET /visible-full error:", err.message);
    res.json([]); // Never crash
  }
});

export default router;
