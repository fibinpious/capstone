import React from 'react';
import LoginForm from './LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const LoginPage = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
    <div className="row w-100">
      <div className="col-md-6 bg-light p-5 d-flex justify-content-center align-items-center flex-column">
        <div className="text-center">
          <h1>BugTrace</h1>
          <p>Where Bugs Meet Their Match</p>
        </div>
      </div>
      <div className="col-md-6 p-5 d-flex justify-content-center align-items-center">
        <LoginForm />
      </div>
    </div>
  </div>
  
  );
};

export default LoginPage;
