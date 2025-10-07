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
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const ease = [0.22, 1, 0.36, 1];

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  React.useEffect(() => {
    if (reducedMotion) {
      setRevealing(false);
      setLabelVisible(false);
    }
  }, [reducedMotion]);

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
        {revealing && !reducedMotion && (
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
        {labelVisible && !reducedMotion && (
          <motion.div
            key="reveal-label"
            className="fixed inset-0 z-[61] flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onAnimationComplete={() => setLabelVisible(false)}
          >
            <span className="text-white font-bold font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
