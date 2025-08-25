import { motion } from "framer-motion";
import technologies from "../utils/TechnologyList";

function TechnologiesComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      className="w-full h-screen px-8 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Current technologies
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I'm proficient in a range of modern technologies that empower me to
            build highly functional solutions. These are some of my main
            technologies.
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.03,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.25 }}
                className="bg-zinc-950/70 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl hover:border-white/20 relative group"
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(147, 51, 234, 0.5)",
                  boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.25)",
                }}
              >
                <div className="flex items-stretch space-x-4">
                  <motion.div
                    className={`${tech.bgColor} p-2 rounded-lg flex-shrink-0 flex items-center justify-center w-16 h-16`}
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className={`${tech.iconColor} text-3xl`}>
                      <IconComponent />
                    </div>
                  </motion.div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {tech.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{tech.description}</p>
                  </div>
                </div>

                {/* Floating Particles on Hover */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
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
