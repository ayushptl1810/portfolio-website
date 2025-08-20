import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ANIMATION_TIMING } from "./transitionTypes";

function OutgoingTransition({ isActive, label, onComplete }) {
  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Circular expansion cover - from top-left */}
          <motion.div
            key="outgoing-cover"
            className="fixed inset-0 z-[60] bg-black"
            initial={{
              clipPath: "circle(0% at 1.5rem 1.5rem)",
            }}
            animate={{
              clipPath: "circle(160% at 1.5rem 1.5rem)",
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: ANIMATION_TIMING.OUTGOING_DURATION,
              ease: ANIMATION_TIMING.EASING,
            }}
            onAnimationComplete={() => {
              // Hold for a moment, then complete
              setTimeout(() => {
                onComplete();
              }, ANIMATION_TIMING.HOLD_DURATION);
            }}
          />

          {/* Label display */}
          <motion.div
            key="outgoing-label"
            className="fixed inset-0 z-[61] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: ANIMATION_TIMING.LABEL_FADE_DURATION,
              ease: "easeOut",
            }}
          >
            <span
              className="text-white text-9xl font-bold"
              style={{ fontSize: "4rem" }}
            >
              {label}
            </span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default OutgoingTransition;
