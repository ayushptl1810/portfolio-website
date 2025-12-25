import React, { useEffect, useRef } from "react";

const AINeural = ({ isActive }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      width = window.innerWidth;
      height = window.innerHeight;
    };
    handleResize();

    let particles = [];
    const particleCount = 80;
    const connectionDistance = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        // Drifting motion
        this.x += this.vx;
        this.y += this.vy;

        // Bounce
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = isActive ? "#34d399" : "#059669";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Init
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let frameId;
    const render = () => {
      // Clear with trail effect
      ctx.fillStyle = "rgba(2, 12, 10, 0.2)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Connections
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance;
            ctx.strokeStyle = isActive
              ? `rgba(52, 211, 153, ${opacity * 0.8})`
              : `rgba(16, 185, 129, ${opacity * 0.3})`;
            ctx.lineWidth = isActive ? 1.5 : 0.5;

            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
          }
        }
      }
      ctx.stroke();

      frameId = requestAnimationFrame(render);
    };

    render();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default AINeural;
