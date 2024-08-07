const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const result = await pool.query(
      "INSERT INTO users (username, email, password, signup_date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING user_id",
      [username, email, password]
    );

    const userId = result.rows[0].user_id;

    await pool.query(
      "INSERT INTO UserProfiles (user_id, class_id) VALUES ($1, $2)",
      [userId, 1] 
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: "Email already in use" });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
