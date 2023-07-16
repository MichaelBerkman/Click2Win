// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserContext from './UserContext';
import axios from 'axios';

function Header() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch the authenticated user's username
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user');
        setUsername(response.data.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="header">
      <div className="header-section">
        <Link to="/" className="header-button">Home</Link>
      </div>
      <div className="header-section">
        {username ? (
          <button className="header-button">{username}</button>
        ) : (
          <>
            <Link to="/signin" className="header-button">Sign In</Link>
            <Link to="/signup" className="header-button">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

function Home() {
  const [timer, setTimer] = useState(15);
  const [restartTimer, setRestartTimer] = useState(10);
  const [isRestarting, setIsRestarting] = useState(false);

  useEffect(() => {
    let timerID = null;
    if (timer > 0) {
      timerID = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (!isRestarting) {
      setIsRestarting(true);
      setRestartTimer(10);
    }
    return () => clearTimeout(timerID);
  }, [timer, isRestarting]);

  useEffect(() => {
    let restartTimerID = null;
    if (isRestarting && restartTimer > 0) {
      restartTimerID = setTimeout(() => setRestartTimer(restartTimer - 1), 1000);
    } else if (isRestarting && restartTimer === 0) {
      setIsRestarting(false);
      setTimer(15);
    }
    return () => clearTimeout(restartTimerID);
  }, [restartTimer, isRestarting]);

  return (
    <div className="home-container">
      <div className="content-container">
        <div className="welcome-container">
          <h1 className="welcome-heading">Welcome to Click2win!</h1>
        </div>
        <ul className="rules-list">
          <li className="rule-item"> It costs $1 to click a button. All the money goes into a pool.</li>
          <li className="rule-item"> You have until the clock hits zero to click the 'left' or 'right' button.</li>
          <li className="rule-item"> The button with the fewest clicks wins.</li>
          <li className="rule-item"> The players that clicked the button with the fewest clicks split the money in the pool</li>
          <li className="rule-item">The clock restarts after 10 seconds and the game restarts</li>
        </ul>
      </div>
      <div className="timer-container">
        <div className="timer-wrapper">
          <p className="timer">{timer}</p>
        </div>
        <div className="restart-wrapper">
          <p className={`restart-message ${isRestarting ? 'visible' : ''}`}>
            Clock will restart in {restartTimer} seconds...
          </p>
        </div>
      </div>
      <div className="button-section">
      <div className="left-button-section">
        <Link to="/left" className="custom-button">Left</Link>
      </div>
      <div className="center-button-section" />
      <div className="right-button-section">
        <Link to="/right" className="custom-button">Right</Link>
      </div>
    </div>
    </div>
  );
}

export default App;
