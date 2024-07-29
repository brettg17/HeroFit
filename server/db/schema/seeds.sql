INSERT INTO users (fullname, username, email, password) VALUES
('John Doe', 'johndoe', 'john@example.com', '1234'),
('Jane Smith', 'janesmith', 'jane@example.com', '1234'),
('Mike Johnson', 'mikejohnson', 'mike@example.com', '1234'),

;

INSERT INTO UserProfiles (user_id, class_id) VALUES
(1, 1),  -- John Doe -> Warrior
(2, 2),  -- Jane Smith -> Rogue
(3, 3),  -- Mike Johnson -> Archer
;

INSERT INTO CharacterClasses (class_name) VALUES 
('Warrior'),
('Rogue'),
('Archer'),
('Wizard');

INSERT INTO Workouts (class_id, workout_type, duration) VALUES
(1, 'Bench Press', 10),
(1, 'Squats', 10),
(1, 'Incline Dumbbell Press', 10),
(1, 'Dumbbell OverHead Press', 10),
(1, 'Triceps Pushdown', 10);

INSERT INTO Workouts (class_id, workout_type, duration) VALUES
(2, 'Standing Calf', 10),
(2, 'Staggered Hamstring Stretch', 10),
(2, 'Figure-Four Stretch', 10),
(2, 'Seated Quad Stretch', 10),
(2, 'Child’s Pose', 10);

INSERT INTO Workouts (class_id, workout_type, duration) VALUES
(3, 'Running', 10),
(3, 'HIIT', 10),
(3, 'Cycling', 10),
(3, 'Jumping Rope', 10),
(3, 'Stair Climbing', 10);

INSERT INTO Workouts (class_id, workout_type, duration) VALUES
(4, 'squats', 10),
(4, 'Burpee', 10),
(4, 'Pushups', 10),
(4, 'Lunge', 10),
(4, 'Glute Bridge', 10);