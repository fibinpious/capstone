import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const AddUser = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');


  
  useEffect(() => {
    const userId = null; // Replace with logic to get the user ID (if updating)
    if (userId) {
      fetch(`http://localhost:8080/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          setId(data.id);
          setName(data.name);
          setEmail(data.email);
          setUsername(data.username);
          setPassword(data.password);
          setRole(data.role);
        })
        .catch(error => console.error('Error:', error));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      username,
      password,
      role
    };

    try {
      let response;

      if (id) {
        response = await fetch(`http://localhost:8080/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      } else {
        response = await fetch('http://localhost:8080/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      }

      if (response.ok) {
        alert('User saved successfully!');
      } else {
        alert('Error saving user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>{id ? 'Edit User' : 'Add User'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              className="form-select"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="Developer">Developer</option>
              <option value="Tester">Tester</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
