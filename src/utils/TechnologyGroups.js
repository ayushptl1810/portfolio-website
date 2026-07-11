import { WebTechStack, AiTechStack } from "./TechnologyList";

const combinedStack = [...WebTechStack, ...AiTechStack];

function buildGroups(defs, stack) {
  return defs
    .map((def) => ({
      label: def.label,
      accent: def.accent,
      items: def.match
        .map((name) => stack.find((t) => t.name === name))
        .filter(Boolean),
    }))
    .filter((g) => g.items.length > 0);
}

const groupDefs = [
  {
    label: "Frontend",
    accent: "from-purple-500 to-blue-500",
    match: ["React.js", "Vue.js", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Backend & APIs",
    accent: "from-fuchsia-500 to-purple-600",
    match: [
      "Node.js",
      "Express.js",
      "Flask",
      "FastAPI",
      "Celery",
      "WebSockets",
      "JWT",
    ],
  },
  {
    label: "Databases",
    accent: "from-blue-500 to-cyan-500",
    match: [
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Qdrant",
      "Pinecone",
      "Faiss",
      "Neo4j",
      "TigerGraph",
    ],
  },
  {
    label: "Infrastructure & DevOps",
    accent: "from-sky-400 to-indigo-500",
    match: [
      "Git/GitHub",
      "Vercel / Render",
      "Docker",
      "Hugging Face",
      "Weights & Biases",
    ],
  },
  {
    label: "Data Science & Classical ML",
    accent: "from-amber-400 to-orange-500",
    match: ["NumPy", "Pandas", "SciPy", "Matplotlib", "Seaborn", "scikit-learn"],
  },
  {
    label: "Deep Learning & LLMs",
    accent: "from-violet-500 to-fuchsia-600",
    match: ["TensorFlow", "PyTorch", "LangChain", "CrewAI", "LangGraph", "OpenCV"],
  },
];

export const AllTechGroups = buildGroups(groupDefs, combinedStack);
