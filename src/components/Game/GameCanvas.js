import React, { useEffect, useRef, useState } from 'react';
import GameEngine from '../../engine/GameEngine';
import './GameCanvas.css';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const gameEngineRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize game engine
    gameEngineRef.current = new GameEngine(canvas);
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * 0.7;
      canvas.height = window.innerHeight * 0.8;
      if (gameEngineRef.current) {
        gameEngineRef.current.resize(canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse click handler for creating explosions
    const handleCanvasClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      if (gameEngineRef.current) {
        gameEngineRef.current.createExplosion(x, y);
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleCanvasClick);
      if (gameEngineRef.current) {
        gameEngineRef.current.stop();
      }
    };
  }, []);

  const toggleSimulation = () => {
    if (gameEngineRef.current) {
      if (isRunning) {
        gameEngineRef.current.stop();
      } else {
        gameEngineRef.current.start();
      }
      setIsRunning(!isRunning);
    }
  };

  const resetSimulation = () => {
    if (gameEngineRef.current) {
      gameEngineRef.current.reset();
      setIsRunning(false);
    }
  };

  return (
    <div className="game-canvas-container">
      <div className="canvas-controls">
        <button onClick={toggleSimulation} className="control-btn">
          {isRunning ? 'Pause' : 'Start'} Simulation
        </button>
        <button onClick={resetSimulation} className="control-btn">
          Reset
        </button>
        <span className="instructions">
          Click on the canvas to create explosions!
        </span>
      </div>
      <canvas
        ref={canvasRef}
        className="game-canvas"
      />
    </div>
  );
};

export default GameCanvas;