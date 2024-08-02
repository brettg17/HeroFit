const express = require("express");
const router = express.Router();
const pool = require("../db");

// Helper function to get a random subset of items
const getRandomSubset = (array, numItems) => {
  const shuffled = array.sort(() => 0.5 - Math.random()); // Shuffle array
  return shuffled.slice(0, numItems); // Return the first `numItems` items
};

// Get daily challenges filtered by class_id
router.get("/", async (req, res) => {
  try {
    const { class_id } = req.query;
    console.log(`Received class_id: ${class_id}`); // Debugging line

    // Updated mock data with class_id
    const allChallenges = [
      { workout_id: 1, workout_type: 'Bench Press', difficulty: 'Easy', duration: 7.5, class_id: 1 },
      { workout_id: 2, workout_type: 'Squats', difficulty: 'Easy', duration: 7.5, class_id: 1 },
      { workout_id: 3, workout_type: 'Incline Dumbbell Press', difficulty: 'Medium', duration: 10, class_id: 1 },
      { workout_id: 4, workout_type: 'Pull Ups', difficulty: 'Medium', duration: 10, class_id: 2 },
      { workout_id: 5, workout_type: 'Deadlifts', difficulty: 'Hard', duration: 15, class_id: 3 },
      { workout_id: 6, workout_type: 'Push Ups', difficulty: 'Medium', duration: 5, class_id: 4 },
      { workout_id: 7, workout_type: 'Burpees', difficulty: 'Hard', duration: 8, class_id: 2 }
    ];

    // Filter challenges based on class_id if provided
    const filteredChallenges = class_id 
      ? allChallenges.filter(challenge => challenge.class_id == class_id)
      : allChallenges;
    
    console.log(`Filtered challenges: ${JSON.stringify(filteredChallenges)}`); // Debugging line

    // Get 3 random challenges from the filtered list
    const randomChallenges = getRandomSubset(filteredChallenges, 3);
    
    res.status(200).json(randomChallenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
