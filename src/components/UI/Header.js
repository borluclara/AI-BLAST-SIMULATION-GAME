import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">
          <span className="title-icon">💥</span>
          AI Blast Simulation Game
        </h1>
        <p className="subtitle">
          Experience realistic 2D explosion physics and particle dynamics
        </p>
      </div>
    </header>
  );
};

export default Header;