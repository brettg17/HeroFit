const express = require("express");
const router = express.Router();
const pool = require("../db");


const getRandomWorkouts = async () => {
  const result = await pool.query(
    "SELECT workout_type, duration FROM Workouts ORDER BY RANDOM() LIMIT 3"
  );
  return result.rows;
};


router.get("/daily-challenges", async (req, res) => {
  try {
    const workouts = await getRandomWorkouts();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
