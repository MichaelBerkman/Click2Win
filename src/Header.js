import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="header">
      <div className="header-section">
        <Link to="/" className="header-button">Home</Link>
      </div>
      <div className="header-section">
        {user ? (
          <button className="header-button">{user.username}</button>
        ) : (
          <>
            <Link to="/signin" className="
