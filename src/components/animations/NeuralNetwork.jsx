import React, { useRef, useEffect } from "react";

const NeuralNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Configuration
    const particleCount = 60;
    const connectionDistance = 100;
    const rotationSpeed = 0.002;
    const baseColor = { r: 16, g: 185, b: 129 }; // Emerald-500

    const particles = [];

    class Particle {
      constructor() {
        this.x = (Math.random() - 0.5) * width;
        this.y = (Math.random() - 0.5) * height;
        this.z = (Math.random() - 0.5) * width; // Depth
        this.radius = Math.random() * 1.5 + 1;
        this.velX = (Math.random() - 0.5) * 0.5;
        this.velY = (Math.random() - 0.5) * 0.5;
        this.velZ = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.x += this.velX;
        this.y += this.velY;
        this.z += this.velZ;

        // Simple rotation around Y axis
        const cos = Math.cos(rotationSpeed);
        const sin = Math.sin(rotationSpeed);

        const x = this.x * cos - this.z * sin;
        const z = this.z * cos + this.x * sin;

        this.x = x;
        this.z = z;

        // Boundary check (keep them loosely inside)
        const bound = width * 0.6;
        if (Math.abs(this.x) > bound) this.velX *= -1;
        if (Math.abs(this.y) > height * 0.6) this.velY *= -1;
        if (Math.abs(this.z) > bound) this.velZ *= -1;
      }

      // Project 3D to 2D
      project() {
        const perspective = 300;
        const scale = perspective / (perspective + this.z + 400); // push back a bit

        return {
          x: this.x * scale + width / 2,
          y: this.y * scale + height / 2,
          scale: scale,
          z: this.z,
        };
      }
    }

    // Initialize
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update first
      particles.forEach((p) => p.update());

      // Calculate projections
      const projected = particles.map((p) => p.project());

      // Sort by Z for simpler "depth" drawing (though additive mostly solves this)

      // Draw Connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const proj1 = projected[i];
          const proj2 = projected[j]; // Optimization: reuse projections

          // 3D distance check
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            const alpha = 1 - dist / connectionDistance;
            ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${
              baseColor.b
            }, ${alpha * 0.6})`;
            ctx.beginPath();
            ctx.moveTo(proj1.x, proj1.y);
            ctx.lineTo(proj2.x, proj2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Particles
      projected.forEach((p, index) => {
        if (p.scale <= 0) return;

        const original = particles[index];
        const alpha = (original.z + width / 2) / width; // roughly fade back ones

        ctx.beginPath();
        ctx.arc(p.x, p.y, original.radius * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.8)`;
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 1)`;
      });
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: "transparent" }}
    />
  );
};

export default NeuralNetwork;
