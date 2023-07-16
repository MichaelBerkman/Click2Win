import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verify the passwords match
    if (password !== verifyPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Send POST request to server
      const response = await axios.post('http://localhost:3000/api/signup', {
        username,
        password
      });

      if (response.data.message) {
        setUsername('');
        setPassword('');
        setVerifyPassword('');
        setError(response.data.message);
      } else {
        setError('An error occurred during registration.');
      }
    } catch (error) {
      setError('An error occurred during registration.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <h1 className="signup-heading">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="verifyPassword" className="form-label">Verify Password</label>
            <input
              type="password"
              id="verifyPassword"
              className="form-input"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Register
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
