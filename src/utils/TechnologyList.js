import {
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaGithub,
  FaProjectDiagram,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiNextdotjs,
  SiFlask,
  SiRedis,
  SiCelery,
  SiFastapi,
  SiNumpy,
  SiPandas,
  SiScipy,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiHuggingface,
  SiOpencv,
  SiWeightsandbiases,
  SiLangchain,
  SiJsonwebtokens,
  SiVercel,
  SiPostgresql,
} from "react-icons/si";

import { TbDatabaseSearch } from "react-icons/tb";
import { CrewAI } from "@lobehub/icons";
import { SeabornIcon, MatplotlibIcon } from "../components/icons/CustomIcons";

const WebTechStack = [
  {
    name: "MongoDB",
    description: "NoSQL database",
    icon: SiMongodb,
    iconColor: "text-green-400",
    bgColor: "bg-green-900/30",
  },
  {
    name: "PostgreSQL",
    description: "Relational database",
    icon: SiPostgresql,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-900/30",
  },
  {
    name: "React.js",
    description: "JavaScript Library",
    icon: FaReact,
    iconColor: "text-cyan-300",
    bgColor: "bg-cyan-900/30",
  },
  {
    name: "Vue.js",
    description: "JavaScript framework",
    icon: FaVuejs,
    iconColor: "text-green-400",
    bgColor: "bg-green-900/30",
  },
  {
    name: "Next.js",
    description: "React framework",
    icon: SiNextdotjs,
    iconColor: "text-white",
    bgColor: "bg-white/10 backdrop-blur-sm",
  },
  {
    name: "Node.js",
    description: "Backend runtime",
    icon: FaNodeJs,
    iconColor: "text-green-400",
    bgColor: "bg-green-900/30",
  },
  {
    name: "Express.js",
    description: "Node.js framework",
    icon: SiExpress,
    iconColor: "text-gray-200",
    bgColor: "bg-white/10 backdrop-blur-sm",
  },
  {
    name: "Tailwind CSS",
    description: "CSS framework",
    icon: SiTailwindcss,
    iconColor: "text-blue-300",
    bgColor: "bg-blue-900/30",
  },
  {
    name: "Git/GitHub",
    description: "Source Control Platform",
    icon: FaGithub,
    iconColor: "text-gray-200",
    bgColor: "bg-white/10 backdrop-blur-sm",
  },
  {
    name: "Flask",
    description: "Python framework",
    icon: SiFlask,
    iconColor: "text-gray-200",
    bgColor: "bg-white/10 backdrop-blur-sm",
  },
  {
    name: "FastAPI",
    description: "Python API framework",
    icon: SiFastapi,
    iconColor: "text-green-400",
    bgColor: "bg-green-900/30",
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
    name: "WebSockets",
    description: "Real-time communication",
    icon: TbDatabaseSearch,
    iconColor: "text-purple-300",
    bgColor: "bg-purple-900/30",
  },
  {
    name: "JWT",
    description: "Authentication tokens",
    icon: SiJsonwebtokens,
    iconColor: "text-yellow-300",
    bgColor: "bg-yellow-900/30",
  },
  {
    name: "Vercel / Render",
    description: "Deployment platforms",
    icon: SiVercel,
    iconColor: "text-white",
    bgColor: "bg-white/10 backdrop-blur-sm",
  },
];

const AiTechStack = [
  // ===== Numerical & Data Processing =====
  {
    name: "NumPy",
    description: "Numerical Computing",
    icon: SiNumpy,
    iconColor: "text-blue-300",
    bgColor: "bg-blue-900/30",
  },
  {
    name: "Pandas",
    description: "Data Analysis",
    icon: SiPandas,
    iconColor: "text-indigo-300",
    bgColor: "bg-indigo-900/30",
  },
  {
    name: "SciPy",
    description: "Scientific Computing",
    icon: SiScipy,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-900/30",
  },

  // ===== Data Visualization =====
  {
    name: "Matplotlib",
    description: "Data Visualization",
    icon: MatplotlibIcon,
    iconColor: "text-emerald-300",
    bgColor: "bg-emerald-900/30",
  },
  {
    name: "Seaborn",
    description: "Statistical Visualization",
    icon: SeabornIcon,
    iconColor: "text-teal-300",
    bgColor: "bg-teal-900/30",
  },

  // ===== Classical Machine Learning =====
  {
    name: "scikit-learn",
    description: "Machine Learning",
    icon: SiScikitlearn,
    iconColor: "text-orange-400",
    bgColor: "bg-orange-900/30",
  },

  // ===== Deep Learning =====
  {
    name: "TensorFlow",
    description: "Deep Learning Framework",
    icon: SiTensorflow,
    iconColor: "text-orange-400",
    bgColor: "bg-orange-900/30",
  },
  {
    name: "PyTorch",
    description: "Deep Learning Framework",
    icon: SiPytorch,
    iconColor: "text-red-400",
    bgColor: "bg-red-900/30",
  },

  // ===== LLMs & Agent Frameworks =====
  {
    name: "Hugging Face",
    description: "Models & Datasets",
    icon: SiHuggingface,
    iconColor: "text-yellow-300",
    bgColor: "bg-yellow-900/30",
  },
  {
    name: "LangChain",
    description: "LLM Orchestration",
    icon: SiLangchain,
    iconColor: "text-purple-300",
    bgColor: "bg-purple-900/30",
  },
  {
    name: "CrewAI",
    description: "AI Agent Framework",
    icon: CrewAI,
    iconColor: "text-violet-300",
    bgColor: "bg-violet-900/30",
  },
  {
    name: "LangGraph",
    description: "Agent Execution Graph",
    icon: SiLangchain,
    iconColor: "text-purple-300",
    bgColor: "bg-purple-900/30",
  },

  // ===== Vector Search & Databases =====
  {
    name: "VectorDbs",
    description: "Semantic Vector Storage",
    icon: TbDatabaseSearch,
    iconColor: "text-cyan-300",
    bgColor: "bg-cyan-900/30",
  },
  {
    name: "GraphDbs",
    description: "Relationship-Based Storage",
    icon: FaProjectDiagram,
    iconColor: "text-green-400",
    bgColor: "bg-green-900/30",
  },

  // ===== Computer Vision =====
  {
    name: "OpenCV",
    description: "Computer Vision",
    icon: SiOpencv,
    iconColor: "text-green-400",
    bgColor: "bg-green-900/30",
  },

  // ===== MLOps & Experiment Tracking =====
  {
    name: "Weights & Biases",
    description: "Experiment Tracking",
    icon: SiWeightsandbiases,
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-900/30",
  },
];

export { WebTechStack, AiTechStack };
