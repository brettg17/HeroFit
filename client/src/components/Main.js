import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Main.css';

function Main() {
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Workout Plans',
      description: ['Daily Workouts', 'Fast Workouts', 'HIIT Workouts'],
    },
    {
      title: 'Daily Challenges',
      description: [''],
    },
    {
      title: 'Progress',
      description: ['Level', 'Stats', 'Achievements'],
    },
  ];

  const handleDropdown = (index) => {
    setSelectedDropdown(selectedDropdown === index ? null : index);
  };

  const handleSelectClass = async (className) => {
    try {
      const response = await fetch(`http://localhost:5000/api/workouts/${className.toLowerCase()}`);
      const data = await response.json();
      console.log('Fetched data:', data); 
      navigate('/workouts', { state: { workouts: data } });
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  return (
    <div className="main-container">
      <h1>Home</h1>
      <div className="sections-grid">
        {sections.map((section, index) => (
          <div key={index} className="section-card">
            <div className="section-content">
              <h2>{section.title}</h2>
              <ul>
                {section.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div className="dropdown">
                <button onClick={() => handleDropdown(index)}>
                  {section.title}
                </button>
                {selectedDropdown === index && (
                  <div className="dropdown-menu">
                    {['Warrior', 'Wizard', 'Archer', 'Rogue'].map((charClass) => (
                      <button key={charClass} onClick={() => handleSelectClass(charClass)}>
                        {charClass}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;