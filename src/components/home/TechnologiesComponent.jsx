import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../utils/gsapConfig";

function TechnologiesComponent({ technologies = [], theme = "default" }) {
  const isEmerald = theme === "emerald";
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    const cards = gridRef.current.querySelectorAll(".tech-card");
    
    // Convergence reveal: cards fly in from sides + bottom
    cards.forEach((card, index) => {
      const isLeft = (index % 4) < 2; // Split for staggered entry
      
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          toggleActions: "play none none reverse", // One-time smooth trigger
        },
        x: isLeft ? -80 : 80,
        y: 60,
        rotateY: isLeft ? 15 : -15,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all"
      });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="w-full py-12 md:py-20 px-4 sm:px-6 md:px-8 perspective-1000 overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center font-display">
            Technologies I Work With
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-12 text-center max-w-3xl mx-auto font-body">
            A comprehensive overview of the tools, languages, and frameworks I
            use to bring ideas to life.
          </p>
        </div>

        {/* Technologies Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={index}
                className="tech-card bg-zinc-950/70 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-white/10 shadow-lg hover:shadow-xl hover:border-white/20 relative group overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  rotateZ: 1,
                  borderColor: isEmerald
                    ? "rgba(16, 185, 129, 0.5)"
                    : "rgba(147, 51, 234, 0.5)",
                  boxShadow: isEmerald
                    ? "0 25px 50px -12px rgba(16, 185, 129, 0.4)"
                    : "0 25px 50px -12px rgba(147, 51, 234, 0.4)",
                }}
              >
                <div className="flex items-stretch space-x-2 sm:space-x-3 md:space-x-4">
                  <motion.div
                    className={`${tech.bgColor} p-1.5 sm:p-2 rounded-lg flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14`}
                    animate={{ y: [0, -3, 0], rotate: [0, 3, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      className={`${tech.iconColor} text-lg sm:text-xl md:text-2xl`}
                    >
                      <IconComponent />
                    </div>
                  </motion.div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg mb-1 font-ui">
                      {tech.name}
                    </h3>
                    <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm font-body">
                      {tech.description}
                    </p>
                  </div>
                </div>

                {/* Animated Gradient Border on Hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${isEmerald ? 'from-emerald-500 to-cyan-500' : 'from-purple-500 to-blue-500'} pointer-events-none`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TechnologiesComponent;
