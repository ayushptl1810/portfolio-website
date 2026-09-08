import React, { useState } from "react";

const PARTICLE_COUNT = 25;

const buildParticles = () => {
  const width = typeof window !== "undefined" ? window.innerWidth : 1440;
  const height = typeof window !== "undefined" ? window.innerHeight : 900;

  return Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
    id,
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 4 + 1,
    opacity: Math.random() * 0.6 + 0.4,
    color: Math.random() > 0.5 ? "purple" : "blue",
  }));
};

/**
 * Decorative particle field. Positions are fixed on mount; the only motion is
 * a CSS keyframe pulse (see `.particle` in index.css), which the browser
 * pauses automatically on hidden tabs. No requestAnimationFrame loop.
 */
const ParticleSystem = () => {
  const [particles] = useState(buildParticles);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, width: "100%", height: "100%" }}
    >
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`particle absolute rounded-full ${
            particle.color === "purple" ? "bg-purple-400" : "bg-blue-400"
          }`}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            "--particle-opacity": particle.opacity,
            animationDelay: `${particle.id * 0.1}s`,
          }}
        />
      ))}

      {/* Connection Lines (static, from frozen positions) */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient
            id="connectionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
          </linearGradient>
        </defs>

        {particles.slice(0, 10).map((particle, i) => {
          const nextParticle = particles[(i + 1) % 10];
          if (!nextParticle) return null;

          const distance = Math.hypot(
            particle.x - nextParticle.x,
            particle.y - nextParticle.y,
          );
          if (distance >= 150) return null;

          return (
            <line
              key={`connection-${i}`}
              x1={particle.x}
              y1={particle.y}
              x2={nextParticle.x}
              y2={nextParticle.y}
              stroke="url(#connectionGradient)"
              strokeWidth="0.5"
              opacity="0.3"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ParticleSystem;
