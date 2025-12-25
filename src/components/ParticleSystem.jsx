import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ParticleSystem = () => {
  const particlesRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get viewport dimensions
    const getViewportDimensions = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Create particles
    const createParticle = (index) => {
      const { width, height } = getViewportDimensions();
      const particle = {
        id: index,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.6 + 0.4,
        color: Math.random() > 0.5 ? "purple" : "blue",
      };
      return particle;
    };

    // Initialize particles
    particlesRef.current = Array.from({ length: 25 }, (_, i) =>
      createParticle(i)
    );

    // Animation loop
    let animationId;
    const animate = () => {
      const { width, height } = getViewportDimensions();

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= width) {
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= height) {
          particle.vy *= -1;
        }

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        // Damping
        particle.vx *= 0.995;
        particle.vy *= 0.995;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {particlesRef.current.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-1 h-1 rounded-full ${
            particle.color === "purple" ? "bg-purple-400" : "bg-blue-400"
          }`}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [
              particle.opacity,
              particle.opacity * 1.5,
              particle.opacity,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * 0.1,
          }}
        />
      ))}

      {/* Connection Lines */}
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

        {particlesRef.current.slice(0, 10).map((particle, i) => {
          const nextParticle = particlesRef.current[(i + 1) % 10];
          if (!nextParticle) return null;

          const distance = Math.sqrt(
            Math.pow(particle.x - nextParticle.x, 2) +
              Math.pow(particle.y - nextParticle.y, 2)
          );

          if (distance < 150) {
            return (
              <motion.line
                key={`connection-${i}`}
                x1={particle.x}
                y1={particle.y}
                x2={nextParticle.x}
                y2={nextParticle.y}
                stroke="url(#connectionGradient)"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                }}
              />
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
};

export default ParticleSystem;
