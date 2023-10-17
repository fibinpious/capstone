import React, { useState, useEffect } from 'react';
import BugCard from './BugCard';
import ProjectTable from './ProjectTable';
import Navbar from './Navbar';
import './HomePage.css';

const HomePage = () => {
  const [bugData, setBugData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [statusCount, setStatusCount] = useState({});
  const [selectedDeveloper, setSelectedDeveloper] = useState(""); // Added state for selected developer
  const [selectedBug, setSelectedBug] = useState(""); // Added state for selected bug
  const [developers, setDevelopers] = useState([]); // Added state for developers

  useEffect(() => {
    fetch('http://localhost:8080/bugs')
      .then(response => response.json())
      .then(data => {
        setBugData(data);
        setStatusCount(data.reduce((acc, curr) => {
          acc[curr.status] = (acc[curr.status] || 0) + 1;
          return acc;
        }, { open: 0, closed: 0, inProgress: 0, blocked: 0 }));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (projectData.length === 0) {
      fetch('http://localhost:8080/projects')
        .then(response => response.json())
        .then(data => {
          setProjectData(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

 
  const handleUserSelection = (bugId, userId) => {
    setSelectedBug(bugId);
    setSelectedDeveloper(userId);
  };

  const handleAssignBug = () => {
    if (selectedBug && selectedDeveloper) {
      fetch(`http://localhost:8080/bugs/${selectedBug}/assign/${selectedDeveloper}`, {
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
          console.error('Bug assignment error:', error);
        });
    }
  };
  

  return (
    <div >
      <div>
      <Navbar />
      </div>
      <div className='container'>
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6 mb-4">
              <BugCard title="Open Bugs" count={statusCount.open} color="blue" icon="fa-cart-plus" totalBugs={bugData.length} />
            </div>
            <div className="col-md-6 mb-4">
              <BugCard title="Closed Bugs" count={statusCount.closed} color="green" icon="fa-check" totalBugs={bugData.length} />
            </div>
            <div className="col-md-6 mb-4">
              <BugCard title="In Progress" count={statusCount.Inprogress} color="orange" icon="fa-clock-o" totalBugs={bugData.length} />
            </div>
            <div className="col-md-6 mb-4">
              <BugCard title="Blocked" count={statusCount.blocked} color="red" icon="fa-ban" totalBugs={bugData.length} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card project-table">
            <ProjectTable projectData={projectData} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-hover" style={{ width: '100%' }}>
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
            {bugData
                .filter(bug => !bug.assignee) // Filter bugs with null assignee
                .map(bug => (
                  <tr key={bug.id}>
                    <td>{bug.id}</td>
                    <td>{bug.name}</td>
                    <td>{bug.description}</td>
                    <td>{bug.assignee ? bug.assignee.name : 'Unassigned'}</td>
                    <td>
                      <select
                        value={selectedDeveloper}
                        onChange={(e) => handleUserSelection(bug.id, e.target.value)}
                      >
                        <option value="">Assign To</option>
                        {developers.map(dev => (
                          <option key={dev.id} value={dev.id}>{dev.name}</option>
                        ))}
                      </select>
                      <button onClick={handleAssignBug}>Assign</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
