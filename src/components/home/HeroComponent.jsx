import { Suspense, useEffect, useState, lazy, useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../utils/gsapConfig";
import { GSAP_EASE_OUT, GSAP_EASE_INOUT, EASE_INOUT } from "../../utils/motion";
import birbRiv from "../../assets/birb.riv";
import resumePdf from "../../assets/Resume.pdf";

const Rive = lazy(async () => {
  const riveModule = await import("@rive-app/react-canvas");
  const { useRive, Layout, Fit, Alignment } = riveModule;

  return {
    default: () => {
      const { RiveComponent } = useRive({
        src: birbRiv,
        layout: new Layout({
          fit: Fit.Cover,
          alignment: Alignment.Center,
        }),
        autoplay: true,
      });
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-96 h-96">
            <RiveComponent className="w-full h-full" />
          </div>
        </div>
      );
    },
  };
});

function HeroComponent() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.("change", update);
    return () => mediaQuery.removeEventListener?.("change", update);
  }, []);

  useGSAP(
    () => {
      if (reducedMotion) return;

      // 1. Initial Entry Animation (Staggered)
      const tlIn = gsap.timeline({
        delay: 0.5, // Wait for transition curtain
      });

      tlIn.from(leftContentRef.current.children, {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: GSAP_EASE_OUT,
      });

      tlIn.from(
        rightContentRef.current,
        {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: GSAP_EASE_OUT,
        },
        0.2,
      ); // Start slightly after text begins

      // If the user scrolls before the entry finishes, snap it to the end so
      // it doesn't fight the scrub timeline for the same props.
      const finishEntryOnScroll = () => {
        if (tlIn.isActive()) tlIn.progress(1);
      };
      window.addEventListener("scroll", finishEntryOnScroll, {
        once: true,
        passive: true,
      });

      // 2. Floating Rive Animation
      gsap.to(rightContentRef.current, {
        y: 15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Scroll Exit Animation (Keep existing logic)
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      tlScroll.to(
        leftContentRef.current,
        {
          y: -100,
          opacity: 0,
          ease: GSAP_EASE_INOUT,
        },
        0,
      );

      tlScroll.to(
        rightContentRef.current,
        {
          y: -50,
          scale: 0.8,
          opacity: 0,
          ease: GSAP_EASE_INOUT,
        },
        0,
      );

      return () => {
        window.removeEventListener("scroll", finishEntryOnScroll);
      };
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  return (
    <>
      <div
        ref={containerRef}
        className="w-full py-20 md:py-0 md:min-h-screen flex flex-col md:flex-row overflow-hidden relative"
      >
        {/* Text Content Left Side */}
        <motion.div
          ref={leftContentRef}
          className="w-full md:w-1/2 flex flex-col items-start justify-center px-6 md:pl-20 text-white py-12 md:py-0 relative z-10"
        >
          {/* Greeting */}
          <div className="flex items-center mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display">
              Hey! I'm Ayush
            </h1>
          </div>

          {/* Professional Role with Gradient */}
          <div className="mb-8">
            <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-display">
              Full-Stack Developer &amp; AI Engineer
            </p>
          </div>

          {/* Welcome Message */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-3 font-body">
            Welcome to My Sanctuary!
          </p>
          <p className="text-base sm:text-xl text-gray-400 mb-10 font-body">
            Based in Mumbai, India.
          </p>

          {/* Connect Section */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={resumePdf}
              download="Ayush_Patel_Resume.pdf"
              aria-label="Download résumé (PDF)"
              className="flex items-center space-x-3 px-6 py-3 md:px-8 md:py-4 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-900 transition-colors duration-300 text-base md:text-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <FaDownload aria-hidden="true" className="w-6 h-6 md:w-7 md:h-7" />
              <span className="font-ui">Download Resume</span>
            </motion.a>

            {/* Social Icons */}
            <div className="flex space-x-3 md:space-x-5">
              <motion.a
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  borderColor: "rgba(147, 51, 234, 0.8)",
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)",
                }}
                animate={{ rotate: 0 }}
                transition={{
                  duration: 0.6,
                  ease: EASE_INOUT,
                  rotate: { duration: 0.6, ease: EASE_INOUT },
                }}
                href="https://github.com/ayushptl1810"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-12 h-12 md:w-16 md:h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <FaGithub aria-hidden="true" className="w-6 h-6 md:w-8 md:h-8" />
              </motion.a>
              <motion.a
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  borderColor: "rgba(59, 130, 246, 0.8)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
                }}
                animate={{ rotate: 0 }}
                transition={{
                  duration: 0.6,
                  ease: EASE_INOUT,
                  rotate: { duration: 0.6, ease: EASE_INOUT },
                }}
                href="https://www.linkedin.com/in/ayushptl1810/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-12 h-12 md:w-16 md:h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <FaLinkedin aria-hidden="true" className="w-6 h-6 md:w-8 md:h-8" />
              </motion.a>
              <motion.a
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  borderColor: "rgba(147, 51, 234, 0.8)",
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)",
                }}
                animate={{ rotate: 0 }}
                transition={{
                  duration: 0.6,
                  ease: EASE_INOUT,
                  rotate: { duration: 0.6, ease: EASE_INOUT },
                }}
                href="mailto:ayushptl1810@gmail.com"
                aria-label="Email Ayush"
                className="w-12 h-12 md:w-16 md:h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <FaEnvelope aria-hidden="true" className="w-6 h-6 md:w-8 md:h-8" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Rive Animation Right Side */}
        {!reducedMotion && (
          <motion.div
            ref={rightContentRef}
            className="hidden md:flex md:w-1/2 h-[60vh] md:h-screen relative items-center justify-center z-0"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-white">
                  Loading animation...
                </div>
              }
            >
              {/* Static scale-up. The gentle float is owned solely by the
                  GSAP `y` yoyo above so transforms don't compound. */}
              <div style={{ transform: "scale(1.25)" }}>
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  <Rive />
                </div>
              </div>
            </Suspense>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default HeroComponent;
