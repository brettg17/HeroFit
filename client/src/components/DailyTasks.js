import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  
import { updateXP } from './xpSystem';    
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/DailyTasks.css';
import warrior from '../assets/class-warrior.png';
import wizard from '../assets/class-wizard.png';
import archer from '../assets/class-archer.png';
import rogue from '../assets/class-rogue.png';

const getClassName = (classId) => {
  switch (classId) {
    case 1:
      return { name: 'Warrior', imgSrc: warrior };
    case 2:
      return { name: 'Rogue', imgSrc: rogue };
    case 3:
      return { name: 'Archer', imgSrc: archer };
    case 4:
      return { name: 'Wizard', imgSrc: wizard };
    default:
      return { name: 'Unknown', imgSrc: '' };
  }
};

const calculateXP = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 10;
    case 'Medium':
      return 15;
    case 'Hard':
      return 20;
    default:
      return 0;
  }
};

const DailyTasks = () => {
  const [challenges, setChallenges] = useState([]);
  const [progress, setProgress] = useState({});
  const [completed, setCompleted] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const [inProgress, setInProgress] = useState({});
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const [completedCount, setCompletedCount] = useState(0); 



  useEffect(() => {
    fetch('http://localhost:5001/api/daily-challenges')
      .then(response => response.json())
      .then(data => {
        setChallenges(data);
      })
      .catch(error => console.error('Error fetching challenges:', error));

    fetchCompletedChallengesCount(); 
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchCompletedChallengesCount = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/completed-challenges-count/${user.user_id}`);
      const data = await response.json();
      setCompletedCount(data.count);
    } catch (error) {
      console.error('Error fetching completed challenges count:', error);
    }
  };

  function calculateTimeLeft() {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const difference = midnight - now;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return { hours, minutes, seconds };
  }

  const startChallenge = (id) => {
    setInProgress((prev) => ({ ...prev, [id]: true }));
    setProgress((prev) => ({ ...prev, [id]: 0 }));

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev[id] >= 100) {
          clearInterval(interval);
          handleChallengeCompletion(id); 
          setInProgress((prev) => ({ ...prev, [id]: false }));
          return prev;
        }
        return { ...prev, [id]: prev[id] + 1 };
      });
    }, 50);
  };

  const handleChallengeCompletion = async (id) => {
    try {
      const challenge = challenges.find(challenge => challenge.workout_id === id);
      if (challenge) {
        const xpGained = calculateXP(challenge.difficulty);
        const result = await updateXP(user.user_id, challenge.class_id, [challenge]); 
        setCompleted((prevCompleted) => ({ ...prevCompleted, [id]: true }));
        setProgress((prev) => ({ ...prev, [id]: 100 }));

        // Display success alert
        setAlertMessage(`
          Challenge Completed!
          ${result.message}
          Class XP: ${result.classXP}, Class Level: ${result.classLevel}
          Character Level: ${result.characterLevel}
        `);
        setAlertVisible(true);

        // Hide the alert after 5 seconds and navigate to /main
        setTimeout(() => {
          setAlertVisible(false);
          navigate('/main');
        }, 5000);

      }
    } catch (error) {
      console.error('Error updating XP:', error);
      alert('Error updating XP: ' + error.message);
    }
  };

  const finishChallenge = (id) => {
    handleChallengeCompletion(id); 
  };

  const toggleCollapse = (id) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="daily-tasks">
      {alertVisible && (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Well done!</h4>
          <p>{alertMessage}</p>
          <hr />
          <p className="mb-0">Keep up the good work!</p>
        </div>
      )}

      <h2>Daily Challenges</h2>
      {challenges.map((challenge, index) => {
        const classInfo = getClassName(challenge.class_id);
        return (
          <div key={challenge.workout_id} className={`challenge ${collapsed[challenge.workout_id] ? 'collapsed' : ''}`}>
            <button className="toggle-button" onClick={() => toggleCollapse(challenge.workout_id)}>
              {collapsed[challenge.workout_id] ? '+' : '-'}
            </button>
            {!collapsed[challenge.workout_id] ? (
              <>
                <div className="challenge-title">{challenge.workout_type}</div>
                <div className="challenge-info">
                  <div>
                    <p>Difficulty: {challenge.difficulty}</p>
                    <p>Duration: {challenge.duration} mins</p>
                    <p className="challenge-description">Description: {challenge.description || 'No description available'}</p>
                    <p className="challenge-class">
                      Class: {classInfo.name}
                      {classInfo.imgSrc && <img src={classInfo.imgSrc} alt={classInfo.name} className="class-icon" />}
                    </p>
                  </div>
                  <p className="reward-text" style={{ color: completed[challenge.workout_id] ? 'green' : 'red' }}>
                    {completed[challenge.workout_id] 
                      ? `XP Earned: ${calculateXP(challenge.difficulty)} XP` 
                      : `Reward: ${calculateXP(challenge.difficulty)} XP`}
                  </p>
                </div>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress[challenge.workout_id] || 0}%` }}></div>
                </div>
                {completed[challenge.workout_id] ? (
                  <button disabled>Challenge Completed</button>
                ) : inProgress[challenge.workout_id] ? (
                  <button className="in-progress-button" disabled>
                    Workout in Progress
                  </button>
                ) : progress[challenge.workout_id] >= 100 ? (
                  <button className="finish-workout-button" onClick={() => finishChallenge(challenge.workout_id)}>
                    Finish Workout
                  </button>
                ) : (
                  <button
                    onClick={() => startChallenge(challenge.workout_id)}
                    disabled={progress[challenge.workout_id] > 0}
                  >
                    Begin Workout
                  </button>
                )}
              </>
            ) : (
              <div className="collapsed-content">
                Challenge {index + 1} - <span className={`status ${completed[challenge.workout_id] ? 'completed' : 'not-completed'}`}>
                  {completed[challenge.workout_id] ? 'Completed' : 'Not Completed'}
                </span>
              </div>
            )}
          </div>
        );
      })}
      <div className="countdown">
        <h3>Daily challenges reset in:</h3>
        <div className="countdown-timer">
          <span>{String(timeLeft.hours).padStart(2, '0')}:</span>
          <span>{String(timeLeft.minutes).padStart(2, '0')}:</span>
          <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
};

export default DailyTasks;