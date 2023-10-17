import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './AppRouter'; // Import the AppRouter component
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter /> {/* Render the AppRouter component instead of App */}
  </React.StrictMode>
);

reportWebVitals();
