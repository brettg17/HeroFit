const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes (Router Imports)
const homeRoute = require('./routes/homeRoute');
const loginRoute = require('./routes/loginRoute');
const signupRoute = require('./routes/signupRoute');
const workoutRoute = require('./routes/workouts');
const xpRoute = require('./routes/xpRoute');
const dailyChallengesRoute = require('./routes/dailyChallengesRoute');
const profileRoute = require('./routes/profileRoute');

// Use API routes
app.use('/api/home', homeRoute);
app.use('/api/auth', loginRoute);
app.use('/api/auth', signupRoute);
app.use('/api/workouts', workoutRoute);
app.use('/api/xp', xpRoute);
app.use('/api/daily-challenges', dailyChallengesRoute);
app.use('/api/my-profile', profileRoute);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all handler to serve the React app for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});