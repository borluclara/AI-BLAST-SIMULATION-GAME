/**
 * Grid Manager Component
 * Handles loading, displaying, and managing the ore grid
 */

import React, { useState } from 'react';
import { useOreGrid } from '../hooks/useOreGrid';
import OreGridCanvas from './OreGridCanvas';
import { ORE_COLORS } from '../utils/OreGrid';
import './GridManager.css';

const GridManager = () => {
  const {
    grid,
    loading,
    error,
    gridStats,
    loadGrid,
    loadGridFromContent,
    applyBlast,
    resetGrid,
    isReady
  } = useOreGrid('/sample_ore_data.csv'); // Load sample data on mount

  const [cellSize, setCellSize] = useState(30);
  const [showGrid, setShowGrid] = useState(true);
  const [showLabels, setShowLabels] = useState(false);
  const [blastRadius, setBlastRadius] = useState(2);
  const [blastPower, setBlastPower] = useState(50);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      loadGridFromContent(e.target.result);
    };
    reader.readAsText(file);
  };

  // Handle block click for blasting
  const handleBlockClick = (block, position) => {
    if (!block || block.isDestroyed) return;

    const blastResult = applyBlast(block.x, block.y, blastRadius, blastPower);
    
    console.log('Blast applied!', {
      target: `${block.oreType} at (${block.x}, ${block.y})`,
      result: blastResult
    });
  };

  // Load sample data
  const loadSampleData = () => {
    loadGrid('/sample_ore_data.csv');
  };

  return (
    <div className="grid-manager">
      <div className="grid-manager-header">
        <h2>Ore Grid Visualizer</h2>
        
        <div className="grid-actions">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            id="csv-upload"
            className="csv-upload-input"
          />
          <label htmlFor="csv-upload" className="csv-upload-btn">
            Load CSV File
          </label>
          
          <button onClick={loadSampleData} className="sample-btn">
            Load Sample Data
          </button>
          
          {isReady && (
            <button onClick={resetGrid} className="reset-btn">
              Reset Grid
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading grid data...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={loadSampleData}>Try Sample Data</button>
        </div>
      )}

      {isReady && (
        <>
          {/* Grid Statistics */}
          <div className="grid-stats">
            <div className="stat-item">
              <span className="stat-value">{gridStats.totalBlocks}</span>
              <span className="stat-label">Total Blocks</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{gridStats.destroyedBlocks}</span>
              <span className="stat-label">Destroyed</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{gridStats.survivalRate}%</span>
              <span className="stat-label">Survival Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{grid.width}×{grid.height}</span>
              <span className="stat-label">Dimensions</span>
            </div>
          </div>

          {/* Controls */}
          <div className="grid-controls">
            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                />
                Show Grid Lines
              </label>
            </div>

            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={showLabels}
                  onChange={(e) => setShowLabels(e.target.checked)}
                />
                Show Ore Labels
              </label>
            </div>

            <div className="control-group">
              <label>
                Cell Size: {cellSize}px
                <input
                  type="range"
                  min="15"
                  max="60"
                  value={cellSize}
                  onChange={(e) => setCellSize(parseInt(e.target.value))}
                />
              </label>
            </div>

            <div className="control-group">
              <label>
                Blast Radius: {blastRadius}
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={blastRadius}
                  onChange={(e) => setBlastRadius(parseInt(e.target.value))}
                />
              </label>
            </div>

            <div className="control-group">
              <label>
                Blast Power: {blastPower}
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={blastPower}
                  onChange={(e) => setBlastPower(parseInt(e.target.value))}
                />
              </label>
            </div>
          </div>

          {/* Grid Canvas */}
          <div className="grid-canvas-container">
            <p className="grid-instructions">
              Click on any ore block to apply a blast effect
            </p>
            
            <OreGridCanvas
              grid={grid}
              onBlockClick={handleBlockClick}
              cellSize={cellSize}
              showGrid={showGrid}
              showLabels={showLabels}
            />
          </div>

          {/* Ore Distribution */}
          <div className="ore-distribution">
            <h3>Ore Distribution</h3>
            <div className="ore-legend">
              {Object.entries(gridStats.oreDistribution).map(([oreType, count]) => (
                <div key={oreType} className="ore-legend-item">
                  <div 
                    className="ore-legend-color"
                    style={{ backgroundColor: ORE_COLORS[oreType] || ORE_COLORS.default }}
                  />
                  <span className="ore-legend-name">{oreType}</span>
                  <span className="ore-legend-count">({count})</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GridManager;