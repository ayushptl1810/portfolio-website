import { EASE_INOUT } from "../utils/motion";

// Transition configuration for different page types
export const TRANSITION_TYPES = {
  HOME: {
    label: "Home",
    duration: 0.55,
    ease: EASE_INOUT,
  },
  PROJECTS: {
    label: "Projects",
    duration: 0.55,
    ease: EASE_INOUT,
  },
  ABOUT: {
    label: "About Me",
    duration: 0.55,
    ease: EASE_INOUT,
  },
  CONTACT: {
    label: "Contact Me",
    duration: 0.55,
    ease: EASE_INOUT,
  },
};

// Get transition config for a given path
export const getTransitionConfig = (path) => {
  if (path === "/" || path === "") return TRANSITION_TYPES.HOME;
  if (path === "/projects") return TRANSITION_TYPES.PROJECTS;
  if (path === "/about") return TRANSITION_TYPES.ABOUT;
  if (path === "/contact") return TRANSITION_TYPES.CONTACT;

  // Handle project detail pages
  if (path.startsWith("/projects/")) {
    return {
      label: "Project",
      duration: 0.55,
      ease: EASE_INOUT,
    };
  }

  // Default fallback
  return {
    label: "Loading...",
    duration: 0.55,
    ease: EASE_INOUT,
  };
};

// Animation timing constants
export const ANIMATION_TIMING = {
  OUTGOING_DURATION: 0.55,
  INCOMING_DURATION: 0.85,
  LABEL_FADE_DURATION: 0.25,
  HOLD_DURATION: 100, // ms
  EASING: EASE_INOUT,
};
