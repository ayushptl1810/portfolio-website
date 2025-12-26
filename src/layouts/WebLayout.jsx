import React from "react";
import { Outlet } from "react-router-dom";
import DarkVeil from "../components/shared/DarkVeil";
import Spline from "@splinetool/react-spline";
import FluidMenu from "../components/shared/FluidMenu";
import ParticleSystem from "../components/shared/ParticleSystem.jsx";
import { useScrollToTop } from "../hooks/useScrollToTop";

function WebLayout() {
  useScrollToTop();

  return (
    <div className="w-full relative min-h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-900/20" />
        <DarkVeil />
        <ParticleSystem />
      </div>

      <div className="relative z-10" id="app-content">
        <Outlet />
      </div>

      {/* 3D Model - Web Persona Specific */}
      <div
        id="app-spline"
        className="hidden lg:block fixed bottom-0 left-0 z-50 pointer-events-none translate-x-[-10rem] translate-y-[10rem] lg:translate-x-[-24.5rem] lg:translate-y-[40rem] overflow-visible"
      >
        <div className="w-[32rem] h-[48rem] origin-bottom-left scale-[1.35] lg:scale-[1.75]">
          <Spline
            scene="https://prod.spline.design/Gk679KS3f4vvT-Vv/scene.splinecode"
            className="w-full h-full"
            style={{ background: "transparent" }}
            onLoad={() => {
              // Rely on CSS scale; setZoom is inconsistent across scenes
            }}
          />
        </div>
      </div>

      <div id="app-menu">
        <FluidMenu basePath="/web" />
      </div>
    </div>
  );
}

export default WebLayout;
