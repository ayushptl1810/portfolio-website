import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { Suspense } from "react";
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
  return (
    <>
      <div className="w-full h-screen flex overflow-hidden">
        {/* Text Content Left Side */}
        <motion.div
          className="w-1/2 flex flex-col items-start justify-center pl-20 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Greeting */}
          <div className="flex items-center mb-6">
            <h1 className="text-5xl font-bold font-display">Hey! I'm Ayush</h1>
          </div>

          {/* Professional Role with Gradient */}
          <div className="mb-8">
            <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-display">
              Full Stack Developer
            </h2>
          </div>

          {/* Welcome Message */}
          <p className="text-2xl text-gray-300 mb-3 font-body">
            Welcome to my sanctuary!
          </p>
          <p className="text-xl text-gray-400 mb-10 font-body">
            Based in Mumbai, India.
          </p>

          {/* Connect Section */}
          <div className="flex items-center space-x-8">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={resumePdf}
              download="Ayush_Patel_Resume.pdf"
              className="flex items-center space-x-3 px-8 py-4 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-900 transition-colors duration-300 text-lg cursor-pointer"
            >
              <FaDownload className="w-7 h-7" />
              <span className="font-ui">Download Resume</span>
            </motion.a>

            {/* Social Icons */}
            <div className="flex space-x-5">
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
                className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 cursor-pointer"
              >
                <FaGithub className="w-8 h-8" />
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
                className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 cursor-pointer"
              >
                <FaLinkedin className="w-8 h-8" />
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
                className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 cursor-pointer"
              >
                <FaEnvelope className="w-8 h-8" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Rive Animation Right Side */}
        <motion.div
          className="w-1/2 h-screen relative flex items-center justify-center"
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
                scale: [1.5, 1.52, 1.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <RiveAnimation />
            </motion.div>
          </Suspense>
        </motion.div>
      </div>
    </>
  );
}

export default HeroComponent;
