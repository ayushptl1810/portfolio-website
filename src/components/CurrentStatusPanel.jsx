import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CurrentStatusPanel = ({ isActive }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [spotifyStatus, setSpotifyStatus] = useState({
    isListening: true,
    track: "Bohemian Rhapsody",
    artist: "Queen",
    albumArt: "https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=🎵",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className={`relative bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-lg transition-all duration-300 ${
        isActive ? "border-green-400/50 shadow-green-500/20" : ""
      }`}
      whileHover={{
        scale: 1.03,
        borderColor: "rgba(34, 197, 94, 0.5)",
        boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.25)",
      }}
    >
      {/* Quantum Status Border Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center space-x-3 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <h4 className="text-lg font-semibold text-white font-display">
            Current Status
          </h4>
          <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
        </motion.div>

        {/* Spotify Status */}
        <motion.div
          className="mb-4 p-3 bg-green-500/10 border border-green-400/20 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img
                src={spotifyStatus.albumArt}
                alt="Album Art"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400 font-medium font-ui">
                  Currently Listening
                </span>
              </div>
              <div className="text-white font-medium text-sm truncate font-ui">
                {spotifyStatus.track}
              </div>
              <div className="text-gray-400 text-xs truncate font-body">
                {spotifyStatus.artist}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Time and Date */}
        <motion.div
          className="mb-4 p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-400 text-lg">🌍</span>
            </div>
            <div className="flex-1">
              <div className="text-xs text-blue-400 font-medium mb-1 font-ui">
                Mumbai Time
              </div>
              <div className="text-white font-mono text-lg font-ui">
                {formatTime(currentTime)}
              </div>
              <div className="text-gray-400 text-xs font-body">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Learning Focus */}
        <motion.div
          className="p-3 bg-purple-500/10 border border-purple-400/20 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-purple-400 text-lg">📚</span>
            </div>
            <div className="flex-1">
              <div className="text-xs text-purple-400 font-medium mb-1 font-ui">
                Learning Focus
              </div>
              <div className="text-white font-medium text-sm font-ui">
                Unreal Engine & Unity
              </div>
              <div className="text-gray-400 text-xs font-body">
                Starting Soon
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quantum Flux Indicator */}
        <motion.div
          className="mt-4 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-xs text-gray-400 font-ui">System Status:</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-medium font-ui">
              Stable
            </span>
          </div>
        </motion.div>
      </div>

      {/* Status Particles */}
      {isActive && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
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

export default CurrentStatusPanel;
