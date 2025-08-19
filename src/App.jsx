import "./App.css";
import DarkVeil from "./components/DarkVeil";
import Spline from "@splinetool/react-spline";
import ProjectComponent from "./components/ProjectComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FluidMenu from "./components/FluidMenu";
import PageTransitionManager from "./transitions/PageTransitionManager";

function App() {
  return (
    <BrowserRouter>
      <PageTransitionManager>
        <div className="w-full relative">
          <div className="fixed inset-0 z-0 pointer-events-none">
            <DarkVeil />
          </div>
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectComponent />} />
            </Routes>
          </div>
          {/* 3D Model - Clean, simple positioning */}
          <div className="fixed bottom-0 left-0 z-50 pointer-events-none translate-x-[-10rem] translate-y-[10rem] md:translate-x-[-24.5rem] md:translate-y-[40rem] overflow-visible">
            <div className="w-[32rem] h-[48rem] origin-bottom-left scale-[1.35] md:scale-[1.75]">
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
          <FluidMenu />
        </div>
      </PageTransitionManager>
    </BrowserRouter>
  );
}

export default App;
