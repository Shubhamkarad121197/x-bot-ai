import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="nav-group">
        <h1>Bot AI</h1>
      </div>
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          New Chat
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Past Conversations
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;