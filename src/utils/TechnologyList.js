import { FaReact, FaVuejs, FaNodeJs, FaGithub, FaPython } from "react-icons/fa";
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

import {
  SiNumpy,
  SiPandas,
  SiScipy,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiHuggingface,
  SiOpencv,
  SiWeightsandbiases,
  SiMeta,
  SiLangchain,
} from "react-icons/si";

import { CrewAI } from "@lobehub/icons";
import {
  SeabornIcon,
  MatplotlibIcon,
  PineconeIcon,
} from "../components/icons/CustomIcons";

const WebTechStack = [
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

const AiTechStack = [
  // ===== Numerical & Data Processing =====
  {
    name: "NumPy",
    description: "Numerical computing",
    icon: SiNumpy,
    iconColor: "text-blue-300",
    bgColor: "bg-blue-900/30",
  },
  {
    name: "Pandas",
    description: "Data analysis",
    icon: SiPandas,
    iconColor: "text-indigo-300",
    bgColor: "bg-indigo-900/30",
  },
  {
    name: "SciPy",
    description: "Scientific computing",
    icon: SiScipy,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-900/30",
  },

  // ===== Data Visualization =====
  {
    name: "Matplotlib",
    description: "Data visualization",
    icon: MatplotlibIcon,
    iconColor: "text-emerald-300",
    bgColor: "bg-emerald-900/30",
  },
  {
    name: "Seaborn",
    description: "Statistical visualization",
    icon: SeabornIcon,
    iconColor: "text-teal-300",
    bgColor: "bg-teal-900/30",
  },

  // ===== Classical Machine Learning =====
  {
    name: "scikit-learn",
    description: "Machine learning",
    icon: SiScikitlearn,
    iconColor: "text-orange-400",
    bgColor: "bg-orange-900/30",
  },
  {
    name: "XGBoost",
    description: "Gradient boosting",
    icon: FaPython,
    iconColor: "text-orange-300",
    bgColor: "bg-orange-900/30",
  },

  // ===== Deep Learning =====
  {
    name: "TensorFlow",
    description: "Deep learning framework",
    icon: SiTensorflow,
    iconColor: "text-orange-400",
    bgColor: "bg-orange-900/30",
  },
  {
    name: "PyTorch",
    description: "Deep learning framework",
    icon: SiPytorch,
    iconColor: "text-red-400",
    bgColor: "bg-red-900/30",
  },

  // ===== LLMs & Agent Frameworks =====
  {
    name: "Hugging Face",
    description: "Models & datasets",
    icon: SiHuggingface,
    iconColor: "text-yellow-300",
    bgColor: "bg-yellow-900/30",
  },
  {
    name: "LangChain",
    description: "LLM orchestration",
    icon: SiLangchain,
    iconColor: "text-purple-300",
    bgColor: "bg-purple-900/30",
  },
  {
    name: "CrewAI",
    description: "AI agent framework",
    icon: CrewAI,
    iconColor: "text-violet-300",
    bgColor: "bg-violet-900/30",
  },

  // ===== Vector Search & Databases =====
  {
    name: "FAISS",
    description: "Vector similarity search",
    icon: SiMeta,
    iconColor: "text-cyan-300",
    bgColor: "bg-cyan-900/30",
  },
  {
    name: "Pinecone",
    description: "Vector database",
    icon: PineconeIcon,
    iconColor: "text-green-400",
    bgColor: "bg-green-900/30",
  },

  // ===== Computer Vision =====
  {
    name: "OpenCV",
    description: "Computer vision",
    icon: SiOpencv,
    iconColor: "text-green-400",
    bgColor: "bg-green-900/30",
  },

  // ===== MLOps & Experiment Tracking =====
  {
    name: "Weights & Biases",
    description: "Experiment tracking",
    icon: SiWeightsandbiases,
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-900/30",
  },
];

export { WebTechStack, AiTechStack };
