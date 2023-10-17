import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import'./TesterHomePage.css';

const BugTable = () => {
  const [bugs, setBugs] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState('');

  useEffect(() => {
    // Fetch bug data from your API
    fetch('http://localhost:8080/bugs')
      .then(response => response.json())
      .then(data => setBugs(data))
      .catch(error => console.error('Error fetching bugs:', error));
  }, []);
  const handlePrioritySelect = (e) => {
    const value = e.target.value;
    setSelectedPriority(value);
  };

  const filteredBugs = selectedPriority
    ? bugs.filter(bug => bug.priority === selectedPriority)
    : bugs;
  const handleDeleteBug = async (bugId) => {
    try {
      const response = await fetch(`http://localhost:8080/bugs/${bugId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted bug from the bugs state
        setBugs(prevBugs => prevBugs.filter(bug => bug.id !== bugId));
        toast.success('Bug deleted successfully!');
      } else {
        alert('Error deleting bug');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="row">
      <ToastContainer />
      <div className="col-md-12">
        <h2>All Bugs</h2>
        <div className="filter-container w-25 mb-3">
          <select
            className="form-select form-select-sm"
            value={selectedPriority}
            onChange={handlePrioritySelect}
          >
            <option value="">Filter by Priority</option>
            <option value="Highest">Highest</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="Lowest">Lowest</option>
          </select>
        </div>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Assignee Name</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredBugs.map(bug => (
              <tr key={bug.id}>
                <td>{bug.id}</td>
                <td>{bug.name}</td>
                <td>{bug.description}</td>
                <td>{bug.assignee ? bug.assignee.name : 'Unassigned'}</td>
                <td>{bug.status}</td>
                <td>{bug.priority}</td>
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

const ProjectSelect = ({ onSelect }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    // Fetch project data from your API
    fetch('http://localhost:8080/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedProject(value);
    onSelect(value); // Pass the projectId to the onSelect function
  };

  return (
    <div>
      
      <select
        className="form-control"
        value={selectedProject}
        onChange={handleSelectChange}
      >
        <option value="">Select a Project</option>
        {projects.map(project => (
          <option key={project.id} value={project.id}>{project.name}</option>
        ))}
      </select>
    </div>
  );
};

const CreateBugForm = ({ project, onCreate }) => {
  const [bugData, setBugData] = useState({
    name: '',
    description: '',
    priority: 'Highest',
    project: { id: project }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBugData({
      ...bugData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await fetch('http://localhost:8080/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bugData)
      });

      if (response.ok) {
        alert('Bug created successfully!');
        onCreate(); // Clear the form and reset state
      } else {
        alert('Error creating bug');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <h1>Create Bug</h1>
        <form onSubmit={handleSubmit}>
          <div className="wmb-3">
            <label htmlFor="name" className="form-label">Bug Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={bugData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={bugData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select
              className="form-control"
              id="priority"
              name="priority"
              value={bugData.priority}
              onChange={handleInputChange}
              required
            >
              <option value="Highest">Highest</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Lowest">Lowest</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

const TesterHomePage = ({}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('viewBug');
  const [selectedProject, setSelectedProject] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    // Perform logout action here
    // For example, clear authentication token, etc.
    navigate('/'); // Navigate to the home page
  };

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };

  const handleBugCreation = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      <div className="card text-center mt-4">
        <div className="card-header bg-dark">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'viewBug' ? 'active text-dark' : 'text-light'}`}
                href="#"
                onClick={() => handleTabClick('viewBug')}
              >
                View Bug
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'reportBug' ? 'active text-dark' : 'text-light'}`}
                href="#"
                onClick={() => handleTabClick('reportBug')}
              >
                Report Bug
              </a>
            </li>
            <li className="nav-item logout-tab"> {/* Add one more tab */}
            
  
         <button className="btn btn-danger " onClick={handleLogout}>Logout</button>
                

        </li>
           
          </ul>

          
         
        </div>
        <div className="card-body">
          {activeTab === 'viewBug' && <BugTable />}
          {activeTab === 'reportBug' && (
            <div>
              <h2>Report Bug</h2>
              <ProjectSelect onSelect={handleProjectSelect} />
              {selectedProject && <CreateBugForm project={selectedProject} onCreate={handleBugCreation} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TesterHomePage;
