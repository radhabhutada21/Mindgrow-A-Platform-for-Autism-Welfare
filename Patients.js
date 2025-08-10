import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Patients() {
    const navigate = useNavigate();
    const [patientId, setPatientId] = useState('');
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
        console.log('Loaded patients from localStorage:', savedPatients);
        setPatients(savedPatients);
    }, []);

    useEffect(() => {
        console.log('Saving patients to localStorage:', patients);
        localStorage.setItem('patients', JSON.stringify(patients));
    }, [patients]);

    const handleInputChange = (event) => {
        setPatientId(event.target.value);
    };

    const handleAddPatient = async () => {
        try {
            const response = await fetch(`http://localhost:5000/patients/${patientId}`);
            if (response.ok) {
                const data = await response.json();
                setPatients(prevPatients => {
                    const updatedPatients = [...prevPatients, data];
                    localStorage.setItem('patients', JSON.stringify(updatedPatients));
                    return updatedPatients;
                });
                setError('');
            } else {
                setError('Patient not found');
            }
        } catch (err) {
            setError('Error fetching patient data');
        }
    };

    const handlePatientClick = (patientId) => {
        navigate(`/patients/${patientId}`);
    };

    return (
        <>
        <NavBar />
            <div style={{ padding: '20px' }}>
                <h1>Patient List</h1>
            </div>
            <div style={{ padding: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter Patient ID"
                    value={patientId}
                    onChange={handleInputChange}
                    style={{ marginRight: '10px' }}
                />
                <button onClick={handleAddPatient}>Add Patient</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {patients.length > 0 && (
                    <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Sr. No.</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Patient Name</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Patient ID</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient, index) => (
                                <tr key={patient.patient_id} onClick={() => handlePatientClick(patient.patient_id)} style={{ cursor: 'pointer' }}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{index + 1}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{patient.name}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{patient.patient_id}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{patient.gender}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            
        </>
    );
}

export default Patients;