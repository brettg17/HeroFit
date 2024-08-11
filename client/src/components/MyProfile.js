import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyProfile.css';
import profileImage from '../assets/samurai_art_by_atey_ghailan_pa.jpeg'; 
// import placeholderChart from '../assets/placeholder_chart.png'; 
import { useParams } from 'react-router-dom';

const MyProfile = () => {
  const { user_id } = useParams(); 
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null); // Define error state

  useEffect(() => {
    if (!user_id) {
      console.error('No user ID found');
      return;
    }

    axios.get(`http://localhost:5001/api/my-profile/${user_id}`)
      .then(response => setProfile(response.data))
      .catch(err => {
        console.error('Error fetching profile:', err);
        setError(err.message); // Update error state
      });
  }, [user_id]);

  if (error) {
    return <div>Error: {error}</div>; // Handle error
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  const progressBar = (xp) => {
    const percentage = Math.min((xp % 100), 100) + '%';
    return (
      <div className="progress-bar-background" title={`XP: ${xp}`}>
        <div className="progress-bar-fill" style={{ width: percentage }}></div>
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>{profile.username}</h2>
        <img src={profileImage} alt="Profile" className="profile-image" />
      </div>
      <div className="profile-details">
        {/* <p><strong>Biography:</strong> {profile.biography}</p> */}
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
        <p className="profile-info">
  <strong>Daily Challenges Completed:</strong> {profile.challengesCompleted}
</p>
<p className="profile-info">
  <strong>Account Created:</strong> {formatDate(profile.signup_date)}
</p>


        
        {/* <div className="progression-chart">
          <h3>Progression Chart</h3>
          <img src={placeholderChart} alt="Progression Chart" className="chart-image" />
        </div>
        <div className="pie-chart-section">
          <h3>Level Distribution</h3>
          <img src={placeholderChart} alt="Level Distribution" className="pie-chart" />
        </div> */}
      </div>
    </div>
  );
};

export default MyProfile;
