const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/classes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM classes");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
