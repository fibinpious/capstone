// BugList.js
import React, { useState, useEffect } from 'react';

const BugList = ({ projectId }) => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    // Fetch bugs for the selected project
    fetch(`http://localhost:8080/bugs/projects/${projectId}/bugs`)
      .then(response => response.json())
      .then(data => setBugs(data))
      .catch(error => console.error('Error fetching bugs:', error));
  }, [projectId]);
  

  return (
    <div>
      <h2>Bugs for Project {projectId}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>  
            <th>Assignee Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map(bug => (
            <tr key={bug.id}>
              <td>{bug.id}</td>
              <td>{bug.name}</td>
              <td>{bug.description}</td>
              <td>{bug.assignee ? bug.assignee.name : 'Unassigned'}</td>
              <td>{bug.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BugList;
