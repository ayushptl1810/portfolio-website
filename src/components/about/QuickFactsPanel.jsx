import React from "react";
import { motion } from "framer-motion";

const QuickFactsPanel = ({ isActive }) => {
  const facts = [
    {
      label: "Years Coding",
      value: "2+",
      description: "Development experience",
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Projects Built",
      value: "10+",
      description: "Web applications",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Team Projects",
      value: "5+",
      description: "Collaborative work experience",
      color: "from-purple-500 to-blue-600",
    },
    {
      label: "Hackathons Attended ",
      value: "10+",
      description: "Competitive coding events",
      color: "from-green-500 to-blue-600",
    },
  ];

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
          className="flex items-center space-x-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <h4 className="text-lg font-semibold text-white font-display">
            Quick Facts
          </h4>
          <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
        </motion.div>

        {/* Facts Grid */}
        <div className="grid grid-cols-2 gap-4">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.label}
              className="text-center p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Value */}
              <div
                className={`text-2xl font-bold bg-gradient-to-r ${fact.color} bg-clip-text text-transparent mb-1 font-ui`}
              >
                {fact.value}
              </div>

              {/* Label */}
              <div className="text-white font-medium text-sm mb-1 font-ui">
                {fact.label}
              </div>

              {/* Description */}
              <div className="text-gray-400 text-xs font-body">
                {fact.description}
              </div>
            </motion.div>
          ))}
        </div>
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

export default QuickFactsPanel;
