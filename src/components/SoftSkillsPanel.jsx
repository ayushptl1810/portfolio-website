import React from "react";
import { motion } from "framer-motion";

const SoftSkillsPanel = ({ isActive }) => {
  const skills = [
    {
      name: "Communication",
      description: "Clear technical explanations",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Problem Solving",
      description: "Systematic debugging approach",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Team Collaboration",
      description: "Effective project coordination",
      color: "from-purple-500 to-blue-600",
    },
  ];

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
      {/* Neural Network Border Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

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
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
          <h4 className="text-lg font-semibold text-white">Core Skills</h4>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent" />
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Skill Header */}
              <div className="mb-2">
                <h5 className="text-white font-medium text-sm">{skill.name}</h5>
              </div>

              {/* Skill Description */}
              <p className="text-xs text-gray-400 mb-2">{skill.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Synaptic Strength Indicator */}
        <motion.div
          className="mt-4 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-xs text-gray-400">Performance Level:</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-400 text-xs font-medium">Optimal</span>
          </div>
        </motion.div>
      </div>

      {/* Neural Connection Lines */}
      {isActive && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <svg className="w-full h-full absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.line
                key={i}
                x1="20"
                y1={40 + i * 40}
                x2="180"
                y2={40 + i * 40}
                stroke="url(#neuralGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              />
            ))}
            <defs>
              <linearGradient
                id="neuralGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.8)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default SoftSkillsPanel;
