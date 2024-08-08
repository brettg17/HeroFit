import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { updateXP } from './xpSystem';
import '../styles/Workouts.css';

function Workouts() {
  const [durationVisible, setDurationVisible] = useState(true);
  const [intensityVisible, setIntensityVisible] = useState(true);

  //Hook to get current lcoation object, contains state passed from pervious page
  const location = useLocation();
  const { state } = location;

  //retrieve workotus passed in the state
  const workouts = state ? state.workouts : [];

  //hook to get currently authenticated user
  const { user } = useAuth();

  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedIntensity, setSelectedIntensity] = useState([]);
  const [descriptionsVisible, setDescriptionsVisible] = useState(
    Array(workouts.length).fill(false)
  );

  //toffle visibilkity of the duration filter
  const toggleDuration = () => {
    setDurationVisible(!durationVisible);
  };

  //toggle visibility of the intensity filter
  const toggleIntensity = () => {
    setIntensityVisible(!intensityVisible);
  };

  //handle changes to the duration filter
  const handleDurationChange = (event) => {
    const value = event.target.value;
    setSelectedDuration(prevState => (prevState === value ? null : value));
  };

  // handle changes to the intensity filter
  const handleIntensityChange = (event) => {
    const value = event.target.value;
    setSelectedIntensity(prevState =>
      prevState.includes(value)
        ? prevState.filter(i => i !== value)
        : [...prevState, value]
    );
  };

  //toggle visibility for description of a specific workout
  const toggleDescription = (index) => {
    setDescriptionsVisible((prevDescriptionsVisible) => {
      const newDescriptionsVisible = [...prevDescriptionsVisible];
      newDescriptionsVisible[index] = !newDescriptionsVisible[index];
      return newDescriptionsVisible;
    });
  };

  //filter workotus based on selected duration and intensity
  const filterWorkouts = () => {
    const filteredByIntensity = selectedIntensity.length === 0
      ? workouts
      : workouts.filter(workout => selectedIntensity.includes(workout.difficulty));

    if (!selectedDuration) return filteredByIntensity;

    const numWorkouts = Math.floor(selectedDuration / 7.5);
    return filteredByIntensity.slice(0, numWorkouts);
  };

  //workout complete and update xp
  const handleWorkoutComplete = async () => {
    const filteredWorkouts = filterWorkouts();

    try {
      const result = await updateXP(user.user_id, state.classId, filteredWorkouts);

      alert(`
        ${result.message}
        Class XP: ${result.classXP}, Class Level: ${result.classLevel}
        Character Level: ${result.characterLevel}
      `);
    } catch (error) {
      console.error('Error updating XP:', error);
      alert('Error updating XP: ' + error.message);
    }
  };

  const filteredWorkouts = filterWorkouts();

  return (
    <div className="workouts-container">
      <h1>Workout Plans</h1>
      <div className="workout-page">
        <div className="filter-container">
          <div className="filter">
            <button onClick={toggleDuration} className="card-button">
              {durationVisible ? 'Hide Duration' : 'Show Duration'}
            </button>
            <div className={`filter-content ${durationVisible ? '' : 'collapsed'}`}>
              <ul>
                <li><label><input type="checkbox" value="30" onChange={handleDurationChange} checked={selectedDuration === '30'} /> 30m </label></li>
                <li><label><input type="checkbox" value="45" onChange={handleDurationChange} checked={selectedDuration === '45'} /> 45m </label></li>
                <li><label><input type="checkbox" value="60" onChange={handleDurationChange} checked={selectedDuration === '60'} /> 60m </label></li>
              </ul>
            </div>
          </div>
          <div className="filter">
            <button onClick={toggleIntensity} className="card-button">
              {intensityVisible ? 'Hide Intensity' : 'Show Intensity'}
            </button>
            <div className={`filter-content ${intensityVisible ? '' : 'collapsed'}`}>
              <ul>
                <li><label><input type="checkbox" value="Easy" onChange={handleIntensityChange} /> Easy</label></li>
                <li><label><input type="checkbox" value="Medium" onChange={handleIntensityChange} /> Medium</label></li>
                <li><label><input type="checkbox" value="Hard" onChange={handleIntensityChange} /> Hard</label></li>
              </ul>
            </div>
          </div>
          <button onClick={handleWorkoutComplete} className="card-button">Workout Complete</button>
        </div>
        <div className="workouts-list">
          <h2>{filteredWorkouts.length} Workouts Found</h2>
          <div className="workout-cards">
            {filteredWorkouts.map((workout, index) => (
              <div key={index} className="workout-card">
                <div className="workout-details">
                  <h3>{workout.workout_type}</h3>
                  <p>{workout.sets_reps}</p>
                  {descriptionsVisible[index] && <p>{workout.description}</p>}
                  <button onClick={() => toggleDescription(index)} className="card-button">
                    {descriptionsVisible[index] ? 'Hide Description' : 'Show Description'}
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