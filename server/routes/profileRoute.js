const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  console.log(`Fetching profile for user_id: ${user_id}`);

  try {
    // fetch user data
    const userResult = await pool.query('SELECT * FROM Users WHERE user_id = $1', [user_id]);
    if (userResult.rows.length === 0) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];

    // fetch user profile data
    const userProfileResult = await pool.query('SELECT * FROM UserProfiles WHERE user_id = $1', [user_id]);
    if (userProfileResult.rows.length === 0) {
      console.error('User profile not found');
      return res.status(404).json({ error: 'User profile not found' });
    }

    const userProfile = userProfileResult.rows[0];
    console.log('User profile fetched successfully:', userProfile);

    // combine user and userprofile data
    const profileData = {
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
      signup_date: user.signup_date,
    };

    // Send the combined profile data back to the client
    res.status(200).json(profileData);

  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
