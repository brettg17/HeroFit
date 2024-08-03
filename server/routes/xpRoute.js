const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/update-xp', async (req, res) => {
  const { userId, classId, xpGained } = req.body;

  if (!classId) {
    return res.status(400).json({ error: 'Class ID is missing. Please try again.' });
  }

  try {
    // Add XP to the user's experience table
    await pool.query(
      'INSERT INTO Experience (user_id, class_id, xp_gained) VALUES ($1, $2, $3)',
      [userId, classId, xpGained]
    );

    // Update the user's profile XP and level
    const classNameResult = await pool.query('SELECT class_name FROM CharacterClasses WHERE class_id = $1', [classId]);
    if (classNameResult.rows.length === 0) {
      return res.status(400).json({ error: 'Class not found' });
    }

    const className = classNameResult.rows[0].class_name.toLowerCase();
    const classColumn = `${className}_experience`;
    const levelColumn = `${className}_level`;

    const updateQuery = `
      UPDATE UserProfiles 
      SET ${classColumn} = ${classColumn} + $1,
          ${levelColumn} = FLOOR(((${classColumn} + $1) / 100) + 1)
      WHERE user_id = $2
    `;
    await pool.query(updateQuery, [xpGained, userId]);

    const userProfile = await pool.query('SELECT * FROM UserProfiles WHERE user_id = $1', [userId]);
    if (userProfile.rows.length === 0) {
      throw new Error('User profile not found');
    }

    const user = userProfile.rows[0];
    const warriorXP = user.warrior_experience;
    const warriorLevel = user.warrior_level;
    const rogueXP = user.rogue_experience;
    const rogueLevel = user.rogue_level;
    const archerXP = user.archer_experience;
    const archerLevel = user.archer_level;
    const wizardXP = user.wizard_experience;
    const wizardLevel = user.wizard_level;
    const characterLevel = Math.floor((warriorLevel + rogueLevel + archerLevel + wizardLevel) / 4);

    res.status(200).json({
      message: 'XP updated successfully',
      warriorXP, warriorLevel,
      rogueXP, rogueLevel,
      archerXP, archerLevel,
      wizardXP, wizardLevel,
      characterLevel
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;