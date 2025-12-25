import React, { useEffect, useRef } from "react";

const WebMatrix = ({ isActive }) => {
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

    let frameId;
    let time = 0;

    // Grid configuration
    const gridSize = 40;

    const drawGrid = (t) => {
      // Clear
      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#050505"); // dark top
      gradient.addColorStop(1, "#1a0b2e"); // deep purple bottom
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.save();

      // Cyberpunk grid effect
      ctx.strokeStyle = isActive
        ? "rgba(192, 132, 252, 0.4)"
        : "rgba(192, 132, 252, 0.15)";
      ctx.lineWidth = 1;

      const horizon = height * 0.4;

      // Vertical lines
      for (let x = -width; x < width * 2; x += gridSize) {
        ctx.beginPath();
        // Simple perspective projection
        // Top point (at horizon)
        ctx.moveTo(x + (width / 2 - x) * 0.8, horizon);
        // Bottom point
        ctx.lineTo(x - (width / 2 - x) * 2, height);
        ctx.stroke();
      }

      // Horizontal lines (moving)
      const speed = 0.5;
      const offset = (t * speed) % gridSize;

      for (let y = 0; y < height; y += gridSize / 2) {
        // Perspective scaling for horizontal lines
        const depth = y / (height - horizon); // 0 to 1
        const yPos = horizon + Math.pow(depth, 3) * (height - horizon);

        // Move them
        const yApparent = yPos + offset * depth;

        if (yApparent > height) continue;
        if (yApparent < horizon) continue;

        ctx.beginPath();
        ctx.moveTo(0, yApparent);
        ctx.lineTo(width, yApparent);

        // Fade out near horizon
        ctx.globalAlpha = depth;
        ctx.stroke();
      }

      ctx.restore();
    };

    // Digital rain snippets
    const chars = "01XY<>/{}_=";
    const drops = [];
    const maxDrops = 60;

    const drawRain = () => {
      if (drops.length < maxDrops && Math.random() > 0.9) {
        drops.push({
          x: Math.random() * width,
          y: -20,
          speed: Math.random() * 5 + 2,
          text: chars[Math.floor(Math.random() * chars.length)],
          color: Math.random() > 0.5 ? "#a855f7" : "#e879f9",
        });
      }

      drops.forEach((drop, i) => {
        ctx.fillStyle = drop.color;
        ctx.font = "14px monospace";
        ctx.fillText(drop.text, drop.x, drop.y);
        drop.y += drop.speed;

        if (drop.y > height) drops.splice(i, 1);
      });
    };

    const drawScanlines = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      for (let i = 0; i < height; i += 4) {
        ctx.fillRect(0, i, width, 1);
      }
    };

    const render = () => {
      time++;
      drawGrid(time);
      if (isActive) {
        drawRain();
      }
      drawScanlines();
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

export default WebMatrix;
