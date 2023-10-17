import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Login successful!') {
          const { role, id } = data.userDetails.user;
  
          if (role === 'Tester') {
            alert('Login successful! Redirecting to tester page.');
            navigate('/Tester-home');
          } else if (role === 'Admin') {
            alert('Login successful! Redirecting to home page.');
            navigate('/home');
          } else if (role === 'Developer') {
            alert('Login successful! Redirecting to developer page.');
            navigate(`/Developer-home/${id}/view-bugs`);
          }
        } else {
          alert('Invalid credentials. Please try again.');
        }
      } else {
        alert('Error logging in. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  
  
  

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control  mb-3" 
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '300px' }}
        
      />
      <input
        type="password"
        className="form-control  mb-3" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '300px' }}
      />
      <button
        type="button"
        className="btn btn-success btn-block"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
