import React from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProjectComponent from "../components/ProjectComponent";

function Projects() {
  const location = useLocation();
  const fromFab = location.state?.fromFab;
  const label = location.state?.label || "Projects";
  const [revealing, setRevealing] = React.useState(Boolean(fromFab));
  const [labelVisible, setLabelVisible] = React.useState(Boolean(fromFab));
  const ease = [0.22, 1, 0.36, 1];

  React.useEffect(() => {
    if (fromFab) {
      const t = setTimeout(() => setLabelVisible(false), 150);
      return () => clearTimeout(t);
    }
  }, [fromFab]);

  return (
    <div className="relative">
      <ProjectComponent />

      <AnimatePresence>
        {revealing && (
          <motion.div
            key="reveal"
            className="fixed inset-0 z-[60] bg-black"
            initial={{ clipPath: "circle(120% at 1.5rem 1.5rem)" }}
            animate={{ clipPath: "circle(0% at 1.5rem 1.5rem)" }}
            transition={{ duration: 0.85, ease }}
            onAnimationComplete={() => setRevealing(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {labelVisible && (
          <motion.div
            key="reveal-label"
            className="fixed inset-0 z-[61] flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onAnimationComplete={() => setLabelVisible(false)}
          >
            <span
              className="text-white text-9xl font-bold"
              style={{ fontSize: "8rem" }}
            >
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
