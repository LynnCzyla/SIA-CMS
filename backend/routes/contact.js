import express from "express";
import db from "../src/db.js";

const router = express.Router();

// GET contact info
router.get("/", (req, res) => {
  const query = "SELECT * FROM contact_info WHERE id = 1";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching contact info:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: "Contact info not found" });
    }
    
    // Parse JSON mobile_numbers
    const contact = results[0];
    if (typeof contact.mobile_numbers === "string") {
      try {
        contact.mobile_numbers = JSON.parse(contact.mobile_numbers);
      } catch (e) {
        console.error("Error parsing mobile_numbers:", e);
        contact.mobile_numbers = {};
      }
    }
    
    res.json(contact);
  });
});

// POST/UPDATE contact info
router.post("/", (req, res) => {
  const {
    contact_us,
    contact_info,
    hospital_address,
    telephone,
    mobile_numbers,
    email
  } = req.body;

  const query = `
    UPDATE contact_info 
    SET 
      contact_us = ?,
      contact_info = ?,
      hospital_address = ?,
      telephone = ?,
      mobile_numbers = ?,
      email = ?
    WHERE id = 1
  `;

  const mobileNumbersJson = typeof mobile_numbers === "object" 
    ? JSON.stringify(mobile_numbers) 
    : mobile_numbers;

  db.query(
    query,
    [contact_us, contact_info, hospital_address, telephone, mobileNumbersJson, email],
    (err, result) => {
      if (err) {
        console.error("Error updating contact info:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Contact info not found" });
      }

      res.json({ 
        success: true, 
        message: "Contact info updated successfully" 
      });
    }
  );
});

export default router;