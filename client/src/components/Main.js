import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import globalBusinessImage from '../assets/vecteezy_global-business-background-illustration_24398828.jpg';
import dumbells from '../assets/vecteezy_man-holding-a-dumbbell-in-a-gym-with-row-of-dumbbells-in-the_2031342.jpg';
import jogging from '../assets/vecteezy_athlete-running-sport-feet-on-trail-healthy-lifestyle-fitness_7707946.jpg'
function Main() {
  // State manages dropdown
  const [selectedDropdown, setSelectedDropdown] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  //toggle dropdown
  const handleDropdown = () => {
    setSelectedDropdown(!selectedDropdown);
  };

  //fetch workouts based on class
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

  //Bootstrap card system for workouts, dailychallenges, and progress
  return (
    <div className="main-container">
      <h2>Welcome to HeroFit, {user?.username || 'Guest'}!</h2>
      <div className="sections-grid">
        <div className="card" style={{ width: '18rem' }}>
          <img className="card-img-top" src={dumbells} alt="Card image cap" />
          <div className="card-body">
            <h4 className="card-title">Workout Plans</h4>
            <p className="card-text">Currated workouts based on Character Class</p>
            <div className="dropdown">
              <button onClick={handleDropdown}  className="card-button">
                Workout Plans
              </button>
              {selectedDropdown && (
                <div className="dropdown-menu show">
                  {['Warrior', 'Wizard', 'Archer', 'Rogue'].map((charClass) => (
                    <button key={charClass} className="dropdown-item" onClick={() => handleSelectClass(charClass)}>
                      {charClass}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card" style={{ width: '18rem' }}>
          <img className="card-img-top" src={jogging} alt="Card image cap" />
          <div className="card-body">
            <h4 className="card-title">Daily Challenges</h4>
            <p className="card-text">Complete Daily Challenges for extra experience points.</p>
            <button onClick={handleDailyChallengesClick}  className="card-button">Daily Challenges</button>
          </div>
        </div>

        <div className="card" style={{ width: '18rem' }}>
          <img className="card-img-top" src={globalBusinessImage} alt="Card image cap" />
          <div className="card-body">
            <h4 className="card-title">Progress</h4>
            <p className="card-text">Track your Character level, stats, and achievements.</p>
            <button onClick={handleProgressClick}  className="card-button">Progress</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;