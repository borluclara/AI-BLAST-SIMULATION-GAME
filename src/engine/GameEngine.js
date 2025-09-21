import Particle from './Particle';
import Explosion from './Explosion';
import Physics from '../utils/Physics';

class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.particles = [];
    this.explosions = [];
    this.isRunning = false;
    this.lastTime = 0;
    
    // Physics settings
    this.gravity = 0.1;
    this.friction = 0.98;
    this.timeScale = 1;
    
    this.physics = new Physics();
    
    // Initialize with some ambient particles
    this.initializeAmbientParticles();
  }

  initializeAmbientParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 60 + 180}, 70%, 50%)`,
        life: Math.random() * 100 + 50,
        type: 'ambient'
      }));
    }
  }

  start() {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.gameLoop();
  }

  stop() {
    this.isRunning = false;
  }

  reset() {
    this.stop();
    this.particles = [];
    this.explosions = [];
    this.initializeAmbientParticles();
    this.clear();
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  createExplosion(x, y, intensity = 1) {
    const explosion = new Explosion(x, y, intensity);
    this.explosions.push(explosion);
    
    // Create explosion particles
    const particleCount = Math.floor(50 * intensity);
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const speed = Math.random() * 8 + 2;
      const size = Math.random() * 4 + 2;
      
      this.particles.push(new Particle({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed * intensity,
        vy: Math.sin(angle) * speed * intensity,
        size: size,
        color: `hsl(${Math.random() * 60 + 10}, 100%, ${Math.random() * 30 + 60}%)`,
        life: Math.random() * 60 + 40,
        type: 'explosion'
      }));
    }
  }

  gameLoop() {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(() => this.gameLoop());
  }

  update(deltaTime) {
    const dt = deltaTime * 0.016 * this.timeScale; // Normalize to 60fps

    // Update explosions
    this.explosions = this.explosions.filter(explosion => {
      explosion.update(dt);
      return !explosion.isDead();
    });

    // Update particles
    this.particles = this.particles.filter(particle => {
      particle.update(dt, this.gravity, this.friction);
      
      // Boundary collision
      this.physics.handleBoundaryCollision(particle, this.width, this.height);
      
      return particle.life > 0;
    });

    // Add new ambient particles occasionally
    if (Math.random() < 0.01 && this.particles.filter(p => p.type === 'ambient').length < 30) {
      this.particles.push(new Particle({
        x: Math.random() * this.width,
        y: -10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 0.5,
        size: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 60 + 180}, 70%, 50%)`,
        life: Math.random() * 100 + 50,
        type: 'ambient'
      }));
    }
  }

  render() {
    this.clear();
    
    // Render explosions
    this.explosions.forEach(explosion => {
      explosion.render(this.ctx);
    });
    
    // Render particles
    this.particles.forEach(particle => {
      particle.render(this.ctx);
    });
    
    // Render UI info
    this.renderInfo();
  }

  renderInfo() {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.font = '14px Arial';
    this.ctx.fillText(`Particles: ${this.particles.length}`, 10, 20);
    this.ctx.fillText(`Explosions: ${this.explosions.length}`, 10, 40);
  }

  clear() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}

export default GameEngine;