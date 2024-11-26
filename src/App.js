import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';  
import { Navbar, Nav, Button } from 'react-bootstrap';  // Bootstrap components
import './App.css';

import Courses from './components/Courses';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = () => {
    return localStorage.getItem('token');
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Course Platform</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/courses">Courses</Nav.Link>
            {isAuthenticated() ? (
              <>
                <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/courses" element={<Courses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
