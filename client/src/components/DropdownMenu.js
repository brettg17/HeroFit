import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faDumbbell, faTrophy, faSignOutAlt, faBars, faTimes, faCogs } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/DropdownMenu.css';

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWorkoutPlans, setShowWorkoutPlans] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleWorkoutPlansToggle = () => {
    setShowWorkoutPlans(!showWorkoutPlans);
  };

  const handleNavigateToWorkouts = async (charClass) => {
    try {
      const response = await fetch(`http://localhost:5001/api/workouts/${charClass.toLowerCase()}`);
      const data = await response.json();
      console.log('Fetched workouts:', data); // Add this line
  
      navigate('/workouts', {
        state: {
          className: charClass,
          workouts: data
        },
      });
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  return (
    <div className="dropdown">
      <button
        onClick={handleToggle}
        className={`btn btn-secondary dropdown-toggle ${isOpen ? 'open' : ''} dropdown-button`}
        type="button"
        id="dropdownMenuButton"
        aria-expanded={isOpen}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      {isOpen && (
        <div className="dropdown-menu show" aria-labelledby="dropdownMenuButton">
          <a onClick={() => navigate(`/my-profile/${user.user_id}`)} className="profile-link">
            <FontAwesomeIcon icon={faUser} className="fa-icon" /> View My Profile
            <span className="username">{user.username}</span>
          </a>
          <a onClick={() => navigate('/main')} className="dropdown-item">
            <FontAwesomeIcon icon={faHome} className="fa-icon" /> Main Menu
          </a>
          <a onClick={() => navigate('/classes')} className="dropdown-item">
            <FontAwesomeIcon icon={faCogs} className="fa-icon" /> Classes
          </a>
          <div className="dropdown-item">
            <button onClick={handleWorkoutPlansToggle} className="dropdown-submenu-toggle">
              <FontAwesomeIcon icon={faDumbbell} className="fa-icon" /> Workout Plans
            </button>
            {showWorkoutPlans && (
              <div className="dropdown-submenu">
                {['Warrior', 'Wizard', 'Archer', 'Rogue'].map((charClass) => (
                  <a key={charClass} onClick={() =>handleNavigateToWorkouts(charClass)} className="dropdown-submenu-item">
                    {charClass}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a onClick={() => navigate('/daily-challenges')} className="dropdown-item">
            <FontAwesomeIcon icon={faTrophy} className="fa-icon" /> Daily Challenges
          </a>
          <a onClick={handleLogout} className="dropdown-item">
            <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" /> Logout
          </a>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
