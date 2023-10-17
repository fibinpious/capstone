import React from 'react';
import './Navbar.css'; // Import your custom CSS file
import { Link, useNavigate } from 'react-router-dom';



const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Rest of the code for logging out

    // Navigate to the home page
    navigate('/');
  };
  return (
    <nav className="navbar">
      
      <div className="navbar-links">
        <ul>
          <li className="nav-item active">
            <Link className="navbrand" to ="/home">Home</Link>
          </li>
          <li className="nav-item dropdown">
            <a href="#">User</a>
            <div className="dropdown-menu">
              <Link className='navbrand' to ="/view-users"> View User </Link>
              <Link className='navbrand' to ="/add-user"> Add User </Link>
            </div>
          </li>
          <li className="nav-item">
          <Link className='navbrand' to ="/project-details"> View Project </Link>
          </li>
          <li className="nav-item">
          <Link  className='navbrand' to="/assign-bug">Assign Bug</Link>
          </li>
          
        </ul>
      </div>
      <button className="btn btn-light" onClick={handleLogout}>
          Logout
        </button>
    </nav>
  );
};

export default Navbar;
