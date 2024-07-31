import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Workouts.css';

function Workouts() {
  const [durationVisible, setDurationVisible] = useState(true);
  const [intensityVisible, setIntensityVisible] = useState(true);
  const [musclesVisible, setMusclesVisible] = useState(true);
  const location = useLocation();
  const { state } = location;
  const workouts = state ? state.workouts : [];

  const toggleDuration = () => {
    setDurationVisible(!durationVisible);
  };

  const toggleIntensity = () => {
    setIntensityVisible(!intensityVisible);
  };

  const toggleMuscles = () => {
    setMusclesVisible(!musclesVisible);
  };

  const uniqueWorkouts = Array.from(new Set(workouts.map(workout => workout.workout_type)))
    .map(workout_type => {
      return workouts.find(workout => workout.workout_type === workout_type);
    });

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
                <li><label><input type="checkbox" /> 60 minutes</label></li>
                <li><label><input type="checkbox" /> 45 minutes</label></li>
                <li><label><input type="checkbox" /> 30 minutes</label></li>
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
                <li><label><input type="checkbox" /> HIIT</label></li>
                <li><label><input type="checkbox" /> Hard</label></li>
                <li><label><input type="checkbox" /> Medium</label></li>
                <li><label><input type="checkbox" /> Easy</label></li>
              </ul>
            </div>
          </div>
          <div className="filter">
            <button onClick={toggleMuscles}>
              {musclesVisible ? 'Hide Targeted Muscles' : 'Show Targeted Muscles'}
            </button>
            <div className={`filter-content ${musclesVisible ? '' : 'collapsed'}`}>
              <h3>Targeted Muscle</h3>
              <ul>
                <li><label><input type="checkbox" /> Legs</label></li>
                <li><label><input type="checkbox" /> Chest</label></li>
                <li><label><input type="checkbox" /> Biceps</label></li>
                <li><label><input type="checkbox" /> Traps</label></li>
                <li><label><input type="checkbox" /> Back</label></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="workouts-list">
          <h2>{uniqueWorkouts.length} Workouts Found</h2>
          <div className="workout-cards">
            {uniqueWorkouts.map((workout, index) => (
              <div key={index} className="workout-card">
                <div className="workout-details">
                  <h3>{workout.workout_type}</h3>
                  <p>{workout.duration} minutes</p>
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