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

export default technologies;
