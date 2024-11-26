// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';  // Only here in index.js
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

// Wrap the entire app with BrowserRouter
ReactDOM.render(
  <Router>
    <App />  {/* App is now wrapped by BrowserRouter */}
  </Router>,
  document.getElementById('root')
);
