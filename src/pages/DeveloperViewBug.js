import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DeveloperViewBug = () => {
  const { developerId } = useParams();
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/bugs/assigned/${developerId}`)
      .then(response => response.json())
      .then(data => {
        setBugs(data);
      })
      .catch(error => console.error('Error fetching bugs:', error));
  }, [developerId]);

  const handleStatusChange = (bugId, newStatus) => {
    fetch(`http://localhost:8080/bugs/${bugId}/update-status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(response => response.json())
      .then(updatedBug => {
        setBugs(prevBugs => prevBugs.map(bug => bug.id === updatedBug.id ? updatedBug : bug));
      })
      .catch(error => console.error('Error updating bug status:', error));
};


  return (
    <div className="container mt-4">
      <h1>View Bugs</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map(bug => (
            <tr key={bug.id}>
              <td>{bug.id}</td>
              <td>{bug.name}</td>
              <td>{bug.description}</td>
              <td>
  <select
    className="form-control"
    value={bug.status || 'Open'}
    onChange={e => handleStatusChange(bug.id, e.target.value)}
    style={{
      backgroundColor: bug.status === 'Inprogress' ? '#F4C430' :
                       bug.status === 'Blocked' ? 'red' :
                       bug.status === 'Complete' ? 'green' :
                       'white'
    }}
  >
    <option value="Open">Open</option>
    <option value="Inprogress" style={{ backgroundColor: '#F4C430' }}>Inprogress</option>
    <option value="Blocked" style={{ backgroundColor: 'red' }}>Blocked</option>
    <option value="Complete" style={{ backgroundColor: 'green' }}>Complete</option>
  </select>
</td>





            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeveloperViewBug;
