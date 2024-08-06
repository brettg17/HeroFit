const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/my-profile/:username', async (req, res) => {
  const { username } = req.params;
  console.log(`Fetching profile for username: ${username}`); // Debug logging

  try {
    const userResult = await pool.query('SELECT * FROM Users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      console.log(`User not found: ${username}`); // Debug logging
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = userResult.rows[0];
    const userProfileResult = await pool.query('SELECT * FROM UserProfiles WHERE user_id = $1', [user.id]);
    if (userProfileResult.rows.length === 0) {
      console.log(`User profile not found for user_id: ${user.id}`); // Debug logging
      return res.status(404).json({ error: 'User profile not found' });
    }

    const userProfile = userProfileResult.rows[0];

    console.log(`User profile data: ${JSON.stringify(userProfile)}`); // Debug logging

    res.status(200).json({
      username: user.username,
      biography: userProfile.biography || 'This is a placeholder biography.',
      warriorXP: userProfile.warrior_experience,
      warriorLevel: userProfile.warrior_level,
      rogueXP: userProfile.rogue_experience,
      rogueLevel: userProfile.rogue_level,
      archerXP: userProfile.archer_experience,
      archerLevel: userProfile.archer_level,
      wizardXP: userProfile.wizard_experience,
      wizardLevel: userProfile.wizard_level,
      challengesCompleted: userProfile.challenges_completed || 0,
      accountCreated: user.created_at,
    });
  } catch (err) {
    console.error('Server error:', err.message); // Debug logging
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
