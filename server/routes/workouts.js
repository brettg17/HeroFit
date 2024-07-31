const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get workouts by class
router.get('/:className', async (req, res) => {
  const className = req.params.className;
  console.log(`Received request for class: ${className}`); 

  try {
    const classResult = await pool.query('SELECT class_id FROM CharacterClasses WHERE LOWER(class_name) = LOWER($1)', [className]);
    console.log('Class result:', classResult.rows); 

    if (classResult.rows.length === 0) {
      return res.status(404).json({ error: 'Class not found' });
    }

    const classId = classResult.rows[0].class_id;

    const workoutsResult = await pool.query('SELECT * FROM Workouts WHERE class_id = $1', [classId]);
    console.log('Workouts result:', workoutsResult.rows); 

    res.json(workoutsResult.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;