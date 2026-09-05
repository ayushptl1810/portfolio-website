import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3BottomLeft } from "react-icons/hi2";

function FluidMenu({ basePath = "" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  // const panelWidth = "33vw"; // Removed to use CSS classes
  const DURATION = 0.4;

  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (path, lbl) => {
    if (path === location.pathname) {
      setIsOpen(false);
      return;
    }

    // Use the global transition system
    if (window.triggerPageTransition) {
      window.triggerPageTransition(path);
    } else {
      // Fallback: direct navigation
      navigate(path, {
        state: { fromTransition: true, label: lbl },
      });
    }
    setIsOpen(false);
  };

  const menuItems = [
    { label: "Home", path: basePath ? basePath : "/" },
    { label: "Projects", path: `${basePath}/projects` },
    { label: "About Me", path: `${basePath}/about` },
  ];

  return (
    <>
      {/* Top-right hamburger always above overlays */}
      <button
        type="button"
        onClick={toggleButton}
        aria-expanded={isOpen}
        className="fixed top-6 right-6 z-[80] h-12 w-12 rounded-full border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-blue-900 transition-colors cursor-pointer"
      >
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="inline-flex"
        >
          <HiBars3BottomLeft className="h-6 w-6" />
        </motion.span>
      </button>

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 right-0 h-full z-[60] bg-black w-full md:w-[33vw]"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ duration: DURATION, ease: "easeInOut" }}
      >
        <div className="w-full h-full flex flex-col justify-between py-24 px-12 relative overflow-hidden">
          {/* Main Navigation Links */}
          <div className="flex-1 flex flex-col items-start justify-center gap-8">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <motion.button
                  key={item.label}
                  onClick={() => handleSelect(item.path, item.label)}
                  className={`text-3xl md:text-5xl font-bold transition-colors font-display text-left cursor-pointer
                          ${isActive ? "text-purple-400" : "text-white"}
                          hover:text-purple-300
                      `}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isOpen ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </div>

        </div>
      </motion.div>

      {/* Scrim with proper exit animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[59] bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default FluidMenu;
