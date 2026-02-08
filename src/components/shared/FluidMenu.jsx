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
    { label: "Contact Me", path: `${basePath}/contact` },
  ];

  // Add Switch Persona if we are in a sub-route (basePath is set)
  if (basePath) {
    menuItems.push({ label: "Switch Persona", path: "/", isSpecial: true });
  }

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
            {menuItems
              .filter((i) => !i.isSpecial)
              .map((item) => {
                const isActive = location.pathname === item.path;
                const activeColorClass =
                  basePath === "/ai" ? "text-emerald-400" : "text-purple-400";

                return (
                  <motion.button
                    key={item.label}
                    onClick={() => handleSelect(item.path, item.label)}
                    className={`text-3xl md:text-5xl font-bold transition-colors font-display text-left cursor-pointer 
                            ${isActive ? activeColorClass : "text-white"} 
                            ${
                              basePath === "/ai" ?
                                "hover:text-emerald-300"
                              : "hover:text-purple-300"
                            }
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

          {/* Switch Persona - Distinct Bottom Action */}
          {menuItems.find((i) => i.isSpecial) && (
            <div className="border-t border-white/10 pt-8 mt-4 w-full">
              <motion.button
                onClick={() => handleSelect("/", "Gateway")}
                className="group flex items-center gap-4 text-left w-full cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    basePath === "/ai" ?
                      "text-emerald-400 border-emerald-500/30 group-hover:bg-emerald-400 group-hover:text-black group-hover:border-emerald-400"
                    : "text-purple-400 border-purple-500/30 group-hover:bg-purple-400 group-hover:text-black group-hover:border-purple-400"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-sm text-gray-500 font-mono uppercase tracking-widest mb-1">
                    Current Reality
                  </span>
                  <span
                    className={`block text-xl text-white font-display transition-colors ${
                      basePath === "/ai" ?
                        "group-hover:text-emerald-300"
                      : "group-hover:text-purple-300"
                    }`}
                  >
                    Switch Dimension
                  </span>
                </div>
              </motion.button>
            </div>
          )}

          {/* Background Decorative Text */}
          <div className="absolute -bottom-10 -right-10 text-[15rem] font-bold text-white/5 pointer-events-none select-none font-display leading-none">
            {basePath === "/ai" ? "AI" : "WEB"}
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
