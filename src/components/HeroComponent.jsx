import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { Suspense } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";

function RiveAnimation() {
  const { RiveComponent } = useRive({
    src: "/src/assets/birb.riv",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  return (
    <div className="w-full h-full flex items-center justify-center p-16">
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
            <span className="text-6xl mr-4">👋</span>
            <h1 className="text-6xl font-bold">I'm Ayush</h1>
          </div>

          {/* Professional Role with Gradient */}
          <div className="mb-8">
            <h2 className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Full Stack Developer
            </h2>
          </div>

          {/* Welcome Message */}
          <p className="text-2xl text-gray-300 mb-3">
            Welcome to my digital playground!
          </p>
          <p className="text-xl text-gray-400 mb-10">Based in Mumbai, India.</p>

          {/* Connect Section */}
          <div className="flex items-center space-x-8">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="/src/assets/Resume.pdf"
              download="Ayush_Patel_Resume.pdf"
              className="flex items-center space-x-3 px-8 py-4 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-900 transition-colors duration-300 text-lg cursor-pointer"
            >
              <FaDownload className="w-7 h-7" />
              <span>Download Resume</span>
            </motion.a>

            {/* Social Icons */}
            <div className="flex space-x-5">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://github.com/ayushptl1810"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 transition-colors duration-300"
              >
                <FaGithub className="w-8 h-8" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://www.linkedin.com/in/ayushptl1810/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 transition-colors duration-300"
              >
                <FaLinkedin className="w-8 h-8" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="mailto:ayushptl1810@gmail.com"
                className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 transition-colors duration-300"
              >
                <FaEnvelope className="w-8 h-8" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Rive Animation Right Side */}
        <motion.div
          className="w-1/2 h-screen relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Spotlight Effect */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>

          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center text-white">
                Loading animation...
              </div>
            }
          >
            <RiveAnimation />
          </Suspense>
        </motion.div>
      </div>
    </>
  );
}

export default HeroComponent;
