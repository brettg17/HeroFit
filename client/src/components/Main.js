import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import progression from '../assets/progression.png';
import workoutplan from '../assets/workoutplan.png';
import challenges from '../assets/challenges.png';
import communityImage from '../assets/community.png'; 
import mealPlanningImage from '../assets/meal-planning.png'; 
import leaderboardsImage from '../assets/leaderboards.png';

function Main() {
  const [selectedDropdown, setSelectedDropdown] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

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
    navigate(`/my-profile/${user.user_id}`);
  };
  
  const handleCommunityClick = () => {
    navigate('/community');
  };

  const handleMealPlanningClick = () => {
    navigate('/meal-planning');
  };

  const handleLeaderboardsClick = () => {
    navigate('/leaderboards');
  };

  return (
    <div className="main-container">
      <h2>Welcome to HeroFit, {user?.username || 'Guest'}!</h2>
      <div className="sections-grid">
        <div className="card">
          <img className="card-img-top" src={workoutplan} alt="Workout Plans" />
          <div className="card-body">
            <h4 className="card-title">Workout Plans</h4>
            <p className="card-text">Curated workouts based on Character Class</p>
            <div className="dropdown-main">
              <button onClick={handleDropdown} className="card-button">
                Workout Plans
              </button>
              {selectedDropdown && (
                <div className="dropdown-main-menu show">
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

        <div className="card">
          <img className="card-img-top" src={challenges} alt="Daily Challenges" />
          <div className="card-body">
            <h4 className="card-title">Daily Challenges</h4>
            <p className="card-text">Complete Daily Challenges for extra experience points.</p>
            <button onClick={handleDailyChallengesClick} className="card-button">Daily Challenges</button>
          </div>
        </div>

        <div className="card">
          <img className="card-img-top" src={progression} alt="Progress" />
          <div className="card-body">
            <h4 className="card-title">My Profile</h4>
            <p className="card-text">Track your Character level, stats, and achievements.</p>
            <button onClick={handleProgressClick} className="card-button">My Profile</button>
          </div>
        </div>
      </div>
      
            <div className="sections-grid bottom-row">
        <div className="card">
          <img className="card-img-top" src={communityImage} alt="Community" />
          <div className="coming-soon">Coming Soon</div>
          <div className="card-body">
            <h4 className="card-title">Community</h4>
            <p className="card-text">Join forums, ask questions, and engage with other users.</p>
            <button onClick={handleCommunityClick} className="card-button">Community</button>
          </div>
        </div>

        <div className="card">
          <img className="card-img-top" src={mealPlanningImage} alt="Meal Planning" />
          <div className="coming-soon">Coming Soon</div>
          <div className="card-body">
            <h4 className="card-title">Meal Planning</h4>
            <p className="card-text">Plan your meals to complement your workouts and goals.</p>
            <button onClick={handleMealPlanningClick} className="card-button">Meal Planning</button>
          </div>
        </div>

        <div className="card">
          <img className="card-img-top" src={leaderboardsImage} alt="Leaderboards" />
          <div className="coming-soon">Coming Soon</div>
          <div className="card-body">
            <h4 className="card-title">Leaderboards</h4>
            <p className="card-text">See how you stack up against others in various challenges.</p>
            <button onClick={handleLeaderboardsClick} className="card-button">Leaderboards</button>
          </div>
        </div>
      </div>
      </div>

  );
}

export default Main;
