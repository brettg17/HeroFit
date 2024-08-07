import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MyProfile.css';
import profileImage from '../assets/samurai_art_by_atey_ghailan_pa.jpeg'; 
import placeholderChart from '../assets/placeholder_chart.png'; 

const MyProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null); 

  // useEffect(() => {
  //   fetch(`/api/my-profile/${username}`)
  //     // .then(response => response.json())
  //     .then(data => setProfile(data))
  //     .catch(error => console.error('Error fetching profile:', error));
  // }, [username]);

  //mock data
  useEffect(() => {
    const mockData = {
      username: 'testuser',
      biography: 'This is a placeholder biography.',
      warriorXP: 150,
      warriorLevel: 3,
      rogueXP: 70,
      rogueLevel: 2,
      archerXP: 120,
      archerLevel: 3,
      wizardXP: 90,
      wizardLevel: 2,
      challengesCompleted: 5,
      accountCreated: '2024-01-01',
    };
    setProfile(mockData);
  }, []);
  

  if (!profile) {
    return <div>Loading...</div>; // Shows a loading message until profile data can be found
  }

  const progressBar = (xp) => {
    const percentage = (xp % 100) + '%';
    return (
      <div className="progress-bar-background" title={`XP: ${xp}`}>
        <div className="progress-bar-fill" style={{ width: percentage }}></div>
      </div>
    );
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>{profile.username}</h2>
        <img src={profileImage} alt="Profile" className="profile-image" />
      </div>
      <div className="profile-details">
        <p><strong>Biography:</strong> {profile.biography}</p>
        <div className="level-section">
          <div className="class-level">
            <h3>Warrior</h3>
            <p>Level: {profile.warriorLevel}</p>
            {progressBar(profile.warriorXP)}
          </div>
          <div className="class-level">
            <h3>Rogue</h3>
            <p>Level: {profile.rogueLevel}</p>
            {progressBar(profile.rogueXP)}
          </div>
          <div className="class-level">
            <h3>Archer</h3>
            <p>Level: {profile.archerLevel}</p>
            {progressBar(profile.archerXP)}
          </div>
          <div className="class-level">
            <h3>Wizard</h3>
            <p>Level: {profile.wizardLevel}</p>
            {progressBar(profile.wizardXP)}
          </div>
        </div>
        <p><strong>Daily Challenges Completed:</strong> {profile.challengesCompleted}</p>
        <p><strong>Account Created:</strong> {new Date(profile.accountCreated).toLocaleDateString()}</p>
        
        <div className="progression-chart">
          <h3>Progression Chart</h3>
          <img src={placeholderChart} alt="Progression Chart" className="chart-image" />
        </div>
        <div className="pie-chart-section">
          <h3>Level Distribution</h3>
          <img src={placeholderChart} alt="Level Distribution" className="pie-chart" />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
