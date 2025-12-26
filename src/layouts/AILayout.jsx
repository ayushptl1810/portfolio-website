import React from "react";
import { Outlet } from "react-router-dom";
import FluidMenu from "../components/shared/FluidMenu";
import { useScrollToTop } from "../hooks/useScrollToTop";
import AINeural from "../components/gateway/AINeural";

function AILayout() {
  useScrollToTop();

  return (
    <div className="w-full relative min-h-screen bg-black text-emerald-400 font-mono selection:bg-emerald-500/30">
      {/* Tech Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#020d05]">
        <div className="absolute inset-0 opacity-60">
          <AINeural isActive={true} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-950/80 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <Outlet />
      </div>

      <div id="app-menu">
        {/* Pass basePath so links go to /ai/projects etc */}
        <FluidMenu basePath="/ai" />
      </div>
    </div>
  );
}

export default AILayout;
