import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTransitionManager from "./transitions/PageTransitionManager";

// Layouts
const WebLayout = lazy(() => import("./layouts/WebLayout"));
const AILayout = lazy(() => import("./layouts/AILayout"));

// Pages
const Gateway = lazy(() => import("./pages/Gateway"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const ProjectComponent = lazy(
  () => import("./components/projects/ProjectComponent"),
);
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const AIHome = lazy(() => import("./pages/AIHome"));

import { WebProjectList, AIProjectList } from "./utils/ProjectList";

/**
 * BackgroundPrefetcher - Quietly imports other routes after initial load
 * to ensure "load rest in background" behavior.
 */
const BackgroundPrefetcher = () => {
  useEffect(() => {
    // Delay prefetching to prioritize initial page interactivity
    const timer = setTimeout(() => {
      // Prefetch Page Chunks
      import("./pages/About");
      import("./pages/Contact");
      import("./components/projects/ProjectComponent");
      import("./pages/ProjectDetail");
      import("./pages/Home");
      import("./pages/AIHome");

      // Prefetch 3D Asset Files
      const assets = [
        "https://prod.spline.design/AqJ4j3ogsligEDfj/scene.splinecode",
        "https://prod.spline.design/Gk679KS3f4vvT-Vv/scene.splinecode",
        "/src/assets/birb.riv",
        "/src/assets/chainless_rocket.riv",
      ];

      assets.forEach((url) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = url;
        // Use 'as: fetch' for Spline files to help the browser understand the type
        if (url.endsWith(".splinecode")) link.as = "fetch";
        document.head.appendChild(link);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return null;
};

const LoadingFallback = () => (
  <div className="w-full h-screen bg-black flex items-center justify-center text-white font-display">
    <div className="text-xl animate-pulse uppercase tracking-widest italic opacity-50">
      Loading Sanctuary...
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <PageTransitionManager>
        <Suspense fallback={<LoadingFallback />}>
          <BackgroundPrefetcher />
          <Routes>
            {/* Entry Point */}
            <Route path="/" element={<Gateway />} />

            {/* Web Persona Routes */}
            <Route path="/web" element={<WebLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route
                path="projects"
                element={<ProjectComponent projectList={WebProjectList} />}
              />
              <Route path="projects/:projectName" element={<ProjectDetail />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* AI Persona Routes */}
            <Route path="/ai" element={<AILayout />}>
              <Route index element={<AIHome />} />
              {/* Reusing these for now, or creating specific AI versions later */}
              <Route
                path="projects"
                element={<ProjectComponent projectList={AIProjectList} />}
              />
              <Route path="projects/:projectName" element={<ProjectDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </Suspense>
      </PageTransitionManager>
    </BrowserRouter>
  );
}

export default App;
