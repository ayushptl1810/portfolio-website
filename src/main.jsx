import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { preloadCriticalAssets } from "./utils/preloadAssets";

// Start warming up assets immediately
preloadCriticalAssets();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
