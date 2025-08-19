import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function ProjectFab() {
  const navigate = useNavigate();
  const [expanding, setExpanding] = React.useState(false);

  const handleClick = () => {
    if (expanding) return;
    setExpanding(true);
  };

  const ease = [0.22, 1, 0.36, 1];

  return (
    <>
      <motion.button
        type="button"
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-6 py-3 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-900 transition-colors duration-300 text-lg"
        initial={{ opacity: 0, y: 24, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Projects</span>
      </motion.button>

      <AnimatePresence>
        {expanding && (
          <>
            {/* Circular expand to fully cover screen */}
            <motion.div
              key="expand"
              className="fixed inset-0 z-[60] bg-black"
              initial={{
                clipPath:
                  "circle(0% at calc(100% - 1.5rem) calc(100% - 1.5rem))",
              }}
              animate={{
                clipPath:
                  "circle(160% at calc(100% - 1.5rem) calc(100% - 1.5rem))",
              }}
              transition={{ duration: 0.5, ease }}
              onAnimationComplete={() => {
                setTimeout(() => {
                  navigate("/projects", {
                    state: { fromFab: true, label: "Projects" },
                  });
                }, 100); // shorter hold
              }}
            />
            {/* Center label shown during cover + brief hold */}
            <motion.div
              key="expand-label"
              className="fixed inset-0 z-[61] flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <span
                className="text-white text-9xl font-bold"
                style={{ fontSize: "8rem" }}
              >
                Projects
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProjectFab;
