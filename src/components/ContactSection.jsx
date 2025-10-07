import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

function ContactSection() {
  const handleContactClick = () => {
    if (window.triggerPageTransition) {
      window.triggerPageTransition("/contact");
    } else {
      // Fallback: direct navigation
      window.location.href = "/contact";
    }
  };

  return (
    <section className="py-16 md:py-24 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          {/* Main heading */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center font-display"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Get In Touch
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-12 text-center max-w-3xl mx-auto font-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Ready to collaborate? Let's discuss your next project or just have a
            chat about technology.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <motion.button
              onClick={handleContactClick}
              className="group relative px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white text-lg md:text-xl font-semibold overflow-hidden shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Button content */}
              <div className="relative flex items-center space-x-3">
                <FaRocket className="w-5 h-5 md:w-6 md:h-6" />
                <span className="font-ui">Open Transmission Room</span>
              </div>

              {/* Button border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
            </motion.button>
          </motion.div>

          {/* Quick contact options */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <span className="text-base sm:text-lg font-body">
              Or reach out directly:
            </span>

            <motion.a
              href="mailto:ayushptl1810@gmail.com"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <FaEnvelope className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-ui">ayushptl1810@gmail.com</span>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/ayushptl1810/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-ui">LinkedIn</span>
            </motion.a>

            <motion.a
              href="https://github.com/ayushptl1810"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-ui">GitHub</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
