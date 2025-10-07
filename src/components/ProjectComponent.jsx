import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectList from "../utils/ProjectList";
import IncomingTransition from "../transitions/IncomingTransition";

function ProjectComponent({ ids }) {
  const location = useLocation();
  const navigate = useNavigate();
  const onProjectsPage = location.pathname === "/projects";

  const dataset =
    !Array.isArray(ids) || ids.length === 0
      ? ProjectList
      : ProjectList.filter((p) => ids.includes(p.id));

  // Automatically scroll to top when component mounts (after page transition)
  // Only if we're coming from a transition (navigating TO projects)
  React.useEffect(() => {
    const fromTransition = location.state?.fromTransition;

    if (fromTransition) {
      // Instant scroll to top (no smooth behavior) so it's ready when transition ends
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });

      // Clear the state to prevent re-triggering
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleCta = () => {
    if (onProjectsPage) {
      // Navigate back to home with transition
      if (window.triggerPageTransition) {
        window.triggerPageTransition("/");
      } else {
        // Fallback: direct navigation
        navigate("/");
      }
    } else {
      // Navigate to projects with transition
      if (window.triggerPageTransition) {
        window.triggerPageTransition("/projects");
      } else {
        // Fallback: direct navigation
        navigate("/projects", {
          state: { fromTransition: true, label: "Projects" },
        });
      }
    }
  };

  // Function to scroll to top of projects list
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle "View All Projects" click
  const handleViewAllProjects = () => {
    if (onProjectsPage) {
      // If already on projects page, just scroll to top
      scrollToTop();
    } else {
      // Navigate to projects page
      if (window.triggerPageTransition) {
        window.triggerPageTransition("/projects");
      } else {
        navigate("/projects", {
          state: { fromTransition: true, label: "Projects" },
        });
      }
    }
  };

  // Handle "Back to Home" click - use transition but without scroll trigger
  const handleBackToHome = () => {
    // Use page transition but with a different state that won't trigger scroll
    if (window.triggerPageTransition) {
      window.triggerPageTransition("/");
    } else {
      // Fallback: direct navigation
      navigate("/");
    }
  };

  return (
    <>
      <IncomingTransition />
      <div className="w-full min-h-screen px-4 sm:px-5 md:px-6 py-8 md:py-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-6 md:mb-8 text-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center font-display">
              My Projects
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-12 text-center max-w-3xl mx-auto font-body">
              Here are some of the projects I've built. Each one represents a
              unique challenge and learning experience.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2 place-items-center">
            {dataset.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 22,
                  mass: 0.9,
                  delay: idx * 0.06,
                }}
                viewport={{ once: true, amount: 0.25 }}
                className="w-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <motion.button
              type="button"
              onClick={
                onProjectsPage ? handleBackToHome : handleViewAllProjects
              }
              className="inline-flex items-center justify-center gap-3 px-5 py-3 md:px-8 md:py-4 border-2 border-white rounded-full text-white transition-all duration-300 text-base md:text-lg cursor-pointer relative overflow-hidden group"
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(147, 51, 234, 0.7)",
                boxShadow: "0 0 24px rgba(147, 51, 234, 0.25)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />

              {/* Button Content */}
              <span className="relative z-10 font-ui whitespace-nowrap">
                {onProjectsPage ? "Back to Home" : "View All Projects"}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectComponent;
