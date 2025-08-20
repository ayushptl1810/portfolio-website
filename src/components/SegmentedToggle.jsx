import React from "react";
import { motion } from "framer-motion";

function SegmentedToggle({ value, options = [], onChange }) {
  const index = Math.max(
    0,
    options.findIndex((o) => o === value)
  );
  const count = Math.max(1, options.length);
  const isAlt = index % 2 === 1; // for 2-option toggle, LinkedIn is right

  return (
    <div
      className={`relative inline-grid rounded-full overflow-hidden border-2 border-white/70 bg-white/10 backdrop-blur-md`}
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
    >
      {/* Thumb container (moves) */}
      <motion.div
        className="absolute top-0 bottom-0 rounded-full overflow-hidden"
        initial={false}
        animate={{ x: `${index * 100}%` }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        style={{ width: `calc(100% / ${count})` }}
      >
        {/* Gradient A: purple -> blue */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: isAlt ? 0 : 1 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, rgba(124,58,237,0.9), rgba(59,130,246,0.9))",
            boxShadow: "0 0 28px rgba(124,58,237,0.35)",
          }}
        />
        {/* Gradient B: blue -> purple */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: isAlt ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, rgba(59,130,246,0.9), rgba(124,58,237,0.9))",
            boxShadow: "0 0 28px rgba(59,130,246,0.35)",
          }}
        />
      </motion.div>

      {/* Options */}
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange?.(opt)}
          className={`relative z-[1] px-5 py-2 w-[8.25rem] text-sm font-semibold transition-colors text-white cursor-pointer`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default SegmentedToggle;
