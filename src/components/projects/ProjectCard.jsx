import React from "react";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

/*
  Expected project shape (from ProjectList):
  {
    id: number | string,
    name: string,
    description: string,
    tags: string[],
    github_url: string,
    demo_url?: string,
    deployed_url?: string,
    image?: string
  }
*/

function ProjectCard({ project, theme = "default" }) {
  const isEmerald = theme === "emerald";
  const {
    name,
    description,
    tags = [],
    github_url,
    demo_url,
    deployed_url,
    image,
  } = project || {};

  const location = useLocation();
  // Determine base path based on location OR theme fallback
  const basePath = location.pathname.startsWith("/ai") ? "/ai" : "/web";

  const demoHref = demo_url || deployed_url;
  const hasDemo = Boolean(demoHref);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full max-w-[34rem] mx-auto bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[36rem] md:h-[40rem] flex flex-col"
    >
      <div className="w-full h-56 md:h-72 bg-zinc-900 relative overflow-hidden group">
        {!image && (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${
              isEmerald
                ? "from-emerald-900/40 to-black"
                : "from-purple-900/40 to-black"
            } opacity-50`}
          />
        )}

        {image ? (
          <img
            src={image}
            alt={`${name} preview`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          /* Smart Code Snapshot Fallback */
          <div className="absolute inset-0 flex flex-col p-5 font-mono text-xs text-blue-300/90 leading-relaxed bg-[#0d1117]">
            {/* Fake Terminal Header */}
            <div className="flex space-x-1.5 mb-4 opacity-40">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>

            {/* Dynamic Code Content based on Tags */}
            <div className="space-y-1.5 opacity-90">
              {tags.some((t) =>
                ["crewai", "langchain", "agent"].includes(t.toLowerCase())
              ) ? (
                // Agentic Code Snippet
                <>
                  <span className="block text-purple-400">
                    from <span className="text-white">crewai</span> import{" "}
                    <span className="text-yellow-300">Agent</span>
                  </span>
                  <span className="block text-purple-400">
                    from <span className="text-white">tools</span> import{" "}
                    <span className="text-yellow-300">SearchTool</span>
                  </span>
                  <span className="block text-gray-500 mt-2">
                    # Initialize {name} agents
                  </span>
                  <span className="block text-blue-300">
                    researcher = <span className="text-green-400">Agent</span>(
                  </span>
                  <span className="block pl-4 text-white">
                    role='Senior Analyst',
                  </span>
                  <span className="block pl-4 text-white">
                    goal='Analyze trends',
                  </span>
                  <span className="block text-blue-300">)</span>
                  <span className="block text-gray-400 mt-2 animate-pulse">
                    # Executing task...
                  </span>
                </>
              ) : (
                // ML/DL Code Snippet (Default)
                <>
                  <span className="block text-purple-400">
                    import <span className="text-white">torch</span>
                  </span>
                  <span className="block text-purple-400">
                    import <span className="text-white">torch.nn</span> as{" "}
                    <span className="text-yellow-300">nn</span>
                  </span>
                  <span className="block text-gray-500 mt-2">
                    # Configuring {name} model
                  </span>
                  <span className="block text-blue-300">
                    class <span className="text-green-400">Transformer</span>
                    (nn.Module):
                  </span>
                  <span className="block pl-4 text-blue-300">
                    def <span className="text-yellow-300">__init__</span>(self):
                  </span>
                  <span className="block pl-8 text-white">
                    super().__init__()
                  </span>
                  <span className="block pl-8 text-white">
                    self.attn ={" "}
                    <span className="text-green-400">MultiHeadAttn()</span>
                  </span>
                  <span className="block text-gray-400 mt-2 animate-pulse">
                    # Training epoch 1/100...
                  </span>
                </>
              )}
            </div>

            {/* Bottom Fade Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
        {/* Top: title + description */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3 font-display">
            {name}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4 font-body">
            {description}
          </p>
        </div>

        {/* Middle: subtitle + tags */}
        <div>
          <p className="text-sm md:text-base font-semibold text-white mb-2">
            Technologies Used:
          </p>
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 max-h-16 md:max-h-20 overflow-hidden">
              {tags.map((tag, idx) => (
                <span
                  key={`${name}-tag-${idx}`}
                  className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white font-ui"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: actions */}
        <div className="flex flex-col gap-3 mt-4">
          {/* All buttons responsive */}
          <div className="flex items-center gap-3 flex-wrap">
            <motion.div
              className="flex-1 min-w-[9rem]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={`${basePath}/projects/${name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className={`flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r ${
                  isEmerald
                    ? "from-emerald-500 to-cyan-600"
                    : "from-blue-500 to-purple-600"
                } text-white rounded-full transition-all duration-300 text-sm md:text-base font-medium w-full relative overflow-hidden group`}
              >
                {/* Transmission Room Style Hover Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    isEmerald
                      ? "from-emerald-500/20 to-cyan-500/20"
                      : "from-purple-500/20 to-blue-500/20"
                  } rounded-full`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 font-ui">View Details</span>
              </Link>
            </motion.div>

            <a
              href={github_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 border-2 border-white rounded-full text-white hover:bg-white ${
                isEmerald ? "hover:text-emerald-900" : "hover:text-blue-900"
              } transition-colors duration-300 text-sm md:text-base flex-1 min-w-[8.5rem]`}
            >
              <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-ui">GitHub</span>
            </a>

            {hasDemo ? (
              <a
                href={demoHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 border-2 border-white rounded-full text-white hover:bg-white ${
                  isEmerald ? "hover:text-emerald-900" : "hover:text-blue-900"
                } transition-all duration-300 text-sm md:text-base flex-1 min-w-[9rem]`}
              >
                <HiOutlineExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-ui">Live Demo</span>
              </a>
            ) : (
              <span
                className="flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 border-2 border-white/40 rounded-full text-white/60 cursor-not-allowed text-sm md:text-base flex-1 min-w-[9rem]"
                title="Live demo not available"
              >
                <HiOutlineExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-ui">Live Demo</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
