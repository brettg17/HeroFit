const express = require('express');
const cors = require('cors');
const pool = require('./db');

// Import routes
const homeRoute = require('./routes/homeRoute');
const loginRoute = require('./routes/loginRoute');
const signupRoute = require('./routes/signupRoute');
const workoutRoute = require('./routes/workouts');
const xpRoute = require('./routes/xpRoute');
const dailyChallengesRoute = require('./routes/dailyChallengesRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/home', homeRoute);
app.use('/api/auth', loginRoute);
app.use('/api/auth', signupRoute);
app.use('/api/workouts', workoutRoute);
app.use('/api/xp', xpRoute);
app.use('/api/daily-challenges', dailyChallengesRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});