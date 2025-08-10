import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Pie, Bar, Doughnut, Line } from 'react-chartjs-2';
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
} from 'chart.js'

// Register all required Chart.js components
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

function PatientChart() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Styles for the component
    const styles = {
        container: {
            padding: '30px',
            maxWidth: '1200px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif',
        },
        header: {
            color: '#2563eb',
            fontSize: '28px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '30px',
        },
        chartsContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '30px',
            marginBottom: '40px',
        },
        chartBox: {
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            transition: 'transform 0.3s ease',
        },
        chartTitle: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#374151',
            marginBottom: '20px',
            textAlign: 'center',
        },
        chartWrapper: {
            height: '300px',
            position: 'relative',
        },
        loadingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            fontSize: '18px',
            color: '#6b7280',
        },
        errorContainer: {
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '20px',
        }
    };

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/patients')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch patient data');
                }
                return response.json();
            })
            .then(data => {
                setPatients(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching patient data:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Calculate gender counts
    const genderCounts = patients.reduce((acc, patient) => {
        acc[patient.gender] = (acc[patient.gender] || 0) + 1;
        return acc;
    }, {});

    // Gender distribution chart data
    const genderData = {
        labels: Object.keys(genderCounts),
        datasets: [
            {
                data: Object.values(genderCounts),
                backgroundColor: ['#ff6384', '#36a2eb'],
                borderColor: ['#fff', '#fff'],
                borderWidth: 2,
                hoverBackgroundColor: ['#ff4c75', '#2d96e0'],
                hoverBorderColor: ['#fff', '#fff'],
            }
        ],
    };

    // Gender chart options
    const genderOptions = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Gender Distribution',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        maintainAspectRatio: false,
    };

    // Calculate age distribution
    const ageData = {
        labels: patients.map(patient => patient.name),
        datasets: [
            {
                label: 'Age',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: patients.map(patient => patient.age),
                borderRadius: 4,
            },
        ],
    };

    // Age chart options
    const ageOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Patient Age Distribution',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                beginAtZero: true
            }
        }
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
                    '#FF6384', 
                    '#36A2EB', 
                    '#FFCE56', 
                    '#4BC0C0', 
                    '#9966FF',
                    '#FF9F40',
                    '#8AC249',
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
                hoverBackgroundColor: [
                    '#FF4C75', 
                    '#2D96E0', 
                    '#FFBD3D', 
                    '#3EB0B0', 
                    '#8A57FF',
                    '#FF8C24',
                    '#78AD3A',
                ],
            },
        ],
    };

    // Blood group chart options
    const bloodGroupOptions = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Blood Group Distribution',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        cutout: '60%',
        maintainAspectRatio: false,
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
                label: 'Number of Patients',
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
                pointBorderWidth: 2,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                data: Object.values(severityCounts),
            },
        ],
    };

    // Severity chart options
    const severityOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Patient Severity Distribution',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <NavBar />
                <h1 style={styles.header}>Patient Analytics Dashboard</h1>
                <div style={styles.loadingContainer}>
                    Loading patient data...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <NavBar />
                <h1 style={styles.header}>Patient Analytics Dashboard</h1>
                <div style={styles.errorContainer}>
                    <h3>Error loading data</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <NavBar />
            <h1 style={styles.header}>Patient Analytics Dashboard</h1>
            
            <div style={styles.chartsContainer}>
                {/* Gender Distribution Chart */}
                <div style={styles.chartBox}>
                    <h2 style={styles.chartTitle}>Gender Distribution</h2>
                    <div style={styles.chartWrapper}>
                        <Pie 
                            data={genderData} 
                            options={genderOptions} 
                        />
                    </div>
                </div>

                {/* Age Distribution Chart */}
                <div style={styles.chartBox}>
                    <h2 style={styles.chartTitle}>Age Distribution</h2>
                    <div style={styles.chartWrapper}>
                        <Bar 
                            data={ageData} 
                            options={ageOptions} 
                        />
                    </div>
                </div>

                {/* Blood Group Distribution Chart */}
                <div style={styles.chartBox}>
                    <h2 style={styles.chartTitle}>Blood Group Distribution</h2>
                    <div style={styles.chartWrapper}>
                        <Doughnut 
                            data={bloodGroupData} 
                            options={bloodGroupOptions} 
                        />
                    </div>
                </div>

                {/* Severity Levels Chart */}
                <div style={styles.chartBox}>
                    <h2 style={styles.chartTitle}>Severity Levels</h2>
                    <div style={styles.chartWrapper}>
                        <Line 
                            data={severityData} 
                            options={severityOptions} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientChart;