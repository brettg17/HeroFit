import axios from 'axios';

//XP system for dealing with character class and user xp

export const updateXP = async (userId, classId, workouts) => {
  // Calculate xp gained based on workout difficulty
  const xpGained = workouts.reduce((total, workout) => {
    switch (workout.difficulty) {
      case 'Easy':
        return total + 10;
      case 'Medium':
        return total + 15;
      case 'Hard':
        return total + 20;
      default:
        return total;
    }
  }, 0);

  try {
    //Send the XP request to backend, (userId identifies the user)
    const response = await axios.post('http://localhost:5001/api/xp/update-xp', {
      userId,
      classId,
      xpGained,
    });

    //object destructuring response data
    const { 
      message, 
      warriorXP, warriorLevel, 
      rogueXP, rogueLevel, 
      archerXP, archerLevel, 
      wizardXP, wizardLevel, 
      characterLevel 
    } = response.data;

    //map class IDs to their corresponding XP and levels
    const classLevels = {
      1: { xp: warriorXP, level: warriorLevel },
      2: { xp: rogueXP, level: rogueLevel },
      3: { xp: archerXP, level: archerLevel },
      4: { xp: wizardXP, level: wizardLevel }
    };

    //current class level info
    const currentClassLevel = classLevels[classId];

    // return updated xp and level info
    return {
      message,
      classXP: currentClassLevel.xp,
      classLevel: currentClassLevel.level,
      characterLevel,
    };
  } catch (error) {
    console.error('Error updating XP:', error);
    throw new Error(error.response?.data?.error || error.message);
  }
};