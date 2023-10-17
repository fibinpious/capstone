import React from 'react';
import './BugCard.css'; // Import your custom CSS file

const BugCard = ({ title, count, color, icon, totalBugs }) => {
  return (
    <div className={`card custom-card custom-bg-${color} custom-text-white custom-mb-3`}>
      <div className="card-body">
        <h5 className="custom-card-title">{title}</h5>
        <div className="custom-flex custom-justify-content-between custom-align-items-center">
          <i className={`fa ${icon} custom-fa-3x`} aria-hidden="true"></i>
          <span className="custom-display-4">{count}</span>
        </div>
        <div className="custom-flex custom-justify-content-between custom-align-items-center">
          <div>Total Bugs:</div>
          <div>{totalBugs}</div>
        </div>
      </div>
    </div>
  );
};

export default BugCard;
