import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTransitionManager from "./transitions/PageTransitionManager";

// Layouts
const WebLayout = lazy(() => import("./layouts/WebLayout"));

// Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const ProjectComponent = lazy(
  () => import("./components/projects/ProjectComponent"),
);
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

import { MixedProjectList } from "./utils/ProjectList";

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
      import("./components/projects/ProjectComponent");
      import("./pages/ProjectDetail");
      import("./pages/Home");

      // Prefetch 3D Asset Files
      const assets = ["/src/assets/birb.riv"];

      assets.forEach((url) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = url;
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
            <Route path="/" element={<WebLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route
                path="projects"
                element={<ProjectComponent projectList={MixedProjectList} />}
              />
              <Route path="projects/:projectName" element={<ProjectDetail />} />
            </Route>
          </Routes>
        </Suspense>
      </PageTransitionManager>
    </BrowserRouter>
  );
}

export default App;
