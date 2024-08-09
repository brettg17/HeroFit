const express = require('express');
const router = express.Router();
const db = require('../db'); 

const getRandomSubset = (array, size) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

router.get('/', async (req, res) => {
  try {
    // Query  database for all challenges 
    const allChallenges = await db.query('SELECT workout_id, workout_type, difficulty, duration, class_id, description FROM Workouts');
    console.log('All Challenges:', allChallenges.rows);

    // Get a random 3 challenges
    const randomChallenges = getRandomSubset(allChallenges.rows, 3);

    res.status(200).json(randomChallenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
