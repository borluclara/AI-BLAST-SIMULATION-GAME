import React from 'react';
import GameCanvas from './components/Game/GameCanvas';
import ControlPanel from './components/UI/ControlPanel';
import Header from './components/UI/Header';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="game-container">
        <GameCanvas />
        <ControlPanel />
      </div>
    </div>
  );
}

export default App;