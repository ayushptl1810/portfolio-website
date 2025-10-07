import React from "react";
import { motion } from "framer-motion";
import { FaComments } from "react-icons/fa";

export default function ChatButton({ open, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="fixed bottom-[max(env(safe-area-inset-bottom),1.25rem)] right-[max(env(safe-area-inset-right),1.25rem)] z-[70] w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/20 text-white bg-zinc-950/70 backdrop-blur-md shadow-2xl flex items-center justify-center hover:bg-white hover:text-blue-900 transition-all duration-300 group cursor-pointer"
      whileHover={{
        scale: 1.06,
        rotate: 10,
        borderColor: "rgba(147, 51, 234, 0.8)",
        boxShadow: "0 0 30px rgba(147, 51, 234, 0.4)",
      }}
      whileTap={{ scale: 0.96 }}
      aria-label="Toggle chat"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

      {/* Icon */}
      <motion.span
        className="relative z-10"
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <FaComments className="w-5 h-5 md:w-6 md:h-6" />
      </motion.span>

      {/* Pulse ring */}
      {!open && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-400/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
}
