import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <h1 className="welcome-heading">Welcome to Click2win!</h1>
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
        <Link to="/left" className="custom-button left-button">Left</Link>
        <Link to="/right" className="custom-button right-button">Right</Link>
      </div>
    </div>
  );
}

export default Home;

