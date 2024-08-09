import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faDumbbell, faTrophy, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/DropdownMenu.css';

/* Install Font Awesome using:
'npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons'
*/

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dropdown">
      <button onClick={handleToggle} className={`dropdown-button ${isOpen ? 'open' : ''}`}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a onClick={() => navigate(`/my-profile/${user.user_id}`)} className="profile-link">
            <FontAwesomeIcon icon={faUser} className="fa-icon" /> View My Profile
            <span className="username">{user.username}</span>
          </a>
          <a onClick={() => navigate('/main')}>
            <FontAwesomeIcon icon={faHome} className="fa-icon" /> Main Menu
          </a>
          <a onClick={() => navigate('/workout-plans')}>
            <FontAwesomeIcon icon={faDumbbell} className="fa-icon" /> Workout Plans
          </a>
          <a onClick={() => navigate('/daily-challenges')}>
            <FontAwesomeIcon icon={faTrophy} className="fa-icon" /> Daily Challenges
          </a>
          <a onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" /> Logout
          </a>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
