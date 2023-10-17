import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './pages/HomePage';
import ProjectDetails from './pages/ProjectDetails';
import SpecificProject from './pages/SpecificProject';
import ViewBug from './pages/ViewBug';
import CreateBug from './pages/CreateBug';
import AddUser from './pages/AddUser';
import TesterHomePage from './pages/TesterHomePage';


import DeveloperViewBug from './pages/DeveloperViewBug';
import ViewUsers from './pages/ViewUsers';
import AssignBug from './pages/AssignBug';


const AppRouter = () => {
  const [userRole, setUserRole] = useState('Developer');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/Developer-home/:developerId/view-bugs"element={<DeveloperViewBug />}/>
        <Route path="/Tester-home" element={<TesterHomePage />} />
        <Route path="/developer-view-bug/:projectId" element={<DeveloperViewBug />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route path="/project/:id" element={<SpecificProject />} />
        <Route path="/view-bugs/:projectId" element={<ViewBug />} />
        <Route path="/create-bugs/:projectId" element={<CreateBug />} />
        <Route path="/view-users" element={<ViewUsers />} />
       
          <Route path="/add-user" element={<AddUser />} />
          <Route path= "/assign-bug" element={<AssignBug />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
