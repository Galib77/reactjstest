import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './questions';

const App = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('scores'));
    if (savedScores) {
      const sum = savedScores.reduce((acc, score) => acc + score, 0);
      const avg = sum / savedScores.length;
      setAverageScore(avg.toFixed(2));
    }
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateScore = () => {
    const totalQuestions = Object.keys(QUESTIONS).length;
    const yesCount = Object.values(answers).filter(answer => answer === 'Yes').length;
    const calculatedScore = (yesCount / totalQuestions) * 100;
    setScore(calculatedScore.toFixed(2));

    const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
    savedScores.push(calculatedScore);
    localStorage.setItem('scores', JSON.stringify(savedScores));

    const sum = savedScores.reduce((acc, score) => acc + score, 0);
    const avg = sum / savedScores.length;
    setAverageScore(avg.toFixed(2));
  };

  const reset = () => {
    setAnswers({});
    setScore(0);
  };

  return (
    <div style={{ marginLeft: '20px'}}>
      <h2>TODO</h2>
      <div>
        Score: {score}
        <br />
        Average SCORE: {averageScore}
      </div>
      <hr />
      {Object.entries(QUESTIONS).map(([id, question]) => (
        <div key={id}>
          <p>
            {id}: {question}
          </p>
          <div>
            <button onClick={() => handleAnswer(id, 'Yes')}>Yes</button>
            <button onClick={() => handleAnswer(id, 'No')}>No</button>
          </div>
        </div>
      ))}
      <br />
      <button onClick={calculateScore}>Calculate Score</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default App;
