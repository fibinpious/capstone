import React, { useState } from 'react';
import Navbar from '../components/nav';
import { useParams } from 'react-router-dom';

const CreateBug = ({ project }) => {
  const [bugData, setBugData] = useState({
    name: '',
    description: '',
    priority: 'Highest',
    project: { }// Add projectId to the bug data
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
      console.log("bugdata -->",bugData)
      console.log("project---->",project)
      bugData.project.id=project.id;
      const response = await fetch('http://localhost:8080/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bugData)
      });

      if (response.ok) {
        alert('Bug created successfully!');
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
          <div className="mb-3">
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

export default CreateBug;
