import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { Suspense, useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import birbRiv from "../assets/birb.riv";
import resumePdf from "../assets/Resume.pdf";

function RiveAnimation() {
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
}

function HeroComponent() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.("change", update);
    return () => mediaQuery.removeEventListener?.("change", update);
  }, []);

  return (
    <>
      <div className="w-full py-14 md:min-h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Text Content Left Side */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-start justify-center px-6 md:pl-20 text-white py-12 md:py-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Greeting */}
          <div className="flex items-center mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display">
              Hey! I'm Ayush
            </h1>
          </div>

          {/* Professional Role with Gradient */}
          <div className="mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-tight font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-display">
              Full Stack Developer
            </h2>
          </div>

          {/* Welcome Message */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-3 font-body">
            Welcome to my sanctuary!
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
              className="flex items-center space-x-3 px-6 py-3 md:px-8 md:py-4 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-900 transition-colors duration-300 text-base md:text-lg cursor-pointer"
            >
              <FaDownload className="w-6 h-6 md:w-7 md:h-7" />
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
                  ease: "easeInOut",
                  rotate: { duration: 0.6, ease: "easeInOut" },
                }}
                href="https://github.com/ayushptl1810"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-16 md:h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 cursor-pointer"
              >
                <FaGithub className="w-6 h-6 md:w-8 md:h-8" />
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
                  ease: "easeInOut",
                  rotate: { duration: 0.6, ease: "easeInOut" },
                }}
                href="https://www.linkedin.com/in/ayushptl1810/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-16 md:h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 cursor-pointer"
              >
                <FaLinkedin className="w-6 h-6 md:w-8 md:h-8" />
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
                  ease: "easeInOut",
                  rotate: { duration: 0.6, ease: "easeInOut" },
                }}
                href="mailto:ayushptl1810@gmail.com"
                className="w-12 h-12 md:w-16 md:h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 cursor-pointer"
              >
                <FaEnvelope className="w-6 h-6 md:w-8 md:h-8" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Rive Animation Right Side */}
        {!reducedMotion && (
          <motion.div
            className="hidden md:flex md:w-1/2 h-[60vh] md:h-screen relative items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-white">
                  Loading animation...
                </div>
              }
            >
              <motion.div
                animate={{
                  scale: [1.25, 1.28, 1.25],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  <RiveAnimation />
                </div>
              </motion.div>
            </Suspense>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default HeroComponent;
