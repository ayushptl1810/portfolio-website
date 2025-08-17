import { FaReact, FaVuejs, FaNodeJs, FaGithub } from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiNextdotjs,
  SiFlask,
  SiRedis,
  SiCelery,
  SiFastapi,
} from "react-icons/si";

function TechnologiesComponent() {
  const technologies = [
    {
      name: "MongoDB",
      description: "NoSQL database",
      icon: SiMongodb,
      iconColor: "text-green-400",
      bgColor: "bg-green-900/30",
    },
    {
      name: "React",
      description: "JavaScript Library",
      icon: FaReact,
      iconColor: "text-cyan-300",
      bgColor: "bg-cyan-900/30",
    },
    {
      name: "Vue",
      description: "JavaScript framework",
      icon: FaVuejs,
      iconColor: "text-green-400",
      bgColor: "bg-green-900/30",
    },
    {
      name: "Node",
      description: "Backend runtime",
      icon: FaNodeJs,
      iconColor: "text-green-400",
      bgColor: "bg-green-900/30",
    },
    {
      name: "Express",
      description: "Node.js framework",
      icon: SiExpress,
      iconColor: "text-gray-200",
      bgColor: "bg-white/10 backdrop-blur-sm",
    },
    {
      name: "Tailwind",
      description: "CSS framework",
      icon: SiTailwindcss,
      iconColor: "text-blue-300",
      bgColor: "bg-blue-900/30",
    },
    {
      name: "Git",
      description: "Version control",
      icon: FaGithub,
      iconColor: "text-orange-400",
      bgColor: "bg-orange-900/30",
    },
    {
      name: "Flask",
      description: "Python framework",
      icon: SiFlask,
      iconColor: "text-gray-200",
      bgColor: "bg-white/10 backdrop-blur-sm",
    },
    {
      name: "Redis",
      description: "In-memory database",
      icon: SiRedis,
      iconColor: "text-red-400",
      bgColor: "bg-red-900/30",
    },
    {
      name: "Celery",
      description: "Task queue",
      icon: SiCelery,
      iconColor: "text-green-300",
      bgColor: "bg-green-900/30",
    },
    {
      name: "Next",
      description: "React framework",
      icon: SiNextdotjs,
      iconColor: "text-white",
      bgColor: "bg-white/10 backdrop-blur-sm",
    },
    {
      name: "FastAPI",
      description: "Python API framework",
      icon: SiFastapi,
      iconColor: "text-green-400",
      bgColor: "bg-green-900/30",
    },
  ];

  return (
    <div className="w-full h-screen px-8 flex items-center">
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
              <div
                key={index}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TechnologiesComponent;
