const express = require('express');
const cors = require('cors');
const pool = require('./db');

// import routes
const homeRoute = require("./routes/homeRoute");
const loginRoute = require("./routes/loginRoute");
const signupRoute = require("./routes/signupRoute");
const dailyChallengesRoute = require("./routes/dailyChallengesRoute");
const workoutRoute = require('./routes/workouts'); 
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api/home", homeRoute);
app.use("/api/auth", loginRoute);
app.use("/api/auth", signupRoute);
app.use("/api", dailyChallengesRoute);
app.use('/api/workouts', workoutRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});