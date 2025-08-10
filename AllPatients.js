import React, { useState, useEffect } from 'react';
import { Pie, Bar, Doughnut, Line } from 'react-chartjs-2';
import NavBar from '../components/NavBar';
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AllPatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:5000/all-patients');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setPatients(data);
                setLoading(false);
                setError('');
            } catch (error) {
                setError('Error fetching patients');
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    // Main container styles
    const containerStyle = {
        maxWidth: 'fit-content',
        margin: '0 auto',
        padding: '0px',
        fontFamily: 'Arial, sans-serif'
    };

    // Chart container styles
    const chartContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        marginBottom: '40px'
    };

    const chartBoxStyle = {
        flex: '1 1 calc(50% - 20px)',
        minWidth: '300px',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '350px'
    };

    const chartTitleStyle = {
        textAlign: 'center',
        fontSize: '18px',
        marginBottom: '15px',
        color: '#333',
        fontWeight: 'bold'
    };

    // Table styles
    const tableContainerStyle = {
        overflowX: 'auto',
        marginTop: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px'
    };

    const thStyle = {
        backgroundColor: '#f2f2f2',
        color: '#333',
        padding: '12px 15px',
        textAlign: 'left',
        borderBottom: '2px solid #ddd',
        position: 'sticky',
        top: 0
    };

    const tdStyle = {
        padding: '10px 15px',
        borderBottom: '1px solid #ddd',
        textAlign: 'left'
    };

    const trHoverStyle = {
        backgroundColor: '#f5f5f5'
    };

    // Section title styles
    const sectionTitleStyle = {
        textAlign: 'center',
        margin: '30px 0',
        color: '#2c3e50',
        fontSize: '24px',
        fontWeight: 'bold'
    };

    // Loading and error styles
    const messageStyle = {
        textAlign: 'center',
        padding: '20px',
        fontSize: '18px',
        color: '#666',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        margin: '20px 0'
    };

    if (loading) {
        return (
            <div style={containerStyle}>
                //<NavBar />
                <div style={messageStyle}>
                    <p>Loading patient data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={containerStyle}>
                <NavBar />
                <div style={{...messageStyle, color: '#dc3545', backgroundColor: '#f8d7da'}}>
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    // Calculate gender counts
    const genderCounts = patients.reduce((acc, patient) => {
        acc[patient.gender] = (acc[patient.gender] || 0) + 1;
        return acc;
    }, {});

    // Calculate age distribution
    const ageData = {
        labels: patients.map(patient => patient.name),
        datasets: [
            {
                label: 'Age',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.7)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: patients.map(patient => patient.age),
            },
        ],
    };

    // Calculate blood group distribution
    const bloodGroupCounts = patients.reduce((acc, patient) => {
        acc[patient.bloodgroup] = (acc[patient.bloodgroup] || 0) + 1;
        return acc;
    }, {});

    const bloodGroupData = {
        labels: Object.keys(bloodGroupCounts),
        datasets: [
            {
                data: Object.values(bloodGroupCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    // Calculate severity levels
    const severityCounts = patients.reduce((acc, patient) => {
        acc[patient.severity] = (acc[patient.severity] || 0) + 1;
        return acc;
    }, {});

    const severityData = {
        labels: Object.keys(severityCounts),
        datasets: [
            {
                label: 'Severity Levels',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: Object.values(severityCounts),
            },
        ],
    };

    // Chart options
    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    return (
        <div style={containerStyle}>
            <NavBar />
            <h2 style={sectionTitleStyle}>Patient Analytics Dashboard</h2>

            <div style={chartContainerStyle}>
                <div style={chartBoxStyle}>
                    <h3 style={chartTitleStyle}>Age Distribution</h3>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Bar 
                            data={ageData} 
                            options={{
                                ...chartOptions,
                                scales: {
                                    x: {
                                        display: patients.length < 10, // Only show x-axis labels if there are few patients
                                        ticks: {
                                            autoSkip: true,
                                            maxRotation: 45,
                                            minRotation: 45
                                        }
                                    }
                                }
                            }} 
                        />
                    </div>
                </div>
                <div style={chartBoxStyle}>
                    <h3 style={chartTitleStyle}>Gender Distribution</h3>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Pie 
                            data={{ 
                                labels: Object.keys(genderCounts), 
                                datasets: [{ 
                                    data: Object.values(genderCounts), 
                                    backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)'],
                                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                                    borderWidth: 1
                                }] 
                            }} 
                            options={chartOptions} 
                        />
                    </div>
                </div>
                <div style={chartBoxStyle}>
                    <h3 style={chartTitleStyle}>Blood Group Distribution</h3>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Doughnut data={bloodGroupData} options={chartOptions} />
                    </div>
                </div>
                <div style={chartBoxStyle}>
                    <h3 style={chartTitleStyle}>Severity Levels</h3>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Line data={severityData} options={chartOptions} />
                    </div>
                </div>
            </div>

            <h2 style={sectionTitleStyle}>Patient Details</h2>
            {patients.length === 0 ? (
                <div style={messageStyle}>
                    <p>No patients found</p>
                </div>
            ) : (
                <div style={tableContainerStyle}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Patient ID</th>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Age</th>
                                <th style={thStyle}>Gender</th>
                                <th style={thStyle}>Blood Group</th>
                                <th style={thStyle}>DOB</th>
                                <th style={thStyle}>Severity</th>
                                <th style={thStyle}>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient, index) => (
                                <tr 
                                    key={patient.patient_id} 
                                    style={index % 2 === 0 ? {} : trHoverStyle}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '' : '#f5f5f5'}
                                >
                                    <td style={tdStyle}>{patient.patient_id}</td>
                                    <td style={tdStyle}>{patient.name}</td>
                                    <td style={tdStyle}>{patient.age}</td>
                                    <td style={tdStyle}>{patient.gender}</td>
                                    <td style={tdStyle}>{patient.bloodgroup}</td>
                                    <td style={tdStyle}>{new Date(patient.dob).toLocaleDateString()}</td>
                                    <td style={{
                                        ...tdStyle, 
                                        backgroundColor: 
                                            patient.severity === 'High' ? 'rgba(255, 99, 132, 0.2)' : 
                                            patient.severity === 'Medium' ? 'rgba(255, 206, 86, 0.2)' : 
                                            'rgba(75, 192, 192, 0.2)',
                                        fontWeight: patient.severity === 'High' ? 'bold' : 'normal'
                                    }}>
                                        {patient.severity}
                                    </td>
                                    <td style={tdStyle}>{patient.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllPatients;