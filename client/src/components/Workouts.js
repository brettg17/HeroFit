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
  const [visibleDescriptions, setVisibleDescriptions] = useState({});

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
    setVisibleDescriptions(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleWorkoutComplete = async (classId, userId, xpGained) => {
    try {
      const response = await axios.post('http://localhost:5000/api/xp/update-xp', { 
        userId,
        classId,
        xpGained
      });

      const { xp, level, overallLevel } = response.data;
      alert(`XP updated successfully!
Class XP: ${xp}, Class Level: ${level}, Character Level: ${overallLevel.toFixed(2)}`);
    } catch (error) {
      console.error('Error updating XP:', error);
      alert('Failed to update XP');
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
                  <button onClick={() => toggleDescription(index)}>
                    {visibleDescriptions[index] ? 'Hide Description' : 'Show Description'}
                  </button>
                  <button onClick={() => handleWorkoutComplete(workout.class_id, 1, 10)}>
                    Workout Complete
                  </button>
                  
                  {visibleDescriptions[index] && <p>{workout.description}</p>}
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