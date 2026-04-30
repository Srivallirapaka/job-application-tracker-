import React from 'react';
import './Header.css';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1><span className="rocket-icon">🚀</span> Job Tracker</h1>
      </div>
      <div className="header-right">
        {user && <span className="user-info">Welcome, {user.username}</span>}
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
