import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/chooseChar.css';
import warriorShot from '../assets/warriorShot.png';
import wizardShot from '../assets/wizardShot.png';
import archerShot from '../assets/archerShot.png';
import rogueShot from '../assets/rogueShot.png';
import warrior from '../assets/fitApp-pictures/warrior.jpeg';
import wizard from '../assets/fitApp-pictures/wizard.jpeg';
import archer from '../assets/fitApp-pictures/archer.jpeg';
import rogue from '../assets/fitApp-pictures/rogue.jpeg';

function ChooseChar() {
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const characterClasses = [
    { name: 'Warrior', description: 'Workouts are tailored towards those who want to build muscle.', imgSrc: warrior },
    { name: 'Wizard', description: 'Workouts are for those who simply want to get into better shape.', imgSrc: wizard },
    { name: 'Archer', description: 'Workouts are tailored to those who want to slim down.', imgSrc: archer },
    { name: 'Rogue', description: 'Workouts are tailored to those who went to work on flexibility.', imgSrc: rogue },
  ];

  const handleSelect = (charClass) => {
    setSelectedClass(charClass);
  };

  const handleChoose = () => {
    navigate('/main');
  };

  return (
    <div className="choosechar-container">
      <h2>Welcome, {user?.username || 'Guest'}! </h2>
      <h2>Click on a character card to learn more about them. </h2>
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
