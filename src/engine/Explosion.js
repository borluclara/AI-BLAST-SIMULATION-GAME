class Explosion {
  constructor(x, y, intensity = 1) {
    this.x = x;
    this.y = y;
    this.intensity = intensity;
    this.radius = 0;
    this.maxRadius = 50 * intensity;
    this.life = 60;
    this.maxLife = this.life;
    this.expandSpeed = 3 * intensity;
    this.color = `hsl(${Math.random() * 60 + 10}, 100%, 70%)`;
  }

  update(deltaTime) {
    if (this.radius < this.maxRadius) {
      this.radius += this.expandSpeed * deltaTime;
    }
    this.life -= deltaTime;
  }

  render(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    
    ctx.save();
    ctx.globalAlpha = alpha * 0.6;
    
    // Outer blast wave
    const outerGradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius
    );
    outerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    outerGradient.addColorStop(0.3, this.color);
    outerGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
    
    ctx.fillStyle = outerGradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner core
    if (this.life > this.maxLife * 0.7) {
      ctx.globalAlpha = alpha;
      const coreGradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 0.3
      );
      coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      coreGradient.addColorStop(1, 'rgba(255, 200, 0, 0)');
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Shock wave ring
    if (this.radius > this.maxRadius * 0.3) {
      ctx.globalAlpha = alpha * 0.8;
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.9, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    ctx.restore();
  }

  isDead() {
    return this.life <= 0;
  }

  getBlastForce(particleX, particleY) {
    const dx = particleX - this.x;
    const dy = particleY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < this.radius && distance > 0) {
      const force = (this.maxRadius - distance) / this.maxRadius * this.intensity;
      return {
        fx: (dx / distance) * force,
        fy: (dy / distance) * force
      };
    }
    
    return { fx: 0, fy: 0 };
  }
}

export default Explosion;