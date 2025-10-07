import { motion } from "framer-motion";
import technologies from "../utils/TechnologyList";

function TechnologiesComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      className="w-full py-12 md:py-20 px-4 sm:px-6 md:px-8"
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                  delay: index * 0.03,
                }}
                className="bg-zinc-950/70 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-white/10 shadow-lg hover:shadow-xl hover:border-white/20 relative group"
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(147, 51, 234, 0.5)",
                  boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.25)",
                }}
              >
                <div className="flex items-stretch space-x-2 sm:space-x-3 md:space-x-4">
                  <motion.div
                    className={`${tech.bgColor} p-1.5 sm:p-2 rounded-lg flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14`}
                    animate={{ y: [0, -4, 0] }}
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

                {/* Floating Particles on Hover (disabled on mobile) */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none hidden md:block">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400/60 rounded-full"
                      initial={{
                        x: Math.random() * 200,
                        y: Math.random() * 100,
                        opacity: 0,
                      }}
                      animate={{
                        x: Math.random() * 200,
                        y: Math.random() * 100,
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 3.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default TechnologiesComponent;
