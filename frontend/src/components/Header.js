import React from 'react';
import './Header.css';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>🚀 Job Tracker</h1>
      </div>
      <div className="header-right">
        {user && <span className="user-info">Welcome, {user.username}</span>}
        <button className="btn btn-secondary logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
