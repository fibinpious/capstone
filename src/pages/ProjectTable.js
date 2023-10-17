import React, { useState, useEffect } from 'react';

const ProjectTable = ({ projectData }) => {
  const [unassignedBugCounts, setUnassignedBugCounts] = useState({});

  useEffect(() => {
    // Fetch unassigned bug counts for each project
    projectData.forEach(project => {
      fetch(`http://localhost:8080/bugs/projects/${project.id}/bugs`)
        .then(response => response.json())
        .then(data => {
          const unassignedBugsCount = data.filter(bug => !bug.assignee).length;
          setUnassignedBugCounts(prevCounts => ({
            ...prevCounts,
            [project.id]: unassignedBugsCount,
          }));
        })
        .catch(error => {
          console.error(`Error fetching bugs for project ${project.id}:`, error);
        });
    });
  }, [projectData]);

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Unassigned Bugs Count</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {projectData.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{unassignedBugCounts[project.id]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
