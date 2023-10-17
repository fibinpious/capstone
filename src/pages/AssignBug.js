// AssignBugPage.js
import React, { useState, useEffect } from 'react';
import BugRow from './BugRow';
import Navbar from './Navbar';

const AssignBugPage = () => {
  const [projects, setProjects] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetch(`http://localhost:8080/bugs/projects/${selectedProject}/bugs`)
        .then(response => response.json())
        .then(data => {
          setBugs(data);
        })
        .catch(error => console.error('Error fetching bugs:', error));
    } else {
      setBugs([]);
    }
  }, [selectedProject]);

  useEffect(() => {
    fetch('http://localhost:8080/users/developers')
      .then(response => response.json())
      .then(data => {
        setDevelopers(data);
      })
      .catch(error => console.error('Error fetching developers:', error));
  }, []);

  const handleUserSelection = (bugId, userId) => {
    const updatedBugs = bugs.map(bug => {
      if (bug.id === bugId) {
        const selectedDeveloper = developers.find(dev => dev.id === Number(userId));
        bug.assignedUser = selectedDeveloper;
        // handleAssignBug(bug.id, selectedDeveloper);
      }
      return bug;
    });
    setBugs(updatedBugs);
    setSelectedUser(userId);
  };

  const handleAssignBug = (bugId, developer) => {
    console.log(developer)
 
    fetch(`http://localhost:8080/bugs/${bugId}/assign/${developer}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      
    })
      .then(response => response.json())
      .then(data => {
        console.log('Bug assigned:', data);
      })
      .catch(error => {
        console.error('bug Error:', error);
      });
  };

  useEffect(() => {
    fetch('http://localhost:8080/users/developers')
      .then(response => response.json())
      .then(data => {
        setDevelopers(data);
      })
      .catch(error => {
        console.error('Error fetching developers:', error);
      });
  }, []);

 

  return (
    <div className="container mt-4">
      <div>
        <Navbar />
      </div>
      <h1>Assign Bugs</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label htmlFor="projectSelect">Select Project:</label>
            <select
              id="projectSelect"
              className="form-control"
              value={selectedProject}
              onChange={e => setSelectedProject(e.target.value)}
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {selectedProject && (
        <div className="row">
          <div className="col-md-12">
            <table className="table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Assigned User</th>
                  <th scope="col">Assign Bug</th>
                </tr>
              </thead>
              <tbody>
              {bugs.map(bug => (
                  <BugRow
                    key={bug.id}
                    bug={bug}
                    developers={developers}
                    handleUserSelection={handleUserSelection}
                    handleAssignBug={()=>handleAssignBug(bug.id,selectedUser)}
                  />
                ))}

              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignBugPage;
