import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';
// import { button } from bootstrap

function Main() {
  const [selectedDropdown, setSelectedDropdown] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  const handleDropdown = () => {
    setSelectedDropdown(!selectedDropdown);
  };

  const handleSelectClass = async (className) => {
    const classIdMap = {
      Warrior: 1,
      Rogue: 2,
      Archer: 3,
      Wizard: 4,
    };

    const classId = classIdMap[className];
    if (!classId) {
      console.error('Invalid class name:', className);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/workouts/${className.toLowerCase()}`);
      const data = await response.json();
      setWorkouts(data);
      navigate('/workouts', { state: { workouts: data, classId } });
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleDailyChallengesClick = () => {
    navigate('/daily-challenges');
  };

  const handleProgressClick = () => {
    navigate('/progress');
  };

  return (
    <div className="main-container">
      <h1>Home</h1>
      <div className="sections-grid">
        <div className="section-card">
          <div className="section-content">
            <h2>Workout Plans</h2>
            <ul>
              <li>Daily Workouts</li>
              <li>Fast Workouts</li>
              <li>HIIT Workouts</li>
            </ul>
            <div className="dropdown">
              <button onClick={handleDropdown}>
                Workout Plans
              </button>
              {selectedDropdown && (
                <div className="dropdown-workouts">
                  {['Warrior', 'Mage', 'Archer', 'Rogue'].map((charClass) => (
                    <button key={charClass} onClick={() => handleSelectClass(charClass)}>
                      {charClass}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="section-card">
          <div className="section-content">
            <h2>Daily Challenges</h2>
            <button onClick={handleDailyChallengesClick} className="card-button">Daily Challenges</button>
          </div>
        </div>
        <div className="section-card">
          <div className="section-content">
            <h2>Progress</h2>
            <ul>
              <li>Level</li>
              <li>Stats</li>
              <li>Achievements</li>
            </ul>
            <button onClick={handleProgressClick} className="card-button">Progress</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;