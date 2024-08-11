DROP TABLE IF EXISTS Experience CASCADE;
DROP TABLE IF EXISTS CharacterClasses CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS UserProfiles CASCADE;
DROP TABLE IF EXISTS Workouts CASCADE;

-- ALTER TABLE users ADD COLUMN signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
-- ALTER TABLE Users ADD COLUMN dailychallenges_completed INT DEFAULT 0;


-- Create CharacterClasses table
CREATE TABLE CharacterClasses (
  class_id SERIAL PRIMARY KEY,
  class_name VARCHAR(255) NOT NULL
);

-- Create Users table
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  fullname VARCHAR(255),
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  level INTEGER DEFAULT 1
);

-- Create UserProfiles table
CREATE TABLE UserProfiles (
  profile_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(user_id),
  class_id INTEGER REFERENCES CharacterClasses(class_id),
  warrior_experience INTEGER DEFAULT 0,
  rogue_experience INTEGER DEFAULT 0,
  archer_experience INTEGER DEFAULT 0,
  wizard_experience INTEGER DEFAULT 0,
  warrior_level INTEGER DEFAULT 1,
  rogue_level INTEGER DEFAULT 1,
  archer_level INTEGER DEFAULT 1,
  wizard_level INTEGER DEFAULT 1,
);

CREATE TABLE Experience (
  experience_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(user_id),
  class_id INTEGER REFERENCES CharacterClasses(class_id),
  xp_gained INTEGER,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Workouts table
CREATE TABLE Workouts (
  workout_id SERIAL PRIMARY KEY,
  class_id INTEGER REFERENCES CharacterClasses(class_id),
  workout_type VARCHAR(255),
  difficulty VARCHAR(255),
  duration INTEGER,
  sets_reps TEXT,
  description TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  image_url TEXT
);
