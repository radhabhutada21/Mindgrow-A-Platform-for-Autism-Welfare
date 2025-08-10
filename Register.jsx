import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [wardName, setWardName] = useState('');
  const [wardAge, setWardAge] = useState('');
  const [wardGender, setWardGender] = useState('');

  const handleRegister = async () => {
    const userData = { name, email, password, role };

    if (role === 'user') {
      userData.wardName = wardName;
      userData.wardAge = wardAge;
      userData.wardGender = wardGender;
    }

    try {
      await axios.post('http://localhost:5000/api/users/register', userData);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', background: '#f4f4f4', borderRadius: '10px' }}>
      <h2>Register</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
      <select onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} value={role}>
        <option value="user">User</option>
        <option value="doctor">Doctor</option>
      </select>

      {role === 'user' && (
        <>
          <input type="text" placeholder="Ward Name" onChange={(e) => setWardName(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
          <input type="number" placeholder="Ward Age" onChange={(e) => setWardAge(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
          <select onChange={(e) => setWardGender(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </>
      )}

      <button onClick={handleRegister} style={{ width: '100%', padding: '10px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Register</button>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
                    Not registered? <Link to="/login" style={{ color: '#4a90e2' }}>Login</Link>
                  </p>
    </div>
  );
}

export default Register;
