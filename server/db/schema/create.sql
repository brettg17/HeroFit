CREATE DATABASE fitapp:

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS UserProfiles;
DROP TABLE IF EXISTS CharacterClasses;
DROP TABLE IF EXISTS Workouts;

-- User table
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Character classes
CREATE TABLE CharacterClasses (
  class_id SERIAL PRIMARY KEY,
  class_name VARCHAR(255) NOT NULL
);

-- UserProfile Table
CREATE TABLE UserProfiles (
  profile_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  class_id INTEGER REFERENCES CharacterClasses(class_id)
);


-- Workout Table
CREATE TABLE Workouts (
  workout_id SERIAL PRIMARY KEY,
  class_id INTEGER REFERENCES CharacterClasses(class_id),
  workout_type VARCHAR(255),
  duration INTEGER,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

