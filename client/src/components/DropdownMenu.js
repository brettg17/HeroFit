import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faDumbbell, faTrophy, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/DropdownMenu.css';

<<<<<<< HEAD
/* Install Font Awesome using:
'npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons'
*/

=======
>>>>>>> 943f78793ef866ef8f0756a263b2cf71c9e84ce1
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
<<<<<<< HEAD
        <div className="dropdown-menu">
          <a onClick={() => navigate(`/my-profile/${user.user_id}`)} className="profile-link">
=======
        <div className="dropdown-menu show" aria-labelledby="dropdownMenuButton">
          <a onClick={() => navigate('/profile')} className="dropdown-item profile-link">
>>>>>>> 943f78793ef866ef8f0756a263b2cf71c9e84ce1
            <FontAwesomeIcon icon={faUser} className="fa-icon" /> View My Profile
            <span className="username">{user.username}</span>
          </a>
          <a onClick={() => navigate('/main')} className="dropdown-item">
            <FontAwesomeIcon icon={faHome} className="fa-icon" /> Main Menu
          </a>
          <a onClick={() => navigate('/workout-plans')} className="dropdown-item">
            <FontAwesomeIcon icon={faDumbbell} className="fa-icon" /> Workout Plans
          </a>
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