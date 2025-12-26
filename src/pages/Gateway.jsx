import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "@fontsource/playfair-display";
import "@fontsource/inter";

// Web Background Components
import DarkVeil from "../components/shared/DarkVeil";
import ParticleSystem from "../components/shared/ParticleSystem";

// AI Background Components
import AINeural from "../components/gateway/AINeural";

const Gateway = () => {
  const navigate = useNavigate();
  const [hoveredSide, setHoveredSide] = useState(null); // 'web' | 'ai' | null

  const handleInteraction = (path) => {
    navigate(path);
  };

  // Variants for the split clip-path
  const webClip =
    hoveredSide === "web"
      ? "polygon(0 0, 80% 0, 60% 100%, 0 100%)"
      : hoveredSide === "ai"
      ? "polygon(0 0, 40% 0, 20% 100%, 0 100%)"
      : "polygon(0 0, 55% 0, 45% 100%, 0 100%)";

  const aiClip =
    hoveredSide === "web"
      ? "polygon(80% 0, 100% 0, 100% 100%, 60% 100%)"
      : hoveredSide === "ai"
      ? "polygon(40% 0, 100% 0, 100% 100%, 20% 100%)"
      : "polygon(55% 0, 100% 0, 100% 100%, 45% 100%)";

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans select-none">
      {/* --- WEB SIDE (LEFT) --- */}
      <motion.div
        className="absolute inset-0 z-10 cursor-pointer"
        initial={false}
        animate={{ clipPath: webClip }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        onMouseEnter={() => setHoveredSide("web")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleInteraction("/web")}
      >
        <div className="relative w-full h-full bg-[#0a0514]">
          {/* Exact Background from WebLayout */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-900/20" />
          <DarkVeil />
          <ParticleSystem />

          {/* Overlay Gradient for Text readability */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-black/60 to-transparent transition-opacity duration-500 ${
              hoveredSide === "web" ? "opacity-20" : "opacity-60"
            }`}
          />

          {/* Floating Label */}
          <div className="absolute top-[30%] left-[10%] transform -translate-y-1/2 pointer-events-none z-20">
            <motion.div
              animate={{
                x: hoveredSide === "web" ? 0 : -20,
                opacity: hoveredSide === "ai" ? 0.3 : 1,
                scale: hoveredSide === "web" ? 1.1 : 1,
              }}
              className="flex flex-col"
            >
              <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] font-['Inter'] uppercase tracking-tighter">
                WEB
              </h2>
              <p className="text-purple-200 text-lg md:text-2xl tracking-[0.5em] font-light mt-2 ml-1">
                ARCHITECT
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* --- AI SIDE (RIGHT) --- */}
      <motion.div
        className="absolute inset-0 z-10 cursor-pointer"
        initial={false}
        animate={{ clipPath: aiClip }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        onMouseEnter={() => setHoveredSide("ai")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleInteraction("/ai")}
      >
        <div className="relative w-full h-full bg-[#020d05]">
          {/* Original Gateway AI Background */}
          <div className="absolute inset-0 opacity-60">
            <AINeural isActive={hoveredSide === "ai"} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tl from-emerald-950/80 via-black/40 to-transparent" />

          {/* Floating Label */}
          <div className="absolute top-[70%] right-[10%] transform -translate-y-1/2 pointer-events-none z-20 text-right">
            <motion.div
              animate={{
                x: hoveredSide === "ai" ? 0 : 20,
                opacity: hoveredSide === "web" ? 0.3 : 1,
                scale: hoveredSide === "ai" ? 1.1 : 1,
              }}
              className="flex flex-col items-end"
            >
              <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-cyan-600 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] font-['Inter'] uppercase tracking-tighter">
                AI
              </h2>
              <p className="text-emerald-200 text-lg md:text-2xl tracking-[0.5em] font-light mt-2 mr-1">
                ENGINEER
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* --- CENTER DIVIDER & LOGO --- */}

      {/* --- CENTER DIVIDER & LOGO --- */}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none mix-blend-difference">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-white text-4xl md:text-6xl tracking-[0.2em] font-['Playfair_Display'] font-bold uppercase text-center whitespace-nowrap"
        >
          Ayush Patel
        </motion.h1>
      </div>

      <div className="absolute bottom-12 w-full text-center z-40 pointer-events-none">
        <motion.p
          animate={{ opacity: hoveredSide ? 0 : 0.5 }}
          className="text-white/40 text-xs tracking-widest uppercase animate-pulse"
        >
          Select Your Reality
        </motion.p>
      </div>
    </div>
  );
};

export default Gateway;
