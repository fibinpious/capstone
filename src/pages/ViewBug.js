import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/nav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewBug = ({projectId}) => {
  

  const [bugs, setBugs] = useState([]);
  
  

  useEffect(() => {
    // Fetch bugs for the specific project
    fetch(`http://localhost:8080/bugs/projects/${projectId}/bugs`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBugs(data);
      })
      .catch(error => console.error('Error fetching bugs:', error));
  }, [projectId]);

  const handleDeleteBug = async (bugId) => {
    try {
      const response = await fetch(`http://localhost:8080/bugs/${bugId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted bug from the bugs state
        setBugs(prevBugs => prevBugs.filter(bug => bug.id !== bugId));
        alert('Bug deleted successfully!');
      } else {
        alert('Error deleting bug');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container mt-4">
        <h1>View Bugs</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {bugs.map(bug => (
              <tr key={bug.id}>
                <td>{bug.id}</td>
                <td>{bug.name}</td>
                <td>{bug.description}</td>
                <td>{bug.status}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteBug(bug.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBug;
