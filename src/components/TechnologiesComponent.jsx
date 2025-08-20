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
                  delay: index * 0.03,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 shadow-lg hover:shadow-xl hover:border-white/20"
              >
                <div className="flex items-stretch space-x-4">
                  <div
                    className={`${tech.bgColor} p-2 rounded-lg flex-shrink-0 flex items-center justify-center w-16 h-16`}
                  >
                    <div className={`${tech.iconColor} text-3xl`}>
                      <IconComponent />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {tech.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{tech.description}</p>
                  </div>
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
