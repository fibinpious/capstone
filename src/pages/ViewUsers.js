import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from your backend API
    fetch('http://localhost:8080/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDeleteUser = (id) => {
    // Send a DELETE request to delete the user
    fetch(`http://localhost:8080/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Update the users state after deletion
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    
    <div className="container mt-4">
      <div>
        <Navbar />
      </div>
      <h1>View Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th> {/* New column for delete action */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
