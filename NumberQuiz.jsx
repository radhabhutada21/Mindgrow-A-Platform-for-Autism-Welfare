import React, { useState } from 'react';
import axios from 'axios';  // Import axios to send HTTP requests

const NumbersQuiz = ({ user }) => {
  const levels = ['easy', 'medium', 'hard'];
  const problems = {
    easy: { num1: 2, num2: 5, operator: '+', correctAnswer: '7', options: ['10', '7', '4'] },
    medium: { num1: 8, num2: 5, operator: '-', correctAnswer: '3', options: ['13', '3', '5'] },
    hard: { num1: 3, num2: 4, operator: '×', correctAnswer: '12', options: ['7', '12', '15'] }
  };

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const level = levels[currentLevelIndex];
  const problem = problems[level];

  const checkAnswer = (selectedAnswer) => {
    const correct = selectedAnswer === problem.correctAnswer;
    setAnswer(selectedAnswer);
    setIsCorrect(correct);
    setAttempts((prev) => prev + 1);

    if (correct) {
      const currentScore = attempts === 0 ? 100 : attempts === 1 ? 75 : 50;
      setScore(currentScore);
      setTotalScore((prev) => prev + currentScore);

      setTimeout(() => {
        if (currentLevelIndex < levels.length - 1) {
          setCurrentLevelIndex(currentLevelIndex + 1);
          setAnswer('');
          setIsCorrect(null);
          setAttempts(0);
          setScore(0);
        } else {
          setGameCompleted(true);
          saveScoreToBackend(totalScore + currentScore);
        }
      }, 1500);
    }
  };

  const saveScoreToBackend = async (finalScore) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/score', {
        name: user.name,
        score: finalScore,
        game: 'numbers'
      });
      console.log('Score saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving score:', error.response?.data || error.message);
    }
  };

  const renderVisualAids = () => {
    const items = [];
    for (let i = 0; i < problem.num1; i++) items.push(<div key={`first-${i}`} className="number-icon">🐣</div>);
    items.push(<div key="operator" className="operator">{problem.operator}</div>);
    for (let i = 0; i < problem.num2; i++) items.push(<div key={`second-${i}`} className="number-icon">🐣</div>);
    items.push(<div key="equals" className="operator">=</div>);
    items.push(<div key="question" className="question-mark">?</div>);
    return items;
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
      maxWidth: '600px',
      margin: 'auto',
      backgroundColor: '#f4f7fc',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    },
    header: {
      color: '#333',
      marginBottom: '15px',
      fontSize: '1.5em',
      fontWeight: 'bold'
    },
    levelIndicator: {
      fontSize: '1.2em',
      marginBottom: '10px',
      color: '#007BFF',
      fontWeight: '600'
    },
    playerName: {
      fontSize: '1.1em',
      color: '#555',
      marginBottom: '20px'
    },
    problemContainer: {
      margin: '30px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '2em',
      fontWeight: 'bold',
    },
    numbersDisplay: {
      display: 'flex',
      alignItems: 'center',
    },
    operator: {
      margin: '0 10px',
    },
    equals: {
      marginLeft: '10px',
    },
    answerOptions: {
      marginTop: '20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px',
    },
    answerButton: {
      padding: '10px',
      fontSize: '1.2em',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    correctButton: {
      backgroundColor: '#28a745',
      color: 'white',
    },
    incorrectButton: {
      backgroundColor: '#dc3545',
      color: 'white',
    },
    feedback: {
      marginTop: '20px',
      fontSize: '1.2em',
    },
    correctFeedback: {
      color: '#28a745',
    },
    incorrectFeedback: {
      color: '#dc3545',
    },
    gameCompletion: {
      marginTop: '30px',
      fontSize: '1.5em',
      color: '#007BFF',
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.levelIndicator}>Level {currentLevelIndex + 1}: {level.toUpperCase()}</h3>
      {user.name && <p style={styles.playerName}>Player: {user.wardName}</p>}

      <div style={styles.problemContainer}>
        <div style={styles.numbersDisplay}>
          <div>{problem.num1}</div>
          <div style={styles.operator}>{problem.operator}</div>
          <div>{problem.num2}</div>
          <div style={styles.equals}>=</div>
          <div>?</div>
        </div>
        <div>{renderVisualAids()}</div>
      </div>

      <div style={styles.answerOptions}>
        {problem.options.map((option) => (
          <button
            key={option}
            style={{
              ...styles.answerButton,
              ...(answer === option ? (isCorrect ? styles.correctButton : styles.incorrectButton) : {}),
            }}
            onClick={() => checkAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {isCorrect !== null && (
        <div style={styles.feedback}>
          {isCorrect
            ? `Great job${user.wardName ? ', ' + user.wardName : ''}! That's correct!`
            : 'Try again!'}

          {isCorrect && currentLevelIndex < levels.length - 1 && (
            <div className="level-completion">
              <p>Moving to next level...</p>
              <div className="loading-dots"></div>
            </div>
          )}

          {gameCompleted && (
            <div style={styles.gameCompletion}>
              <p>🎉 Congratulations! You've completed all levels!</p>
              <p>Total Score: {totalScore}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NumbersQuiz;
