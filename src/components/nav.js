import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Home
        </Link>

        <div className="d-flex">
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
