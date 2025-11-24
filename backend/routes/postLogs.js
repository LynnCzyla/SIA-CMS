// routes/postLogs.js
import express from "express";
import db from "../src/db.js";

const router = express.Router();

/**
 * GET /api/post-logs
 * Query params:
 *  - page (default 1)
 *  - limit (default 20)
 *  - category (optional)
 */
router.get("/", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const limit = Math.min(100, parseInt(req.query.limit || "20", 10));
  const offset = (page - 1) * limit;
  const { category } = req.query;

  let countSql = "SELECT COUNT(*) as total FROM post_logs";
  let dataSql = "SELECT * FROM post_logs";
  const params = [];

  if (category) {
    countSql += " WHERE category = ?";
    dataSql += " WHERE category = ?";
    params.push(category);
  }

  dataSql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  const dataParams = [...params, limit, offset];

  db.query(countSql, params, (err, countRes) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    const total = countRes[0].total || 0;
    db.query(dataSql, dataParams, (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.sqlMessage });
      res.json({
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        data: rows,
      });
    });
  });
});

export default router;
