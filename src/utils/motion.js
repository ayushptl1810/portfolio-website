/**
 * Shared motion language. Two roles only:
 *
 *  - EASE_OUT   : content arriving (entrances, reveals). The site's signature
 *                 curve — matches the cubic-bezier(.16,1,.3,1) used throughout
 *                 the experience timeline.
 *  - EASE_INOUT : bi-directional motion (hovers, toggles, menu, page curtains).
 *
 * Ambient infinite loops (float, pulse, sheen) intentionally keep framer's
 * "easeInOut" / "linear" — a symmetric curve is correct for looping motion.
 */

// Framer Motion (cubic-bezier array)
export const EASE_OUT = [0.16, 1, 0.3, 1];
export const EASE_INOUT = [0.65, 0, 0.35, 1];

// CSS transitions
export const EASE_OUT_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";
export const EASE_INOUT_CSS = "cubic-bezier(0.65, 0, 0.35, 1)";

// GSAP (nearest built-in equivalents)
export const GSAP_EASE_OUT = "expo.out";
export const GSAP_EASE_INOUT = "power2.inOut";
