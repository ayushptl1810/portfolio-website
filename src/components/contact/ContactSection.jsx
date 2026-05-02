import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../utils/gsapConfig";
import { FaEnvelope, FaLinkedin, FaGithub, FaArrowRight } from "react-icons/fa";

function ContactSection({ theme = "default" }) {
  const isEmerald = theme === "emerald";
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const handleContactClick = () => {
    const isAiPage = window.location.pathname.startsWith("/ai");
    const contactPath = isAiPage ? "/ai/contact" : "/web/contact";

    if (window.triggerPageTransition) {
      window.triggerPageTransition(contactPath);
    } else {
      window.location.href = contactPath;
    }
  };

  useGSAP(() => {
    gsap.from(contentRef.current.children, {
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      scale: 0.9,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      clearProps: "all"
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div 
          ref={contentRef}
          className="text-center"
        >
          {/* Main heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center font-display">
            Get In Touch
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-12 text-center max-w-3xl mx-auto font-body">
            Ready to collaborate? Let's discuss your next project or just have a
            chat about technology.
          </p>

          {/* CTA Button */}
          <div className="mb-12 md:mb-16">
            <motion.button
              onClick={handleContactClick}
              className={`group relative px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r ${
                isEmerald ?
                  "from-emerald-600 to-cyan-600"
                : "from-purple-600 to-blue-600"
              } rounded-2xl text-white text-lg md:text-xl font-semibold overflow-hidden shadow-2xl ${
                isEmerald ?
                  "hover:shadow-emerald-500/25"
                : "hover:shadow-purple-500/25"
              } transition-all duration-300 cursor-pointer`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  isEmerald ?
                    "from-emerald-600 to-cyan-600"
                  : "from-purple-600 to-blue-600"
                } rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative flex items-center space-x-3">
                <span className="font-ui">Start a Conversation</span>
                <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${
                  isEmerald ?
                    "from-emerald-400 to-cyan-400"
                  : "from-purple-400 to-blue-400"
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}
              />
            </motion.button>
          </div>

          {/* Quick contact options */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-gray-400">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
