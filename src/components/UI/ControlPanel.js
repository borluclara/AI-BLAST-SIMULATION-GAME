import React, { useState } from 'react';
import './ControlPanel.css';

const ControlPanel = () => {
  const [settings, setSettings] = useState({
    gravity: 0.1,
    friction: 0.98,
    particleCount: 50,
    explosionIntensity: 1,
    timeScale: 1
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: parseFloat(value)
    }));
  };

  return (
    <div className="control-panel">
      <h2 className="panel-title">Simulation Controls</h2>
      
      <div className="control-section">
        <h3>Physics Settings</h3>
        
        <div className="control-group">
          <label htmlFor="gravity">Gravity</label>
          <input
            type="range"
            id="gravity"
            min="0"
            max="1"
            step="0.01"
            value={settings.gravity}
            onChange={(e) => handleSettingChange('gravity', e.target.value)}
          />
          <span className="value">{settings.gravity.toFixed(2)}</span>
        </div>

        <div className="control-group">
          <label htmlFor="friction">Friction</label>
          <input
            type="range"
            id="friction"
            min="0.9"
            max="1"
            step="0.001"
            value={settings.friction}
            onChange={(e) => handleSettingChange('friction', e.target.value)}
          />
          <span className="value">{settings.friction.toFixed(3)}</span>
        </div>

        <div className="control-group">
          <label htmlFor="timeScale">Time Scale</label>
          <input
            type="range"
            id="timeScale"
            min="0.1"
            max="3"
            step="0.1"
            value={settings.timeScale}
            onChange={(e) => handleSettingChange('timeScale', e.target.value)}
          />
          <span className="value">{settings.timeScale.toFixed(1)}x</span>
        </div>
      </div>

      <div className="control-section">
        <h3>Explosion Settings</h3>
        
        <div className="control-group">
          <label htmlFor="intensity">Intensity</label>
          <input
            type="range"
            id="intensity"
            min="0.1"
            max="3"
            step="0.1"
            value={settings.explosionIntensity}
            onChange={(e) => handleSettingChange('explosionIntensity', e.target.value)}
          />
          <span className="value">{settings.explosionIntensity.toFixed(1)}</span>
        </div>

        <div className="control-group">
          <label htmlFor="particleCount">Particle Count</label>
          <input
            type="range"
            id="particleCount"
            min="10"
            max="200"
            step="10"
            value={settings.particleCount}
            onChange={(e) => handleSettingChange('particleCount', e.target.value)}
          />
          <span className="value">{settings.particleCount}</span>
        </div>
      </div>

      <div className="control-section">
        <h3>Instructions</h3>
        <div className="instructions">
          <p>🖱️ Click on the canvas to create explosions</p>
          <p>⚙️ Adjust physics parameters in real-time</p>
          <p>🎮 Use Start/Pause to control simulation</p>
          <p>🔄 Reset to clear all particles</p>
        </div>
      </div>

      <div className="control-section">
        <h3>Presets</h3>
        <div className="preset-buttons">
          <button 
            className="preset-btn"
            onClick={() => setSettings({
              gravity: 0.2,
              friction: 0.95,
              particleCount: 100,
              explosionIntensity: 2,
              timeScale: 1
            })}
          >
            Heavy Blast
          </button>
          <button 
            className="preset-btn"
            onClick={() => setSettings({
              gravity: 0.05,
              friction: 0.99,
              particleCount: 30,
              explosionIntensity: 0.5,
              timeScale: 0.5
            })}
          >
            Gentle Floating
          </button>
          <button 
            className="preset-btn"
            onClick={() => setSettings({
              gravity: 0.1,
              friction: 0.98,
              particleCount: 50,
              explosionIntensity: 1,
              timeScale: 1
            })}
          >
            Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;