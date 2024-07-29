router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    console.log('Checking for existing email:', email); // Log email check

    // Check if email already exists
    const emailCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (emailCheck.rows.length > 0) {
      console.log('Email already exists');
      return res.status(400).json({ error: "Email already exists" });
    }

    console.log('Inserting new user:', { username, email }); // Log user insertion
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Signup error:', error.message); // Log error
    res.status(500).json({ error: error.message });
  }
});
