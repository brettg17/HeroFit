import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/chooseChar.css';
import warriorShot from '../assets/class-warrior.png';
import wizardShot from '../assets/class-wizard.png';
import archerShot from '../assets/class-archer.png';
import rogueShot from '../assets/class-rogue.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faTrophy, faChartLine } from '@fortawesome/free-solid-svg-icons';


function ChooseChar() {
  //State to managge the selected character class, 
  //Navigate for navigating to other pages
  //Auth for help displaying welcome message with username
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const characterClasses = [
    { name: 'Warrior', description: 'Workouts are tailored towards those who want to build muscle.', imgSrc: warriorShot },
    { name: 'Archer', description: 'Workouts are tailored to those who want to slim down.', imgSrc: archerShot },
    { name: 'Rogue', description: 'Workouts are tailored to those who want to work on flexibility.', imgSrc: rogueShot },
    { name: 'Wizard', description: 'Workouts are for those who simply want to get into better shape.', imgSrc: wizardShot },
  ];

  const handleSelect = (charClass) => {
    setSelectedClass(charClass);
  };

  const handleChoose = () => {
    navigate('/main');
  };

  //boot strap carousel and icons.
  return (
    <div className="choosechar-container">
      <h2>Welcome to HeroFit, {user?.username || 'Guest'}!</h2>

      <div id="characterCarousel" className="carousel slide" data-bs-interval="false">
        <ol className="carousel-indicators">
          {characterClasses.map((_, index) => (
            <li
              key={index}
              data-bs-target="#characterCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
            ></li>
          ))}
        </ol>
        <div className="carousel-inner">
          {characterClasses.map((charClass, index) => (
            <div
              key={charClass.name}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              onClick={() => handleSelect(charClass)}
            >
              <img className="d-block w-100" src={charClass.imgSrc} alt={charClass.name} />
              <div className="carousel-caption d-none d-md-block">
                <h3>{charClass.name}</h3>
                <h5>{charClass.description}</h5>
              </div>
            </div>
          ))}
        </div>
        <a className="carousel-control-prev" href="#characterCarousel" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" href="#characterCarousel" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>

      <button onClick={handleChoose} className="fixed-button">
        Begin Fitness Journey!
      </button>
      <div className="icons-container">
        <div className="icon-item">
          <FontAwesomeIcon icon={faDumbbell} className="home-icon" />
          <span className="icon-text">Workouts</span>
        </div>
        <div className="icon-item">
          <FontAwesomeIcon icon={faTrophy} className="home-icon" />
          <span className="icon-text">Challenges</span>
        </div>
        <div className="icon-item">
          <FontAwesomeIcon icon={faChartLine} className="home-icon" />
          <span className="icon-text">Profile</span>
        </div>
      </div>
    </div>
    
  );
}

export default ChooseChar;