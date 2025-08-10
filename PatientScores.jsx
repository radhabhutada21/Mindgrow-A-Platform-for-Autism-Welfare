// components/PatientScores.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer
} from 'recharts';

function PatientScores() {
  const { wardName } = useParams();
  const [quizScores, setQuizScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/ward/${wardName}`);
        setQuizScores(res.data.quizScores || []);
      } catch (err) {
        console.error('Error fetching quiz scores:', err);
        setQuizScores([]);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, [wardName]);

  // Format for charts
  const chartData = quizScores.map(score => ({
    game: score.game,
    score: score.score,
    date: new Date(score.date).toLocaleDateString()
  }));

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quiz Scores for {wardName}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : quizScores.length === 0 ? (
        <p>No quiz scores found.</p>
      ) : (
        <>
          <ul>
            {quizScores.map((score, i) => (
              <li key={i}>
                🧠 <strong>{score.game}</strong>: {score.score} pts — {new Date(score.date).toLocaleDateString()}
              </li>
            ))}
          </ul>

          <h3>📊 Bar Chart of Quiz Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="game" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>

          <h3>📈 Line Chart of Scores Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default PatientScores;
