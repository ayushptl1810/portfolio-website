import React from "react";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
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

function ProjectCard({ project }) {
  const {
    name,
    description,
    tags = [],
    github_url,
    demo_url,
    deployed_url,
    image,
  } = project || {};

  const demoHref = demo_url || deployed_url;
  const hasDemo = Boolean(demoHref);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full max-w-[34rem] mx-auto bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[36rem] md:h-[40rem] flex flex-col"
    >
      {/* Media */}
      <div className="w-full h-56 md:h-72 bg-gradient-to-tr from-zinc-900 to-zinc-800">
        {image ? (
          <img
            src={image}
            alt={`${name} preview`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No preview image
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
          {/* All buttons in one row */}
          <div className="flex items-center gap-3">
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={`/projects/${name.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full transition-all duration-300 text-base font-medium w-full relative overflow-hidden group"
              >
                {/* Transmission Room Style Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full"
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
              className="flex items-center space-x-2 px-5 py-2.5 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-900 transition-colors duration-300 text-base"
            >
              <FaGithub className="w-5 h-5" />
              <span className="font-ui">GitHub</span>
            </a>

            {hasDemo ? (
              <a
                href={demoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-5 py-2.5 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-900 transition-all duration-300 text-base"
              >
                <HiOutlineExternalLink className="w-5 h-5" />
                <span className="font-ui">Live Demo</span>
              </a>
            ) : (
              <span
                className="flex items-center space-x-2 px-5 py-2.5 border-2 border-white/40 rounded-full text-white/60 cursor-not-allowed text-base"
                title="Live demo not available"
              >
                <HiOutlineExternalLink className="w-5 h-5" />
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
