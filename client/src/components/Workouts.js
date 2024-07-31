import React from 'react';
import { useLocation } from 'react-router-dom';

function Workouts() {
  const location = useLocation();
  const { state } = location;
  const workouts = state ? state.workouts : [];

  console.log('Workouts component received data:', workouts); 

  const uniqueWorkouts = Array.from(new Set(workouts.map(workout => workout.workout_type)))
    .map(workout_type => {
      return workouts.find(workout => workout.workout_type === workout_type);
    });

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Workouts</h1>
      {uniqueWorkouts.length === 0 ? (
        <p>No workouts available.</p>
      ) : (
        <ul>
          {uniqueWorkouts.map((workout, index) => (
            <li key={index}>
              {workout.workout_type} - {workout.duration} minutes
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Workouts;