import React from 'react';
import { useParams } from 'react-router-dom';

function Workout() {
  const { className } = useParams();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>{className.charAt(0).toUpperCase() + className.slice(1)} Workouts</h1>
      <p>Here are the workouts tailored for the {className} class.</p>
    </div>
  );
}

export default Workout;