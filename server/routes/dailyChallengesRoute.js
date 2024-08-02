const express = require("express");
const router = express.Router();

// Helper function to shuffle an array and get a subset
const getRandomSubset = (array, size) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};


router.get("/", async (req, res) => {
  try {
    // Mock data with various class_id values
    const allChallenges = [
      { workout_id: 1, workout_type: 'Bench Press', difficulty: 'Easy', duration: 7.5, class_id: 1 },
      { workout_id: 2, workout_type: 'Squats', difficulty: 'Easy', duration: 7.5, class_id: 1 },
      { workout_id: 3, workout_type: 'Incline Dumbbell Press', difficulty: 'Medium', duration: 10, class_id: 1 },
      { workout_id: 4, workout_type: 'Pull Ups', difficulty: 'Medium', duration: 10, class_id: 2 },
      { workout_id: 5, workout_type: 'Deadlifts', difficulty: 'Hard', duration: 15, class_id: 3 },
      { workout_id: 6, workout_type: 'Push Ups', difficulty: 'Medium', duration: 5, class_id: 4 },
      { workout_id: 7, workout_type: 'Burpees', difficulty: 'Hard', duration: 8, class_id: 2 }
    ];

    // Get a random subset of 3 challenges from the entire list
    const randomChallenges = getRandomSubset(allChallenges, 3);


    res.status(200).json(randomChallenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
