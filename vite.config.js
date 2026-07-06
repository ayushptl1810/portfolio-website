import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.riv"],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // Spline's runtime (three-vendor + its internal physics/navmesh/boolean/
    // gaussian-splat/opentype chunks) is dynamically imported and deferred
    // until after first paint (see WebLayout.jsx) — don't let Vite eagerly
    // <link rel="modulepreload"> it on every /web/* page load regardless.
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter(
          (dep) =>
            !/three-vendor|physics|navmesh|boolean|gaussian-splat|opentype/.test(
              dep
            )
        ),
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "animation-vendor": ["framer-motion", "@rive-app/react-canvas"],
          "three-vendor": ["@splinetool/react-spline"],
        },
      },
    },
  },
});
