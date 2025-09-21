class Physics {
  constructor() {
    this.restitution = 0.7; // Bounce factor
  }

  handleBoundaryCollision(particle, width, height) {
    // Left and right boundaries
    if (particle.x - particle.size < 0) {
      particle.x = particle.size;
      particle.vx *= -this.restitution;
    } else if (particle.x + particle.size > width) {
      particle.x = width - particle.size;
      particle.vx *= -this.restitution;
    }

    // Top and bottom boundaries
    if (particle.y - particle.size < 0) {
      particle.y = particle.size;
      particle.vy *= -this.restitution;
    } else if (particle.y + particle.size > height) {
      particle.y = height - particle.size;
      particle.vy *= -this.restitution;
      
      // Add some friction when hitting the ground
      particle.vx *= 0.9;
    }
  }

  checkParticleCollision(particle1, particle2) {
    const dx = particle2.x - particle1.x;
    const dy = particle2.y - particle1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = particle1.size + particle2.size;

    if (distance < minDistance) {
      // Collision detected
      const overlap = minDistance - distance;
      const separation = overlap / 2;

      // Separate particles
      const separationX = (dx / distance) * separation;
      const separationY = (dy / distance) * separation;

      particle1.x -= separationX;
      particle1.y -= separationY;
      particle2.x += separationX;
      particle2.y += separationY;

      // Calculate collision response
      const relativeVelocityX = particle2.vx - particle1.vx;
      const relativeVelocityY = particle2.vy - particle1.vy;

      const speed = Math.sqrt(relativeVelocityX * relativeVelocityX + relativeVelocityY * relativeVelocityY);
      
      if (speed > 0.1) {
        const normalX = dx / distance;
        const normalY = dy / distance;

        const impactSpeed = relativeVelocityX * normalX + relativeVelocityY * normalY;

        if (impactSpeed > 0) {
          const impulse = 2 * impactSpeed / (particle1.mass + particle2.mass);

          particle1.vx += impulse * particle2.mass * normalX * this.restitution;
          particle1.vy += impulse * particle2.mass * normalY * this.restitution;
          particle2.vx -= impulse * particle1.mass * normalX * this.restitution;
          particle2.vy -= impulse * particle1.mass * normalY * this.restitution;
        }
      }

      return true;
    }

    return false;
  }

  applyForce(particle, forceX, forceY) {
    particle.vx += forceX / particle.mass;
    particle.vy += forceY / particle.mass;
  }

  calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  normalizeVector(x, y) {
    const length = Math.sqrt(x * x + y * y);
    if (length === 0) return { x: 0, y: 0 };
    return { x: x / length, y: y / length };
  }
}

export default Physics;