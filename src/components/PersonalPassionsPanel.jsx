import React from "react";
import { motion } from "framer-motion";
import eldenRingLogo from "../assets/EldenRingLogo.jpg";
import wukongLogo from "../assets/WukongLogo.png";
import clubLogo from "../assets/clubLogo.jpg";

const PersonalPassionsPanel = ({ isActive }) => {
  return (
    <motion.div
      className={`relative bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl transition-all duration-300 ${
        isActive ? "border-blue-400/50 shadow-blue-500/20" : ""
      }`}
      whileHover={{
        scale: 1.03,
        borderColor: "rgba(59, 130, 246, 0.5)",
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
      }}
    >
      {/* Holographic Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center space-x-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-3 h-3 bg-blue-400 rounded-full" />
          <h4 className="text-lg font-semibold text-white font-display">
            Personal Passions
          </h4>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Gaming Section - 66% width (2 columns) */}
          <div className="col-span-2">
            {/* Games Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Currently Playing */}
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="h-48 bg-black/40 border border-white/20 rounded-xl overflow-hidden relative">
                  <img
                    src={eldenRingLogo}
                    alt="Elden Ring"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-sm font-medium text-white font-ui">
                      Elden Ring
                    </p>
                    <p className="text-xs text-gray-300 font-body">
                      Currently Playing
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Favourite Game */}
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="h-48 bg-black/40 border border-white/20 rounded-xl overflow-hidden relative">
                  <img
                    src={wukongLogo}
                    alt="Black Myth Wukong"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-sm font-medium text-white font-ui">
                      Black Myth Wukong
                    </p>
                    <p className="text-xs text-gray-300 font-body">
                      Favourite Game
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Gaming Stats */}
            <motion.div
              className="bg-black/40 border border-white/20 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{
                opacity: [0, 1, 1],
                y: [20, 0, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.3 },
                y: { duration: 0.5, delay: 0.3 },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-purple-400 text-sm font-medium font-ui">
                    Genre
                  </div>
                  <div className="text-white text-xs font-body">FPS + RPG</div>
                </div>
                <div>
                  <div className="text-blue-400 text-sm font-medium font-ui">
                    Time Invested
                  </div>
                  <div className="text-white text-xs font-body">
                    3000+ Hours
                  </div>
                </div>
                <div>
                  <div className="text-green-400 text-sm font-medium font-ui">
                    Style
                  </div>
                  <div className="text-white text-xs font-body">Casual</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Football Section - 33% width (1 column) */}
          <div className="col-span-1 flex items-center justify-center group">
            {/* Club Logo & Info */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Club Logo */}
              <motion.div
                className="w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full border-2 border-white/20 relative"
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={clubLogo}
                  alt="Manchester United FC"
                  className="w-full h-full object-cover"
                />

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </motion.div>

              {/* Club Info */}
              <div className="space-y-2">
                <h6 className="text-white font-semibold text-sm font-ui">
                  Manchester United FC
                </h6>
                <p className="text-gray-300 text-xs font-body">
                  My Club Since 2016
                </p>
                <p className="text-gray-400 text-xs font-body">
                  Die-hard Supporter
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Holographic Scan Lines */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Status Particles */}
      {isActive && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              initial={{
                x: Math.random() * 200,
                y: Math.random() * 100,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 200,
                y: Math.random() * 100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PersonalPassionsPanel;
