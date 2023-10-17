import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ViewBug from './ViewBug';
import CreateBug from './CreateBug';
import { useParams } from 'react-router-dom';

const SpecificProject = () => {
  const { id } = useParams();
  
  const projectId = Number(id);
  console.log("Specific Project Projectid:", projectId);

  const [project, setProject] = useState(null);
  const [showCreateBug, setShowCreateBug] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/projects/${projectId}`)
      .then(response => response.json())
      .then(data => setProject(data))
      
      .catch(error => console.error('Error:', error));
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const toggleCreateBug = () => {
    setShowCreateBug(!showCreateBug);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>{project.name}</h2>
        <p>{project.description}</p>

        

        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                
                 
                  <ViewBug projectId={projectId} />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificProject;
