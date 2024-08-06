import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faTrophy, faChartLine } from '@fortawesome/free-solid-svg-icons';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login'); 
  };

  return (
    <div className="home-container">
      <h1>Welcome to HeroFit</h1>
      <button onClick={handleClick} className="start-button">Get Started</button>
      <div className="icons-container">
        <FontAwesomeIcon icon={faDumbbell} className="home-icon" data-hover-text="test"/>
        <FontAwesomeIcon icon={faTrophy} className="home-icon" />
        <FontAwesomeIcon icon={faChartLine} className="home-icon" />
      </div>
    </div>
  );
};

export default Home;