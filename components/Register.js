import React, { useState } from 'react';
import { registerUser } from '../api'; // Register API call
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, password); // Register user
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      setError('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Register</Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </div>
  );
};

export default Register;
