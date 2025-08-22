import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ANIMATION_TIMING } from "./transitionTypes";

function IncomingTransition() {
  const location = useLocation();
  const [isActive, setIsActive] = React.useState(false);
  const [label, setLabel] = React.useState("");

  // Check if we're coming from a transition - only run once on mount
  React.useEffect(() => {
    const fromTransition = location.state?.fromTransition;
    const incomingLabel = location.state?.label;

    if (fromTransition && incomingLabel) {
      setIsActive(true);
      setLabel(incomingLabel);

      // Clear the state to prevent re-triggering
      window.history.replaceState({}, document.title);
    }
  }, []); // Empty dependency array - only run once

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Circular contraction cover */}
          <motion.div
            key="incoming-cover"
            className="fixed inset-0 z-[60] bg-black"
            initial={{
              clipPath:
                "circle(160% at calc(100% - 1.5rem) calc(100% - 1.5rem))",
            }}
            animate={{
              clipPath: "circle(0% at calc(100% - 1.5rem) calc(100% - 1.5rem))",
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: ANIMATION_TIMING.INCOMING_DURATION,
              ease: ANIMATION_TIMING.EASING,
            }}
            onAnimationComplete={() => {
              setIsActive(false);
            }}
          />

          {/* Label fade out */}
          <motion.div
            key="incoming-label"
            className="fixed inset-0 z-[61] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: ANIMATION_TIMING.LABEL_FADE_DURATION,
              delay: 0.15, // Delay text appearance by 0.5 seconds
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

export default IncomingTransition;
