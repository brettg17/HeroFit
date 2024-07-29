-- Drop tables with cascade to remove dependencies
DROP TABLE IF EXISTS Workouts CASCADE;
DROP TABLE IF EXISTS UserProfiles CASCADE;
DROP TABLE IF EXISTS CharacterClasses CASCADE;
DROP TABLE IF EXISTS Users;

-- Character classes
CREATE TABLE CharacterClasses (
  class_id SERIAL PRIMARY KEY,
  class_name VARCHAR(255) NOT NULL
);

-- User table
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

ALTER TABLE Users
ADD CONSTRAINT unique_email UNIQUE (email);

-- UserProfile Table
CREATE TABLE UserProfiles (
  profile_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(user_id),
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
