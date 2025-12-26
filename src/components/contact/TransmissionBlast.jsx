import React from "react";
import { motion } from "framer-motion";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { createPortal } from "react-dom";

function RocketRive({ src }) {
  const [ready, setReady] = React.useState(false);
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    onLoad: () => {
      // Wait one frame to ensure the first canvas paint is ready before showing to avoid flash
      requestAnimationFrame(() => setReady(true));
    },
  });
  return (
    <div className="w-full h-full relative">
      <div
        className="absolute inset-0"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 180ms ease-out" }}
      >
        <RiveComponent
          className="w-full h-full"
          style={{ background: "transparent" }}
        />
      </div>
    </div>
  );
}

export default function TransmissionBlast({
  active,
  src,
  onDone,
  timing,
  background = "transparent", // "transparent" | "gradient"
  showFlash = false,
  maskEdges = true,
}) {
  const [phase, setPhase] = React.useState("idle"); // idle -> show -> flash -> exit
  const [instanceKey, setInstanceKey] = React.useState(0);
  const defaults = React.useMemo(
    () => ({
      flashDelayMs: 2000,
      exitDelayMs: 3500,
      exitDurationSec: 1.2,
      flashDurationSec: 0.6,
    }),
    []
  );
  const conf = { ...defaults, ...(timing || {}) };

  React.useEffect(() => {
    if (!active) return;
    // Hide app content while blast is active
    const content = document.getElementById("app-content");
    const spline = document.getElementById("app-spline");
    const menu = document.getElementById("app-menu");
    const prevContentVis = content?.style.visibility;
    const prevSplineVis = spline?.style.visibility;
    const prevMenuVis = menu?.style.visibility;
    if (content) content.style.visibility = "hidden";
    if (spline) spline.style.visibility = "hidden";
    if (menu) menu.style.visibility = "hidden";

    setPhase("show");
    const t1 = setTimeout(() => setPhase("flash"), conf.flashDelayMs);
    const t2 = setTimeout(() => setPhase("exit"), conf.exitDelayMs);
    // onDone will be called from onAnimationComplete of the exit stage
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      // Restore visibility
      if (content) content.style.visibility = prevContentVis || "visible";
      if (spline) spline.style.visibility = prevSplineVis || "visible";
      if (menu) menu.style.visibility = prevMenuVis || "visible";
    };
  }, [active, conf.flashDelayMs, conf.exitDelayMs]);

  // When overlay hides, reset phase and bump key to remount Rive next time
  React.useEffect(() => {
    if (!active) {
      setPhase("idle");
      setInstanceKey((k) => k + 1);
    }
  }, [active]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100]"
      style={{
        background:
          background === "gradient"
            ? "radial-gradient(120% 120% at 50% 50%, rgba(124,58,237,1) 0%, rgba(59,130,246,1) 60%, rgba(0,0,0,0.9) 100%)"
            : "transparent",
        visibility: active ? "visible" : "hidden",
        pointerEvents: active ? "auto" : "none",
        opacity: active ? 1 : 0,
        transition: "opacity 350ms ease-out, visibility 0ms linear 350ms",
      }}
      aria-hidden={!active}
    >
      {/* Rocket stage (render only when active so it resets when closed) */}
      {active && (
        <motion.div
          key={instanceKey}
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={
            phase === "exit" ? { scale: 1.4, y: -1000 } : { scale: 1, y: 0 }
          }
          transition={{ duration: conf.exitDurationSec, ease: "easeIn" }}
          onAnimationComplete={() => {
            if (phase === "exit") {
              onDone?.();
              setPhase("idle");
            }
          }}
        >
          <div
            className="w-[360px] h-[360px] md:w-[520px] md:h-[520px] bg-transparent"
            style={
              maskEdges
                ? {
                    WebkitMaskImage:
                      "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
                    maskImage:
                      "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
                  }
                : undefined
            }
          >
            <RocketRive src={src} />
          </div>
        </motion.div>
      )}

      {/* Optional flash */}
      {showFlash && phase === "flash" && (
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full"
          initial={{ opacity: 0.9, scale: 0, x: "-50%", y: "-50%" }}
          animate={{ opacity: 0, scale: 10 }}
          transition={{ duration: conf.flashDurationSec, ease: "easeOut" }}
          style={{
            width: 80,
            height: 80,
            background:
              "radial-gradient(closest-side, rgba(255,255,255,1), rgba(255,255,255,0.1), transparent)",
            boxShadow: "0 0 80px rgba(255,255,255,0.35)",
          }}
        />
      )}
    </div>,
    document.body
  );
}
