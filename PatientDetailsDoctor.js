import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PatientDetailDoctor() {
  const { wardName } = useParams();
  const [patient, setPatient] = useState(null);
  const [quizScores, setQuizScores] = useState([]);

  useEffect(() => {
    

    const fetchQuizScores = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/scores?wardName=${wardName}`);


        if (res.data.quizScores) {
          setQuizScores(res.data.quizScores);
          setPatient(wardName);
        }
        
      } catch (err) {
        console.error('Error fetching quiz scores:', err);
      }
    };

    fetchQuizScores();
  }, [wardName]);

  const chartData = {
    labels: quizScores.map(score => `${score.game} (${new Date(score.date).toLocaleDateString()})`),
    datasets: [
      {
        label: 'Quiz Score',
        data: quizScores.map(score => score.score),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Quiz Scores by Game'
      },
    },
  };

  

  return (
    <div style={{ padding: '20px' }}>
      <h1>Patient Detail</h1>

      <div>
        <h3>🧠 Quiz Scores</h3>
        {quizScores.length === 0 ? (
          <p>No quiz scores available.</p>
        ) : (
          <>
            <ul>
              {quizScores.map((score, index) => (
                <li key={index}>
                  <strong>{score.game}</strong> - {score.score} points on{' '}
                  {new Date(score.date).toLocaleDateString()}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '40px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PatientDetailDoctor;
