import React, { useRef } from "react";
import { usePageSEO } from "../../hooks/usePageSEO";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../utils/gsapConfig";
import ProjectCard from "./ProjectCard";
import IncomingTransition from "../../transitions/IncomingTransition";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "ai", label: "AI/ML" },
];

// Spring, not duration+easing — a fixed-duration tween always looks the
// same regardless of how it's interrupted, which is what reads as
// "mechanical." A spring is driven by physical velocity: it can be
// interrupted and redirected mid-flight and still look continuous, which
// is what actually reads as fluid/effortless rather than choreographed.
const GRID_SPRING = { type: "spring", stiffness: 260, damping: 26, mass: 0.9 };

function ProjectComponent({ ids, projectList = [], theme = "default" }) {
  const isEmerald = theme === "emerald";
  const location = useLocation();
  const navigate = useNavigate();
  const onProjectsPage = location.pathname.includes("/projects");
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const headerRef = useRef(null);
  const [activeFilter, setActiveFilter] = React.useState("all");

  const baseDataset =
    !Array.isArray(ids) || ids.length === 0 ?
      projectList
    : projectList.filter((p) => ids.includes(p.id));

  // Filtering only applies to the full /projects listing — the homepage
  // teaser always shows its curated featured set as-is.
  const dataset =
    onProjectsPage && activeFilter !== "all" ?
      baseDataset.filter((p) => p.categories?.includes(activeFilter))
    : baseDataset;

  usePageSEO(
    onProjectsPage ? "My Projects" : null,
    onProjectsPage ?
      "A comprehensive list of web and AI projects developed by Ayush Patel, featuring full-stack applications and intelligent systems."
    : null,
  );

  React.useEffect(() => {
    const fromTransition = location.state?.fromTransition;
    if (fromTransition) {
      window.scrollTo({ top: 0, behavior: "auto" });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Header reveal only ever needs to run once, on mount.
  useGSAP(
    () => {
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
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  // Scroll-into-view reveal for the cards present at mount only — it does
  // not re-run on filter changes. Filter-driven enter/exit/reflow is owned
  // entirely by Framer Motion's layout animation below (spring-based), so
  // GSAP never touches a card after mount and the two systems can't fight
  // over the same transform/opacity.
  useGSAP(
    () => {
      const cards = gridRef.current.querySelectorAll(".project-card-wrapper");
      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: containerRef },
  );

  const handleFilterClick = (key) => {
    setActiveFilter(key);
  };

  const basePath = "";

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
        <div className="max-w-7xl mx-auto">
          <div ref={headerRef} className="mb-10 md:mb-14 text-center">
            {onProjectsPage ?
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center font-display">
                My Projects
              </h1>
            : <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center font-display">
                My Projects
              </h2>
            }

            <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto font-body">
              Here are some of the projects I've built. Each one represents a
              unique challenge and learning experience.
            </p>

            {onProjectsPage && (
              <div className="flex items-center justify-center gap-2.5 mt-6 font-ui text-sm sm:text-base">
                {FILTERS.map((f, i) => {
                  const isActive = activeFilter === f.key;
                  return (
                    <React.Fragment key={f.key}>
                      {i > 0 && <span className="text-gray-700">·</span>}
                      <button
                        type="button"
                        onClick={() => handleFilterClick(f.key)}
                        className={`relative pb-1 transition-colors duration-200 cursor-pointer ${
                          isActive ? "text-white" : (
                            "text-gray-500 hover:text-gray-300"
                          )
                        }`}
                      >
                        {f.label}
                        {isActive && (
                          <motion.span
                            layoutId="project-filter-underline"
                            className="absolute left-0 right-0 -bottom-0.5 h-px bg-white"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>

          <div
            ref={gridRef}
            className="relative grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {dataset.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={GRID_SPRING}
                  className="project-card-wrapper w-full"
                >
                  <ProjectCard project={project} theme={theme} />
                </motion.div>
              ))}
            </AnimatePresence>
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
                borderColor:
                  isEmerald ?
                    "rgba(16, 185, 129, 0.7)"
                  : "rgba(147, 51, 234, 0.7)",
                boxShadow:
                  isEmerald ?
                    "0 0 30px rgba(16, 185, 129, 0.3)"
                  : "0 0 30px rgba(147, 51, 234, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${
                  isEmerald ?
                    "from-emerald-500/20 to-cyan-500/20"
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
