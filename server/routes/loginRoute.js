const express = require("express");
const router = express.Router();
const pool = require("../db");

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


module.exports = router;