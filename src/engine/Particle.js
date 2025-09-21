class Particle {
  constructor(options = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.vx = options.vx || 0;
    this.vy = options.vy || 0;
    this.size = options.size || 2;
    this.color = options.color || '#ffffff';
    this.life = options.life || 100;
    this.maxLife = this.life;
    this.type = options.type || 'default';
    this.mass = options.mass || 1;
    this.bounciness = options.bounciness || 0.7;
  }

  update(deltaTime, gravity = 0, friction = 1) {
    // Apply gravity
    if (this.type === 'explosion') {
      this.vy += gravity * deltaTime;
    }

    // Apply friction
    this.vx *= friction;
    this.vy *= friction;

    // Update position
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;

    // Decrease life
    this.life -= deltaTime;
  }

  render(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    
    ctx.save();
    ctx.globalAlpha = alpha;
    
    // Create gradient for particle
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    
    if (this.type === 'explosion') {
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
    } else {
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
    }
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add glow effect for explosion particles
    if (this.type === 'explosion' && alpha > 0.5) {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = this.size * 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }

  isDead() {
    return this.life <= 0;
  }
}

export default Particle;