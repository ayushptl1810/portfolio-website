import React from "react";
import { motion } from "framer-motion";

const PersonalIdentityPanel = () => {
  return (
    <motion.div
      className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl transition-all duration-300"
      whileHover={{
        scale: 1.03,
        borderColor: "rgba(147, 51, 234, 0.5)",
        boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.25)",
      }}
    >
      {/* Holographic Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Photo Section */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            {/* Profile Photo */}
            <div className="w-41 h-41 rounded-full overflow-hidden shadow-2xl shadow-purple-500/30 border-4 border-white/20">
              <img
                src="/src/assets/Me.jpeg"
                alt="Ayush Patel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Identity Information */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">Ayush Patel</h3>
          <div className="text-lg text-purple-400 mb-4 font-semibold">
            Full Stack Developer
          </div>

          {/* Location with icon */}
          <div className="flex items-center justify-center space-x-2 text-gray-300 mb-6">
            <div className="w-4 h-4 bg-blue-400 rounded-full" />
            <span>Mumbai, India</span>
          </div>
        </motion.div>

        {/* Status Indicator */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">
              Available
            </span>
          </div>
        </motion.div>
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
    </motion.div>
  );
};

export default PersonalIdentityPanel;
