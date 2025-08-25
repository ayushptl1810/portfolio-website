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
      <div className="w-full min-h-screen px-4 md:px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              My Projects
            </h2>

            <p className="text-gray-300 text-base md:text-lg">
              A selection of my recent work. Click a project to explore more.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 place-items-center">
            {dataset.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: idx * 0.03,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.25 }}
                className="w-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.button
              type="button"
              onClick={
                onProjectsPage ? handleBackToHome : handleViewAllProjects
              }
              className="inline-flex items-center space-x-3 px-8 py-4 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-900 transition-all duration-500 text-lg cursor-pointer relative overflow-hidden group"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(147, 51, 234, 0.8)",
                boxShadow: "0 0 30px rgba(147, 51, 234, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Button Content */}
              <span className="relative z-10">
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
