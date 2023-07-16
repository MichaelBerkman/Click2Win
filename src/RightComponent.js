import React from 'react';
import { Link } from 'react-router-dom';

function RightComponent() {
  return (
    <div className="centered-content">
      <h1>Right Component</h1>
      <div className="button-container">
        <Link to="/right" className="button">Right</Link>
      </div>
    </div>
  );
}

export default RightComponent;
