import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/chooseChar.css';
import warriorShot from '../assets/warriorShot.png';
import wizardShot from '../assets/wizardShot.png';
import archerShot from '../assets/archerShot.png';
import rogueShot from '../assets/rogueShot.png';

function ChooseChar() {
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();

  const characterClasses = [
    { name: 'Warrior', description: 'Workouts are tailored towards those who want to build muscle.', imgSrc: warriorShot },
    { name: 'Wizard', description: 'Workouts are for those who simply want to get into better shape.', imgSrc: wizardShot },
    { name: 'Archer', description: 'Workouts are tailored to those who want to slim down.', imgSrc: archerShot },
    { name: 'Rogue', description: 'Workouts are tailored to those who went to work on flexibility.', imgSrc: rogueShot },
  ];

  const handleSelect = (charClass) => {
    setSelectedClass(charClass);
  };

  const handleChoose = () => {
    navigate('/main');
  };

  return (
    <div className="choosechar-container">
      <h2>Welcome, *Username* click on the character cards to learn more about them. Then you are all set!</h2>
      <div className="choosechar-grid">
        {characterClasses.map((charClass) => (
          <div key={charClass.name} className="char-card" onClick={() => handleSelect(charClass)}>
            <img src={charClass.imgSrc} alt={charClass.name} />
            <p>{charClass.name}</p>
          </div>
        ))}
      </div>

      {selectedClass && (
        <div className="char-description">
          <h3>{selectedClass.name}</h3>
          <p>{selectedClass.description}</p>
          <button onClick={handleChoose}>
            Begin Fitness Journey!
          </button>
        </div>
      )}
    </div>
  );
}

export default ChooseChar;