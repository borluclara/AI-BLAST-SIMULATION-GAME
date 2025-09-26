
import React from 'react'
import './App.css'
import GridManager from './components/GridManager'

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="logo">
            <span className="blast-icon">💥</span>
            <h1>MINERAL BLASTING SIMULATOR</h1>
          </div>
          <p className="subtitle">Experience realistic mining blast simulations with 2D ore visualization</p>
        </header>
        
        <main className="main-content">
          <GridManager />
        </main>
        
        <footer className="footer">
          <p>Advanced Mining Technology Simulation Platform</p>
        </footer>
      </div>
    </div>
  )
}

export default App