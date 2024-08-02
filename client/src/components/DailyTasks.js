import React, { useState, useEffect } from 'react';
import './DailyTasks.css';

const getClassName = (classId) => {
  switch (classId) {
    case 1:
      return 'Warrior';
    case 2:
      return 'Rogue';
    case 3:
      return 'Archer';
    case 4:
      return 'Wizard';
    default:
      return 'Unknown';
  }
};

const DailyTasks = () => {
  const [challenges, setChallenges] = useState([]);
  const [progress, setProgress] = useState({});
  const [completed, setCompleted] = useState({});
  const [collapsed, setCollapsed] = useState({}); 
  const [inProgress, setInProgress] = useState({}); 

  const class_id = 1; 

  useEffect(() => {
    fetch(`http://localhost:5001/api/daily-challenges`)
      .then(response => response.json())
      .then(data => {
        setChallenges(data);
      })
      .catch(error => console.error('Error fetching challenges:', error));
  }, [class_id]);

  const startChallenge = (id) => {
    setInProgress((prev) => ({ ...prev, [id]: true }));
    setProgress((prev) => ({ ...prev, [id]: 0 }));

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev[id] >= 100) {
          clearInterval(interval);
          setCompleted((prevCompleted) => ({ ...prevCompleted, [id]: true }));
          setInProgress((prev) => ({ ...prev, [id]: false }));
          return prev;
        }
        return { ...prev, [id]: prev[id] + 1 };
      });
    }, 50);
  };

  const finishChallenge = (id) => {
    setCompleted((prevCompleted) => ({ ...prevCompleted, [id]: true }));
    setInProgress((prev) => ({ ...prev, [id]: false }));
    setProgress((prev) => ({ ...prev, [id]: 100 })); //progress bar @ 100%
  };

  const toggleCollapse = (id) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="daily-tasks">
      <h2>Daily Challenges</h2>
      {challenges.map((challenge, index) => (
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
                  <p className="challenge-class">Class: {getClassName(challenge.class_id)}</p>
                </div>
                <p className="reward-text" style={{ color: completed[challenge.workout_id] ? 'green' : 'red' }}>
                  {completed[challenge.workout_id] ? 'XP Earned: 100 XP' : 'Reward: 100 XP'}
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
      ))}
    </div>
  );
};

export default DailyTasks;
