const express = require('express');
const router = express.Router();

// Home route for the root URL
router.get('/', (req, res) => {
  res.send('Hello, Welcome to HeroFit!');
});

module.exports = router;