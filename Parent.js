import React, { useState, useEffect, useLocation,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, Home, BarChart2, Heart, Activity, Calendar, Settings, Plus } from 'lucide-react';
import '../styles/parent.css';
import Header from '../components/Header';
import axios from 'axios';
import ProgressCard from '../components/ProgressCard';
const ParentDashboard = ({ user }) => {
  const navigate = useNavigate();
  const goToNumbersGame = () => {
    navigate('/numbers-quiz');
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger hidden file input
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file); // Key must match `upload.single('file')` in backend

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        alert(`Uploaded successfully! File URL: ${result.fileUrl}`);
        console.log(result.fileUrl);
      } else {
        alert(`Upload failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed due to network/server error.');
    }
  };

  const goToInteractionGame = () => {
    navigate('/interaction-quiz');
  };

  const goToObjectGame = () => {
    navigate('/object-quiz');
  };
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({ date: '', time: '' });
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

    };

    fetchData();
  }, []);

  // Handle game selection
  const handleGameSelect = (gameId) => {

    navigate(`/games/${gameId}`);
  };

  const handleButtonClick2 = () => {
    // Change 'kiran' to the dynamic value or variable as needed
    navigate(`/patient/${user.name}`);
  };



  const handleAppointmentChange = (e) => {
    setAppointmentForm({ ...appointmentForm, [e.target.name]: e.target.value });
  };

  const fetchAppointmentData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments?patientName=${user.name}`);
      setAppointments(res.data);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  const handleAppointmentSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/appointments', {
        patientName: user.name,
        date: appointmentForm.date,
        time: appointmentForm.time
      });
      alert('Appointment scheduled!');
      setAppointmentForm({ date: '', time: '' });
      setShowScheduleForm(false);
      fetchAppointmentData();
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('Failed to schedule appointment.');
    }
  };

  return (
    <div className="dashboard-container">
      <Header />

      {/* Main Content */}
      <div className="content-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h2>Welcome, {user.name}</h2>
            <p>Guiding Your Child's Progress, Every Step of the Way</p>
          </div>

        </div>

        {/* Dashboard Cards */}
        <div className="cards-container">
          {/* Child Profile Card */}
          <div className="card profile-card">
            <div className="card-header">
              <h3>Child Profile & Games</h3>
            </div>
            <div className="card-body">
              <div className="profile-details">
                <div className="profile-picture">
                  <svg viewBox="0 0 24 24" className="profile-icon">
                    <circle cx="12" cy="8" r="4" fill="#3B82F6" />
                    <path d="M4 20c0-5.5 3.5-8 8-8s8 2.5 8 8" fill="#93C5FD" />
                    <path d="M10 12l-2-2m8-2l2 2" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9 8a3 3 0 013-3v0a3 3 0 013 3" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="profile-info">
                  <h4>{user.wardName}</h4>
                  <h4>{user.wardAge}</h4>
                  <h4>{user.wardGender}</h4>


                </div>
              </div>

              <div className="games-list">

                <div className="game-item" onClick={goToNumbersGame}>
                  <div className="game-icon blue">
                    <span>123</span>
                  </div>
                  <div className="game-text">Fun with Numbers-Quiz</div>
                </div>
                <div className="game-item" onClick={goToInteractionGame}>
                  <div className="game-icon green">
                    <span>🤝</span>
                  </div>
                  <div className="game-text">Interaction Time-Quiz</div>
                </div>
                <div className="game-item" onClick={goToObjectGame}>
                  <div className="game-icon purple">
                    <span>🍎</span>
                  </div>
                  <div className="game-text">Knowing Things-Quiz</div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <a href={`/profile/${user.id}`}>View Complete Profile</a>
            </div>
          </div>

          <button onClick={handleButtonClick2}>View Performance</button>
          {/* Progress Tracking Card */}
          {/* <div className="card progress-card">
            <div className="card-header green-header">
              <h3>Progress Tracking</h3>
            </div>
            <div className="card-body">
              <div className="progress-item">
                <BarChart2 className="icon green" />
                <div className="progress-text">
                  <h4>Performance Metrics</h4>
                  <p>Track your child's development</p>
                </div>
              </div>
              <div className="progress-bars">
                <div className="progress-bar">
                  <div className="progress-label-group">
                    <div className="progress-label">Number Skills</div>
                    <div className="progress-percent">
                      {user.quizScores && user.quizScores.map((score, index) => (
                        <div key={index}>
                          <strong>{score.game}</strong>: {score.score}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="progress-container">
                    <div className="progress-fill green" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-label-group">
                    <div className="progress-label">Social Interaction</div>
                    <div className="progress-percent">60%</div>
                  </div>
                  <div className="progress-container">
                    <div className="progress-fill green" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-label-group">
                    <div className="progress-label">Object Identification</div>
                    <div className="progress-percent">90%</div>
                  </div>
                  <div className="progress-container">
                    <div className="progress-fill green" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <a href={`/analytics/${user.id}`}>View Detailed Analytics</a>
            </div>
          </div> */}

          {/* Doctor Consultation Card */}
          <div className="card consultation-card">
            <div className="card-header purple-header">
              <h3>Doctor Consultations</h3>
            </div>
            <div className="card-body">


              <button
                className="schedule-btn"
                onClick={() => setShowAppointmentForm(!showAppointmentForm)}
              >
                <Plus size={16} className="schedule-icon" />
                Schedule New Appointment
              </button>

              {showAppointmentForm && (
                <div style={{ marginTop: '10px' }}>
                  <label>Date: </label>
                  <input
                    type="date"
                    name="date"
                    value={appointmentForm.date}
                    onChange={handleAppointmentChange}
                  />
                  <label style={{ marginLeft: '10px' }}>Time: </label>
                  <input
                    type="time"
                    name="time"
                    value={appointmentForm.time}
                    onChange={handleAppointmentChange}
                  />
                  <button
                    onClick={handleAppointmentSubmit}
                    style={{ marginLeft: '10px' }}
                  >
                    Book
                  </button>
                </div>
              )}
              <div style={{ marginTop: '20px', background: '#f5f5f5', padding: '15px', borderRadius: '10px' }}>
                <h4>Upcoming Appointments</h4>
                {appointments.length === 0 ? (
                  <p>No appointments scheduled.</p>
                ) : (
                  appointments.map((appt, i) => (
                    <div key={i} style={{ marginBottom: '10px' }}>
                      <p><strong>Date:</strong> {appt.date}</p>
                      <p><strong>Time:</strong> {appt.time}</p>
                    </div>
                  ))
                )}
              </div>

            </div>
            <div className="card-footer">
              <a href={`/appointments/${user.id}`}>View All Appointments</a>
            </div>
          </div>

          {/* Activity Summary Card */}
          <div className="card activity-card">
            <div className="card-header blue-header">
              <h3>Activity Summary</h3>
            </div>
            <div className="card-body">
              <div className="activity-header">
                <Activity className="icon blue" />
                <div className="activity-info">
                  <h4>Weekly Overview</h4>
                  <p>Last 7 days of engagement</p>
                </div>
              </div>
              <div className="activity-chart">
                <div className="chart-days">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>
                <div className="chart-bars">
                  <div className="chart-bar">
                    <div className="bar-fill" style={{ height: '30%' }}></div>
                    <span className="bar-label">30m</span>
                  </div>
                  <div className="chart-bar">
                    <div className="bar-fill" style={{ height: '45%' }}></div>
                    <span className="bar-label">45m</span>
                  </div>
                  <div className="chart-bar">
                    <div className="bar-fill" style={{ height: '20%' }}></div>
                    <span className="bar-label">20m</span>
                  </div>
                  <div className="chart-bar">
                    <div className="bar-fill" style={{ height: '60%' }}></div>
                    <span className="bar-label">60m</span>
                  </div>
                  <div className="chart-bar">
                    <div className="bar-fill" style={{ height: '50%' }}></div>
                    <span className="bar-label">50m</span>
                  </div>
                  <div className="chart-bar">
                    <div className="bar-fill" style={{ height: '15%' }}></div>
                    <span className="bar-label">15m</span>
                  </div>
                  <div className="chart-bar">
                    <div className="bar-fill" style={{ height: '40%' }}></div>
                    <span className="bar-label">40m</span>
                  </div>
                </div>
              </div>
              <div className="activity-summary">
                <p>Total this week: <span className="highlight">4h 20m</span></p>
                <p>Daily average: <span className="highlight">37 minutes</span></p>
              </div>
            </div>
            <div className="card-footer">
              <a href={`/activity/${user.id}`}>View Activity Details</a>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="card actions-card">
            <div className="card-header yellow-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="actions-grid">
                <button className="action-button" onClick={handleButtonClick}>
                  <span>Document Upload</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx,.txt" // Accept whatever file types you want
                />
                <button className="action-button" onClick={() => navigate(`/reports/${user.id}`)}>
                  <BarChart2 size={20} className="action-icon green" />
                  <span>View Reports</span>
                </button>
              </div>
            </div>
            <div className="card-footer">
              <a href="/actions">More Actions</a>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 MindGrow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ParentDashboard;