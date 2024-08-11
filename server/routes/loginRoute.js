const express = require("express");
const router = express.Router();
const pool = require("../db");

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).json({ error: "Invalid username/password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch user details by email
router.get("/user", async (req, res) => {
  const { email } = req.query;
  try {
    const result = await pool.query(
      "SELECT user_id, username FROM users WHERE email = $1",
      [email]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
