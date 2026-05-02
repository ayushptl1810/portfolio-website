import React, { useRef } from "react";
import { usePageSEO } from "../../hooks/usePageSEO";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../utils/gsapConfig";
import ProjectCard from "./ProjectCard";
import IncomingTransition from "../../transitions/IncomingTransition";

function ProjectComponent({ ids, projectList = [], theme = "default" }) {
  const isEmerald = theme === "emerald";
  const location = useLocation();
  const navigate = useNavigate();
  const onProjectsPage = location.pathname.includes("/projects");
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const headerRef = useRef(null);

  const dataset =
    !Array.isArray(ids) || ids.length === 0
      ? projectList
      : projectList.filter((p) => ids.includes(p.id));

  usePageSEO(
    onProjectsPage ? "My Projects" : null,
    onProjectsPage ? "A comprehensive list of web and AI projects developed by Ayush Patel, featuring full-stack applications and intelligent systems." : null
  );

  React.useEffect(() => {
    const fromTransition = location.state?.fromTransition;
    if (fromTransition) {
      window.scrollTo({ top: 0, behavior: "auto" });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useGSAP(() => {
    // Optimized Header reveal - no scrub to prevent jitter
    gsap.from(headerRef.current, {
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 95%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "power2.out"
    });

    // Convergence reveal: Project cards fly in from sides
    const cards = gridRef.current.querySelectorAll(".project-card-wrapper");
    cards.forEach((card, index) => {
      const isLeftColumn = index % 2 === 0;
      
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
        x: isLeftColumn ? -120 : 120,
        y: 80,
        opacity: 0,
        scale: 0.9,
        rotateY: isLeftColumn ? 10 : -10,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all"
      });
    });
  }, { scope: containerRef });

  const basePath = location.pathname.startsWith("/ai") ? "/ai" : "/web";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewAllProjects = () => {
    if (onProjectsPage) {
      scrollToTop();
    } else {
      if (window.triggerPageTransition) {
        window.triggerPageTransition(`${basePath}/projects`);
      } else {
        navigate(`${basePath}/projects`, {
          state: { fromTransition: true, label: "Projects" },
        });
      }
    }
  };

  const handleBackToHome = () => {
    if (window.triggerPageTransition) {
      window.triggerPageTransition(basePath);
    } else {
      navigate(basePath);
    }
  };

  return (
    <>
      <IncomingTransition />
      <div 
        ref={containerRef}
        className="w-full min-h-screen px-4 sm:px-5 md:px-6 py-8 md:py-10 perspective-1000 overflow-x-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <div
            ref={headerRef}
            className="mb-6 md:mb-8 text-center"
          >
            {onProjectsPage ? (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center font-display">
                My Projects
              </h1>
            ) : (
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center font-display">
                My Projects
              </h2>
            )}

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-12 text-center max-w-3xl mx-auto font-body">
              Here are some of the projects I've built. Each one represents a
              unique challenge and learning experience.
            </p>
          </div>

          <div 
            ref={gridRef}
            className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2 place-items-center"
          >
            {dataset.map((project, idx) => (
              <div
                key={project.id}
                className="project-card-wrapper w-full"
              >
                <ProjectCard project={project} theme={theme} />
              </div>
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
                scale: 1.05,
                rotateZ: 0.5,
                borderColor: isEmerald
                  ? "rgba(16, 185, 129, 0.7)"
                  : "rgba(147, 51, 234, 0.7)",
                boxShadow: isEmerald
                  ? "0 0 30px rgba(16, 185, 129, 0.3)"
                  : "0 0 30px rgba(147, 51, 234, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${
                  isEmerald
                    ? "from-emerald-500/20 to-cyan-500/20"
                    : "from-purple-500/20 to-blue-500/20"
                } rounded-full`}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />

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
