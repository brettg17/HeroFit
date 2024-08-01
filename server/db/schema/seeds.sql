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

INSERT INTO Workouts (class_id, workout_type, difficulty, duration) VALUES
-- Warrior Workouts
(1, 'Bench Press', 'Easy', 7.5),
(1, 'Squats', 'Easy', 7.5),
(1, 'Incline Dumbbell Press', 'Easy', 7.5),
(1, 'Dumbbell OverHead Press', 'Easy', 7.5),
(1, 'Triceps Pushdown', 'Easy', 7.5),
(1, 'Lat Pulldown', 'Easy', 7.5),
(1, 'Leg Press', 'Easy', 7.5),
(1, 'Barbell Curl', 'Easy', 7.5),
(1, 'Seated Row', 'Easy', 7.5),
(1, 'Deadlift', 'Medium', 7.5),
(1, 'Leg Extension', 'Medium', 7.5),
(1, 'Chest Fly', 'Medium', 7.5),
(1, 'Tricep Dip', 'Medium', 7.5),
(1, 'Calf Raise', 'Medium', 7.5),
(1, 'Hammer Curl', 'Medium', 7.5),
(1, 'Shoulder Press', 'Medium', 7.5),
(1, 'Incline Bench Press', 'Medium', 7.5),
(1, 'Pull-Ups', 'Medium', 7.5),
(1, 'Power Clean', 'Hard', 7.5),
(1, 'Snatch', 'Hard', 7.5),
(1, 'Front Squat', 'Hard', 7.5),
(1, 'Overhead Squat', 'Hard', 7.5),
(1, 'Push Press', 'Hard', 7.5),
(1, 'Bent Over Row', 'Hard', 7.5),
(1, 'Weighted Pull-Ups', 'Hard', 7.5),
(1, 'Rack Pull', 'Hard', 7.5),
(1, 'Bulgarian Split Squat', 'Hard', 7.5),

-- Rogue Workouts
(2, 'Standing Calf', 'Easy', 7.5),
(2, 'Staggered Hamstring Stretch', 'Easy', 7.5),
(2, 'Figure-Four Stretch', 'Easy', 7.5),
(2, 'Seated Quad Stretch', 'Easy', 7.5),
(2, 'Child’s Pose', 'Easy', 7.5),
(2, 'Downward Dog', 'Easy', 7.5),
(2, 'Butterfly Stretch', 'Easy', 7.5),
(2, 'Cat-Cow Stretch', 'Easy', 7.5),
(2, 'Tricep Stretch', 'Easy', 7.5),
(2, 'Dynamic Lunges', 'Medium', 7.5),
(2, 'Hip Flexor Stretch', 'Medium', 7.5),
(2, 'IT Band Stretch', 'Medium', 7.5),
(2, 'Pigeon Pose', 'Medium', 7.5),
(2, 'Standing Hamstring Stretch', 'Medium', 7.5),
(2, 'Thoracic Spine Stretch', 'Medium', 7.5),
(2, 'Wall Sit', 'Medium', 7.5),
(2, 'Calf Stretch', 'Medium', 7.5),
(2, 'Side Stretch', 'Medium', 7.5),
(2, 'Russian Twists', 'Hard', 7.5),
(2, 'Plyometric Lunges', 'Hard', 7.5),
(2, 'Banded Walk', 'Hard', 7.5),
(2, 'Inchworms', 'Hard', 7.5),
(2, 'Plank Walkouts', 'Hard', 7.5),
(2, 'Single-Leg Deadlift', 'Hard', 7.5),
(2, 'Windmill Stretch', 'Hard', 7.5),
(2, 'Scorpion Stretch', 'Hard', 7.5),
(2, 'Lateral Lunge', 'Hard', 7.5),

-- Archer Workouts
(3, 'Running', 'Easy', 7.5),
(3, 'HIIT', 'Easy', 7.5),
(3, 'Cycling', 'Easy', 7.5),
(3, 'Jumping Rope', 'Easy', 7.5),
(3, 'Stair Climbing', 'Easy', 7.5),
(3, 'Swimming', 'Easy', 7.5),
(3, 'Rowing', 'Easy', 7.5),
(3, 'Elliptical', 'Easy', 7.5),
(3, 'Power Walking', 'Easy', 7.5),
(3, 'Interval Running', 'Medium', 7.5),
(3, 'Circuit Training', 'Medium', 7.5),
(3, 'Boxing', 'Medium', 7.5),
(3, 'Dancing', 'Medium', 7.5),
(3, 'Zumba', 'Medium', 7.5),
(3, 'Aerobics', 'Medium', 7.5),
(3, 'Speed Skating', 'Medium', 7.5),
(3, 'Kickboxing', 'Medium', 7.5),
(3, 'Mountain Climbers', 'Medium', 7.5),
(3, 'Sprinting', 'Hard', 7.5),
(3, 'Battle Ropes', 'Hard', 7.5),
(3, 'Plyometrics', 'Hard', 7.5),
(3, 'CrossFit', 'Hard', 7.5),
(3, 'Treadmill Sprints', 'Hard', 7.5),
(3, 'Spinning', 'Hard', 7.5),
(3, 'Burpees', 'Hard', 7.5),
(3, 'Squat Jumps', 'Hard', 7.5),
(3, 'Box Jumps', 'Hard', 7.5),

-- Wizard Workouts
(4, 'Squats', 'Easy', 7.5),
(4, 'Burpee', 'Easy', 7.5),
(4, 'Pushups', 'Easy', 7.5),
(4, 'Lunge', 'Easy', 7.5),
(4, 'Glute Bridge', 'Easy', 7.5),
(4, 'Plank', 'Easy', 7.5),
(4, 'Superman', 'Easy', 7.5),
(4, 'Bicycle Crunch', 'Easy', 7.5),
(4, 'Jumping Jacks', 'Easy', 7.5),
(4, 'Dips', 'Medium', 7.5),
(4, 'Wall Sit', 'Medium', 7.5),
(4, 'Leg Raise', 'Medium', 7.5),
(4, 'High Knees', 'Medium', 7.5),
(4, 'Mountain Climbers', 'Medium', 7.5),
(4, 'Tricep Dip', 'Medium', 7.5),
(4, 'Reverse Crunch', 'Medium', 7.5),
(4, 'Step-Ups', 'Medium', 7.5),
(4, 'Bridge', 'Medium', 7.5),
(4, 'Handstand Pushups', 'Hard', 7.5),
(4, 'One-Legged Squat', 'Hard', 7.5),
(4, 'Planche', 'Hard', 7.5),
(4, 'Pistol Squat', 'Hard', 7.5),
(4, 'Dragon Flag', 'Hard', 7.5),
(4, 'Human Flag', 'Hard', 7.5),
(4, 'Iron Cross', 'Hard', 7.5),
(4, 'Muscle-Up', 'Hard', 7.5),
(4, 'V-Sit', 'Hard', 7.5);