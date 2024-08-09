import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/chooseChar.css';
<<<<<<< HEAD
import warrior from '../assets/fitApp-pictures/warrior.jpeg';
import wizard from '../assets/fitApp-pictures/wizard.jpeg';
import archer from '../assets/fitApp-pictures/archer.jpeg';
import rogue from '../assets/fitApp-pictures/rogue.jpeg';
=======
import warriorShot from '../assets/vecteezy_silhouette-of-a-woman-with-a-sword_23059981.jpg';
import wizardShot from '../assets/vecteezy_ai-generated-young-adult-beauty-portrait-of-a-sensuous_39589683.jpg';
import archerShot from '../assets/vecteezy_silhouette-of-an-archer-aiming-at-sunset-in-a-field-of-grass_47023183.jpeg';
import rogueShot from '../assets/vecteezy_hooded-thief-lurking-in-the-dark-night_32941682.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faTrophy, faChartLine } from '@fortawesome/free-solid-svg-icons';

>>>>>>> 943f78793ef866ef8f0756a263b2cf71c9e84ce1

function ChooseChar() {
  //State to managge teh selected character class, 
  //Navigate for navigating to other pages
  //Auth for help displaying welcome message with username
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const characterClasses = [
<<<<<<< HEAD
    { name: 'Warrior', description: 'Workouts are tailored towards those who want to build muscle.', imgSrc: warrior },
    { name: 'Wizard', description: 'Workouts are for those who simply want to get into better shape.', imgSrc: wizard },
    { name: 'Archer', description: 'Workouts are tailored to those who want to slim down.', imgSrc: archer },
    { name: 'Rogue', description: 'Workouts are tailored to those who went to work on flexibility.', imgSrc: rogue },
=======
    { name: 'Warrior', description: 'Workouts are tailored towards those who want to build muscle.', imgSrc: warriorShot },
    { name: 'Archer', description: 'Workouts are tailored to those who want to slim down.', imgSrc: archerShot },
    { name: 'Rogue', description: 'Workouts are tailored to those who want to work on flexibility.', imgSrc: rogueShot },
    { name: 'Wizard', description: 'Workouts are for those who simply want to get into better shape.', imgSrc: wizardShot },
>>>>>>> 943f78793ef866ef8f0756a263b2cf71c9e84ce1
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
          <span className="icon-text">Progression</span>
        </div>
      </div>
    </div>
    
  );
}

export default ChooseChar;