// SignIn.js
import React, { useState } from 'react';
import './SignIn.css';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username && password) {
      // If you have a username and password, clear them.
      setUsername('');
      setPassword('');
    } else {
      setError('Please enter a username and password.');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-wrapper">
        <h1 className="signin-heading">Sign In</h1>
        <form className="signin-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
        <div className="register-link">
          Don't have an account? <a href="/signup">Register</a>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default SignIn;
