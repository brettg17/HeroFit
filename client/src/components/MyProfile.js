import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MyProfile.css';
import profileImage from '../assets/samurai_art_by_atey_ghailan_pa.jpeg'; 

const MyProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`/api/my-profile/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProfile(data))
      .catch(error => console.error('Error fetching profile:', error));
  }, [username]);
  

  if (!profile) {
    return <div>Loading...</div>;
  }

  const progressBar = (xp) => {
    const percentage = (xp % 100) + '%';
    return (
      <div className="progress-bar-background">
        <div className="progress-bar-fill" style={{ width: percentage }}></div>
      </div>
    );
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <h2>{profile.username}</h2>
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
      </div>
    </div>
  );
};

export default MyProfile;
