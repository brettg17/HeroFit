import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Workouts.css';

function Workouts() {
  const [durationVisible, setDurationVisible] = useState(true);
  const [intensityVisible, setIntensityVisible] = useState(true);
  const location = useLocation();
  const { state } = location;
  const workouts = state ? state.workouts : [];

  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedIntensity, setSelectedIntensity] = useState([]);
  const [descriptionVisible, setDescriptionVisible] = useState({});
  const [user, setUser] = useState({ userId: 1, experience: 0, level: 1 }); // Example user state

  const toggleDuration = () => {
    setDurationVisible(!durationVisible);
  };

  const toggleIntensity = () => {
    setIntensityVisible(!intensityVisible);
  };

  const handleDurationChange = (event) => {
    const value = event.target.value;
    setSelectedDuration(prevState => (prevState === value ? null : value));
  };

  const handleIntensityChange = (event) => {
    const value = event.target.value;
    setSelectedIntensity(prevState =>
      prevState.includes(value)
        ? prevState.filter(i => i !== value)
        : [...prevState, value]
    );
  };

  const filterWorkouts = () => {
    const filteredByIntensity = selectedIntensity.length === 0
      ? workouts
      : workouts.filter(workout => selectedIntensity.includes(workout.difficulty));

    if (!selectedDuration) return filteredByIntensity;

    const numWorkouts = Math.floor(selectedDuration / 7.5);
    return filteredByIntensity.slice(0, numWorkouts);
  };

  const filteredWorkouts = filterWorkouts();

  const toggleDescription = (index) => {
    setDescriptionVisible(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleWorkoutComplete = async (workoutId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/update-xp', {
        userId: user.userId,
        xpGained: 10 // Example XP gained per workout
      });

      const { newExperience, newLevel } = response.data;
      setUser(prevState => ({
        ...prevState,
        experience: newExperience,
        level: newLevel
      }));
      alert(`Workout complete! New XP: ${newExperience}, New Level: ${newLevel}`);
    } catch (err) {
      console.error('Error updating XP:', err);
    }
  };

  return (
    <div className="workouts-container">
      <h1>Workout Plans</h1>
      <div className="workout-page">
        <div className="filter-container">
          <div className="filter">
            <button onClick={toggleDuration}>
              {durationVisible ? 'Hide Duration' : 'Show Duration'}
            </button>
            <div className={`filter-content ${durationVisible ? '' : 'collapsed'}`}>
              <h3>Duration</h3>
              <ul>
                <li><label><input type="checkbox" value="30" onChange={handleDurationChange} checked={selectedDuration === '30'} /> 30 minutes</label></li>
                <li><label><input type="checkbox" value="45" onChange={handleDurationChange} checked={selectedDuration === '45'} /> 45 minutes</label></li>
                <li><label><input type="checkbox" value="60" onChange={handleDurationChange} checked={selectedDuration === '60'} /> 60 minutes</label></li>
              </ul>
            </div>
          </div>
          <div className="filter">
            <button onClick={toggleIntensity}>
              {intensityVisible ? 'Hide Intensity' : 'Show Intensity'}
            </button>
            <div className={`filter-content ${intensityVisible ? '' : 'collapsed'}`}>
              <h3>Intensity</h3>
              <ul>
                <li><label><input type="checkbox" value="Easy" onChange={handleIntensityChange} /> Easy</label></li>
                <li><label><input type="checkbox" value="Medium" onChange={handleIntensityChange} /> Medium</label></li>
                <li><label><input type="checkbox" value="Hard" onChange={handleIntensityChange} /> Hard</label></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="workouts-list">
          <h2>{filteredWorkouts.length} Workouts Found</h2>
          <div className="workout-cards">
            {filteredWorkouts.map((workout, index) => (
              <div key={index} className="workout-card">
                <div className="workout-details">
                  <h3>{workout.workout_type}</h3>
                  <p>{workout.duration} minutes</p>
                  <p>{workout.sets_reps}</p>
                  <button onClick={() => toggleDescription(index)}>
                    {descriptionVisible[index] ? 'Hide Description' : 'Show Description'}
                  </button>
                  {descriptionVisible[index] && <p>{workout.description}</p>}
                  <button onClick={() => handleWorkoutComplete(workout.workout_id)}>
                    Workout Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workouts;