import "./App.css";
import HeroComponent from "./components/heroComponent";
import TechnologiesComponent from "./components/TechnologiesComponent";
import DarkVeil from "./components/DarkVeil";

function App() {
  return (
    <>
      <div className="w-full relative">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <DarkVeil />
        </div>
        <div className="relative z-10">
          <HeroComponent />
          <TechnologiesComponent />
          {/* Future components will go here */}
        </div>
      </div>
    </>
  );
}

export default App;
