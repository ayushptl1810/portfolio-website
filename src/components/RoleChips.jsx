import React from "react";
import { motion } from "framer-motion";
import { FiSend, FiBriefcase, FiCpu } from "react-icons/fi";

const iconFor = (opt) => {
  if (/freelance/i.test(opt)) return <FiBriefcase className="w-4 h-4" />;
  if (/engineer/i.test(opt)) return <FiCpu className="w-4 h-4" />;
  return <FiSend className="w-4 h-4" />;
};

function RoleChips({ value, onChange, options = [] }) {
  return (
    <div
      className="flex flex-wrap gap-4"
      role="radiogroup"
      aria-label="Select role"
    >
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <motion.button
            key={opt}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 transition-colors cursor-pointer ${
              selected
                ? "bg-white text-blue-900 border-white"
                : "text-white border-white hover:bg-white hover:text-blue-900"
            }`}
          >
            <span>{iconFor(opt)}</span>
            <span className="text-sm font-semibold">{opt}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default RoleChips;
