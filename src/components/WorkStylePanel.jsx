import React from "react";
import { motion } from "framer-motion";

const WorkStylePanel = ({ isActive }) => {
  const preferences = [
    {
      category: "Remote Work",
      status: "Ready",
      description: "Comfortable with remote/onsite",
      color: "green",
    },
    {
      category: "Project Type",
      status: "Full-Stack",
      description: "Web Applications",
      color: "purple",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: "from-green-500 to-green-600",
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (color) => {
    const colors = {
      green: "bg-green-500/20 border-green-400/30 text-green-400",
      blue: "bg-blue-500/20 border-blue-400/30 text-blue-400",
      purple: "bg-purple-500/20 border-purple-400/30 text-purple-400",
    };
    return colors[color] || colors.blue;
  };

  return (
    <motion.div
      className={`relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg transition-all duration-300 ${
        isActive ? "border-blue-400/50 shadow-blue-500/20" : ""
      }`}
      whileHover={{
        scale: 1.03,
        borderColor: "rgba(59, 130, 246, 0.5)",
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
      }}
    >
      {/* Work Preferences Border Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

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
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
          <h4 className="text-lg font-semibold text-white">Work Preferences</h4>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent" />
        </motion.div>

        {/* Preferences Grid */}
        <div className="space-y-4">
          {preferences.map((pref, index) => (
            <motion.div
              key={pref.category}
              className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-white font-medium text-sm">
                  {pref.category}
                </h5>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    pref.color
                  )}`}
                >
                  {pref.status}
                </div>
              </div>
              <p className="text-gray-400 text-xs">{pref.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Alignment Indicator */}
        <motion.div
          className="mt-6 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-xs text-gray-400">Work Alignment:</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-400 text-xs font-medium">Perfect</span>
          </div>
        </motion.div>
      </div>

      {/* Work Style Particles */}
      {isActive && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              initial={{
                x: Math.random() * 250,
                y: Math.random() * 150,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 250,
                y: Math.random() * 150,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default WorkStylePanel;
