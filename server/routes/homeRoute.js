const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", (req, res) => {
  res.send("Hello, Welcome to HeroFit!");
});


module.exports = router;