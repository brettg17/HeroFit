const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Import routes
const homeRoute = require('./routes/homeRoute');
const loginRoute = require('./routes/loginRoute');
const signupRoute = require('./routes/signupRoute');
const workoutRoute = require('./routes/workouts'); 

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', homeRoute);
app.use('/api/auth', loginRoute);
app.use('/api/auth', signupRoute);
app.use('/api/workouts', workoutRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});