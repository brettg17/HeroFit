-- Drop existing data to avoid duplicates
DROP TABLE IF EXISTS CharacterClasses CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS UserProfiles CASCADE;
DROP TABLE IF EXISTS Workouts CASCADE;

-- Create CharacterClasses table
CREATE TABLE CharacterClasses (
  class_id SERIAL PRIMARY KEY,
  class_name VARCHAR(255) NOT NULL
);

-- Create Users table
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Create UserProfiles table
CREATE TABLE UserProfiles (
  profile_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(user_id),
  class_id INTEGER REFERENCES CharacterClasses(class_id)
);

-- Create Workouts table
CREATE TABLE Workouts (
  workout_id SERIAL PRIMARY KEY,
  class_id INTEGER REFERENCES CharacterClasses(class_id),
  workout_type VARCHAR(255),
  difficulty VARCHAR(255),
  duration INTEGER,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);