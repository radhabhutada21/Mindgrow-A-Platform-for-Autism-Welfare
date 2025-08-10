import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

function Doctor() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showDocuments, setShowDocuments] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [showPatients, setShowPatients] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/patients');
        setPatients(res.data.userStats); // Make sure API returns {name, age, gender}
      } catch (err) {
        console.error('Failed to fetch patients:', err);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(res.data);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
      }
    };

    fetchPatients();
    fetchAppointments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/list-documents');
      setDocuments(res.data.documents);
    } catch (err) {
      console.error('Failed to fetch documents:', err);
      alert('Error loading cloud documents.');
    }
  };

  // Preprocessing for Charts
  const ageDistribution = patients.reduce((acc, patient) => {
    const group = Math.floor(patient.age / 10) * 10; // Age buckets like 10, 20, 30
    const label = `${group}-${group + 9}`;
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  const ageChartData = Object.keys(ageDistribution).map(bucket => ({
    ageRange: bucket,
    count: ageDistribution[bucket],
  }));

  const genderDistribution = patients.reduce((acc, patient) => {
    acc[patient.gender] = (acc[patient.gender] || 0) + 1;
    return acc;
  }, {});

  const genderChartData = Object.keys(genderDistribution).map(gender => ({
    name: gender,
    value: genderDistribution[gender],
  }));

  const COLORS = ['#0088FE', '#FF8042', '#00C49F'];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Doctor Dashboard</h1>

      {/* View Patients */}
      <div
        onClick={() => setShowPatients(!showPatients)}
        style={{
          cursor: 'pointer',
          background: '#e0f7fa',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          width: 'fit-content'
        }}
      >
        <h3 style={{ margin: 0 }}>👨‍⚕️ View Patients</h3>
      </div>

      {showPatients && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Patients List</h2>
          {patients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {patients.map((patient, index) => (
                <div key={index} style={{
                  background: '#f0f9ff',
                  padding: '15px 20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  minWidth: '200px',
                  maxWidth: '250px',
                  flex: '1 1 auto'
                }}
                onClick={() => navigate(`/patient-scores/${patient.name}`)} 
                >
                  <h4 style={{ marginBottom: '10px' }}>🧑‍⚕️ {patient.name}</h4>
                  <p><strong>Age:</strong> {patient.age}</p>
                  <p><strong>Gender:</strong> {patient.gender}</p>
                </div>
              ))}
            </div>
          )}

          {/* Age Distribution Chart */}
          <div style={{ marginTop: '40px' }}>
            <h3>📊 Age Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageChartData}>
                <XAxis dataKey="ageRange" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gender Distribution Chart */}
          <div style={{ marginTop: '40px' }}>
            <h3>🚻 Gender Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {genderChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* View Cloud Documents */}
      <div
        onClick={() => {
          setShowDocuments(!showDocuments);
          if (!showDocuments) fetchDocuments();
        }}
        style={{
          cursor: 'pointer',
          background: '#e0f7fa',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          width: 'fit-content'
        }}
      >
        <h3 style={{ margin: 0 }}>☁️ View Cloud Documents</h3>
      </div>

      {showDocuments && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Cloud Documents</h2>
          {documents.length === 0 ? (
            <p>No documents found in S3 bucket.</p>
          ) : (
            <ul>
              {documents.map((doc, i) => (
                <li key={i}>
                  <strong>{doc.key}</strong> — {Math.round(doc.size / 1024)} KB,
                  Last Modified: {new Date(doc.lastModified).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Appointments */}
      <div>
        <h4>Appointments:</h4>
        {appointments.length === 0 ? (
          <p>No appointments scheduled.</p>
        ) : (
          <ul>
            {appointments.map((app, i) => (
              <li key={i}>
                📅 {new Date(app.date).toLocaleDateString()} at {app.time} — {app.patientName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Doctor;
