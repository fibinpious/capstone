import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const handleProjectSelect = () => {
    fetch(`http://localhost:8080/projects`)
      .then(response => response.json())
      .then(data => {
        
        setProjects(data);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleAddProject = () => {
    if (!newProjectName || !newProjectDescription) {
      alert('Both project name and description are required.');
      return;
    }
  
    fetch('http://localhost:8080/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newProjectName,
        description: newProjectDescription,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setNewProjectName('');
        setNewProjectDescription('');
        handleProjectSelect();
      })
      .catch(error => console.error('Error:', error));
  };
  

  const handleDeleteProject = (id) => {
    fetch(`http://localhost:8080/projects/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        
        handleProjectSelect();
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    handleProjectSelect();
  }, []);

  return (
    <div className="container mt-4">
      <Navbar />

      <div className="row mt-4">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              <table className="table table-striped mb-4" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                    <th>View Project</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    
                   
                    <tr key={project.id}>
                      
                      <td>{project.name}</td>
                      <td>{project.description}</td>
                      <td>
                      
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                      <td>
                      <Link to={`/project/${project.id}`} className="btn btn-info btn-sm">
                        View Project
                       </Link>
                      </td>
                      
                    </tr>
                    
                  ))}
                  
                </tbody>
              </table>
              
              <div className="mt-4">
                <h5>Add New Project</h5>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Project Name"
                    value={newProjectName}
                    onChange={e => setNewProjectName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Project Description"
                    value={newProjectDescription}
                    onChange={e => setNewProjectDescription(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleAddProject}
                    >
                      Add Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
