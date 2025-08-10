import React, { useState } from 'react';
import axios from 'axios';  // Import axios to send HTTP requests

const InteractionQuiz = ({ user }) => {
  const levels = ['easy', 'medium', 'hard'];
  const scenarios = {
    easy: {
      character: 'Riya',
      question: "Hi, my name is Riya. What's your name?",
      options: [
        { id: 'ignore', text: "I don't want to talk.", correct: false },
        { id: 'respond', text: "Hi, I'm Dhruv. It's nice to meet you!", correct: true }
      ]
    },
    medium: {
      character: 'Arun',
      question: "I feel sad because I lost my toy. What should you say?",
      options: [
        { id: 'empathy', text: "I'm sorry you lost your toy. Can I help you find it?", correct: true },
        { id: 'dismiss', text: "It's just a toy, don't be sad.", correct: false },
        { id: 'change', text: "Let's talk about something else.", correct: false }
      ]
    },
    hard: {
      character: 'Group of children',
      question: "We're playing a game. Would you like to join us?",
      options: [
        { id: 'join', text: "Yes, I'd love to! What are the rules?", correct: true },
        { id: 'watch', text: "I'll just watch you all play.", correct: false },
        { id: 'reject', text: "No, I want to play alone.", correct: false },
        { id: 'takeover', text: "Only if I can be the leader and make the rules.", correct: false }
      ]
    }
  };

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const level = levels[currentLevelIndex];
  const scenario = scenarios[level];

  const handleSelect = (optionId) => {
    const option = scenario.options.find(opt => opt.id === optionId);
    const correct = option.correct;

    setSelected(optionId);
    setIsCorrect(correct);
    setAttempts(prev => prev + 1);

    if (correct) {
      const levelScore = attempts === 0 ? 100 : attempts === 1 ? 75 : 50;
      setScore(levelScore);
      setTotalScore(prev => prev + levelScore);

      setTimeout(() => {
        if (currentLevelIndex < levels.length - 1) {
          setCurrentLevelIndex(prev => prev + 1);
          resetLevelState();
        } else {
          setGameCompleted(true);
          
          // Save score directly to MongoDB when game is completed
          saveScoreToBackend(totalScore + levelScore);
        }
      }, 1500);
    }
  };

  const saveScoreToBackend = async (finalScore) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/score', {
        name: user.name,
        score: finalScore,
        game: 'interaction'  // You can use a different game name based on the quiz
      });
      console.log('Score saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving score:', error.response?.data || error.message);
    }
  };

  const resetLevelState = () => {
    setSelected(null);
    setIsCorrect(null);
    setAttempts(0);
    setScore(0);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px', width: '80%', margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Level {currentLevelIndex + 1}: {level.toUpperCase()}</h3>
      {user.name && <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>Player: {user.wardName}</p>}

      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: '#555' }}>{scenario.character}</div>
        <div style={{ backgroundColor: '#f7f7f7', padding: '15px', borderRadius: '8px', marginTop: '10px', fontSize: '16px', color: '#333' }}>{scenario.question}</div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {scenario.options.map(option => (
          <button
            key={option.id}
            style={{
              padding: '10px 20px', 
              margin: '5px', 
              fontSize: '16px', 
              backgroundColor: selected === option.id ? (isCorrect ? '#4CAF50' : '#f44336') : '#008CBA', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              transition: 'background-color 0.3s ease'
            }}
            onClick={() => handleSelect(option.id)}
          >
            {option.text}
          </button>
        ))}
      </div>

      {isCorrect !== null && (
        <div style={{
          textAlign: 'center', 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: isCorrect ? '#4CAF50' : '#f44336', 
          marginTop: '20px'
        }}>
          {isCorrect
            ? `Well done! That’s a good response.${currentLevelIndex < levels.length - 1 ? ' Moving to next level...' : ''}`
            : 'Think again about how your response affects others.'}

          {gameCompleted && (
            <div style={{
              marginTop: '20px', 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#333'
            }}>
              <p>🎉 Great job! You've completed all levels!</p>
              <p>Total Score: {totalScore}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractionQuiz;
