import React, { useState } from 'react';

const BugRow = ({ bug, developers, handleUserSelection, handleAssignBug }) => {
  const [reassigning, setReassigning] = useState(false);

  const handleReassignClick = () => {
    setReassigning(true);
  }

  return (
    <tr key={bug.id}>
      <td>{bug.id}</td>
      <td>{bug.name}</td>
      <td>{bug.description}</td>
      <td>
        {reassigning ? (
          <select
            className="form-control"
            onChange={e => handleUserSelection(bug.id, e.target.value)}
          >
            <option value="">Select a user</option>
            {developers.map(developer => (
              <option key={developer.id} value={developer.id}>
                {developer.name}
              </option>
            ))}
          </select>
        ) : (
          bug.assignee ? bug.assignee.name : <select
          className="form-control"
          onChange={e => handleUserSelection(bug.id, e.target.value)}
        >
          <option value="">Select a user</option>
          {developers.map(developer => (
            <option key={developer.id} value={developer.id}>
              {developer.name}
            </option>
          ))}
        </select>
        )}
      </td>
      <td>
        {bug.assignee ? (
          <button
            type="button"
            className="btn btn-success"
            onClick={handleReassignClick}
          >
            Reassign Bug
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleAssignBug(bug.id)}
          >
            Assign Bug
          </button>
        )}
      </td>
    </tr>
  );
};

export default BugRow;
