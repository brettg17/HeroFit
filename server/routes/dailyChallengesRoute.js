const express = require('express');
const router = express.Router();
const db = require('./db'); // Import your database connection

// Helper function to get a random subset of an array
const getRandomSubset = (array, size) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

router.get('/', async (req, res) => {
  try {
    // Query the database for all challenges
    const allChallenges = await db.query('SELECT workout_id, workout_type, difficulty, duration, class_id FROM Workouts');

    // Get a random subset of 3 challenges
    const randomChallenges = getRandomSubset(allChallenges.rows, 3);

    res.status(200).json(randomChallenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
