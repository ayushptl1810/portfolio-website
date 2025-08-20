import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

function TransmitButton({
  onCommit,
  label = "HOLD TO TRANSMIT",
  disabled = false,
  onHoldStart,
  onHoldEnd,
  onProgress,
}) {
  const progress = useMotionValue(0);
  const strokeDash = useTransform(progress, [0, 1], [314, 0]); // 2πr ≈ 314 for r=50
  const auraOpacity = useTransform(progress, [0, 1], [0.2, 1]);
  const pulseScale = useTransform(progress, [0, 1], [0.9, 1.6]);
  const pulseOpacity = useTransform(progress, [0, 1], [0.25, 0.95]);
  const ringWidth = useTransform(progress, [0, 1], [4, 9]);
  const [holding, setHolding] = React.useState(false);
  const controllerRef = React.useRef(null);

  const HOLD_DURATION = 1.6;
  const HOLD_DURATION_END = 1.2;
  const HOLD_EASE = "easeInOut";

  React.useEffect(() => {
    const unsub = progress.on("change", (v) => onProgress?.(v));
    return () => unsub();
  }, [progress, onProgress]);

  const startHold = () => {
    if (disabled || holding) return;
    setHolding(true);
    onHoldStart?.();
    progress.set(0);
    controllerRef.current = animate(progress, 1, {
      duration: HOLD_DURATION,
      ease: HOLD_EASE,
      onComplete: () => {
        onCommit?.();
        setHolding(false);
        onHoldEnd?.();
        animate(progress, 0, { duration: HOLD_DURATION, ease: HOLD_EASE });
      },
    });
  };

  const cancelHold = () => {
    if (!holding) return;
    setHolding(false);
    onHoldEnd?.();
    controllerRef.current?.stop();
    animate(progress, 0, { duration: HOLD_DURATION_END, ease: HOLD_EASE });
  };

  return (
    <motion.button
      type="button"
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={holding ? cancelHold : undefined}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className={`relative w-40 h-40 rounded-full border backdrop-blur-md text-white overflow-hidden ${
        disabled
          ? "bg-white/5 border-white/10 opacity-50 cursor-not-allowed"
          : "bg-white/5 border-white/15"
      }`}
      aria-label="Hold to transmit"
      aria-disabled={disabled}
    >
      {/* Energy aura */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl pointer-events-none"
        style={{
          opacity: auraOpacity,
          background:
            "radial-gradient(55% 55% at 50% 50%, rgba(99,102,241,0.55), rgba(147,51,234,0.35) 60%, rgba(59,130,246,0.18) 80%)",
        }}
      />

      {/* Pulsing core */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 22,
          height: 22,
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,1), rgba(255,255,255,0.15))",
          scale: pulseScale,
          opacity: pulseOpacity,
        }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="4"
          fill="none"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="50"
          stroke="white"
          fill="none"
          style={{
            strokeDasharray: 314,
            strokeDashoffset: strokeDash,
            strokeWidth: ringWidth,
          }}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold tracking-widest px-6 text-center">
        {label}
      </span>
    </motion.button>
  );
}

export default TransmitButton;
