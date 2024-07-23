CREATE DATABASE fitapp;
-- User table
CREATE TABLE Users (
  UserID SERIAL PRIMARY KEY,
  Username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  ProfilePicture TEXT,
  Bio TEXT,
  ExperiencePoints INTEGER DEFAULT 0,
  Level INTEGER DEFAULT 1,
  DateJoined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- UserProfile Table
CREATE TABLE UserProfile (
  ProfileID SERIAL PRIMARY KEY,
  UserID INTEGER REFERENCES Users(UserID),
  Class VARCHAR(255),
  Stats JSONB,
  Achievements JSONB,
  PersonalBests JSONB
);

-- Character classes
CREATE TABLE CharacterClasses (
  ClassID SERIAL PRIMARY KEY,
  ClassName VARCHAR(255) NOT NULL,
  Description TEXT
);
-- Workout Table
CREATE TABLE Workout (
  WorkoutID SERIAL PRIMARY KEY,
  UserID INTEGER REFERENCES Users(UserID),
  WorkoutType VARCHAR(255),
  Duration INTEGER,
  Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MealPlan Table
CREATE TABLE MealPlan (
  MealPlanID SERIAL PRIMARY KEY,
  UserID INTEGER REFERENCES Users(UserID),
  MealType VARCHAR(255),
  Description TEXT,
  Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Challenge Table
CREATE TABLE Challenge (
  ChallengeID SERIAL PRIMARY KEY,
  Title VARCHAR(255),
  Description TEXT,
  StartDate TIMESTAMP,
  EndDate TIMESTAMP,
  ExperiencePoints INTEGER
);

-- Achievement Table
CREATE TABLE Achievement (
  AchievementID SERIAL PRIMARY KEY,
  UserID INTEGER REFERENCES Users(UserID),
  Title VARCHAR(255),
  Description TEXT,
  DateEarned TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ProgressTracking Table
CREATE TABLE ProgressTracking (
  ProgressID SERIAL PRIMARY KEY,
  UserID INTEGER REFERENCES Users(UserID),
  Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ExperiencePoints INTEGER,
  Level INTEGER,
);

