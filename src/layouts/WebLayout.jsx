import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DarkVeil from "../components/shared/DarkVeil";
import FluidMenu from "../components/shared/FluidMenu";
import ParticleSystem from "../components/shared/ParticleSystem.jsx";
import Footer from "../components/shared/Footer";
import StructuredData from "../components/shared/StructuredData";
import { useScrollToTop } from "../hooks/useScrollToTop";

function WebLayout() {
  useScrollToTop();
  const { pathname } = useLocation();

  // On client-side route change, move focus to the main landmark so screen
  // readers announce the new page and keyboard users land at its start.
  // Delayed so the page-transition curtain finishes first.
  useEffect(() => {
    const id = setTimeout(() => {
      document
        .getElementById("app-content")
        ?.focus({ preventScroll: true });
    }, 900);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <div className="w-full relative min-h-screen">
      <a
        href="#app-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:bg-white focus:text-black focus:font-ui"
      >
        Skip to main content
      </a>
      <StructuredData />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-900/20" />
        <DarkVeil />
        <ParticleSystem />
      </div>

      <main
        id="app-content"
        tabIndex={-1}
        className="relative z-10 outline-none"
      >
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer theme="purple" basePath="" />
      </div>

      <div id="app-menu">
        <FluidMenu basePath="" />
      </div>
    </div>
  );
}

export default WebLayout;
