const express = require('express');
const router = express.Router();
const pool = require('../db'); 


router.post('/update-daily-challenges-completed/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {

    await pool.query(
      'UPDATE users SET dailychallenges_completed = dailychallenges_completed + 1 WHERE user_id = $1',
      [userId]
    );
    res.status(200).json({ message: 'Daily challenges completed updated successfully' });
  } catch (error) {
    console.error('Error updating daily challenges:', error);
    res.status(500).json({ message: 'Error updating daily challenges' });
  }
});

module.exports = router;
