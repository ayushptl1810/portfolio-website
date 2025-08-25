import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import { useReadme } from "../hooks/useReadme";
import ProjectList from "../utils/ProjectList";
import ReactMarkdown from "react-markdown";

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  // Extract owner and repo name from GitHub URL
  const getGitHubInfo = (url) => {
    if (!url) return { owner: null, repoName: null };
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      return { owner: match[1], repoName: match[2] };
    }
    return { owner: null, repoName: null };
  };

  const { owner, repoName } = getGitHubInfo(project?.github_url);
  const { readme, loading, error } = useReadme(owner, repoName);

  useEffect(() => {
    // Find project by name from ProjectList
    const foundProject = ProjectList.find(
      (p) => p.name.toLowerCase().replace(/\s+/g, "-") === projectName
    );

    if (foundProject) {
      setProject(foundProject);
    } else {
      // Redirect to projects page if project not found
      navigate("/projects");
    }
  }, [projectName, navigate]);

  if (!project) {
    return null; // Will redirect
  }

  const handleBack = () => {
    navigate("/projects");
  };

  return (
    <section className="w-full min-h-screen py-24 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Project Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            {project.name}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {project.description}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {/* Video Section (75% width) - No container, just video */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-video bg-black/20 rounded-2xl border border-white/10 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">🎥</div>
                <p>Video placeholder for {project.name}</p>
                <p className="text-sm">Replace with actual video content</p>
              </div>
            </div>
          </motion.div>

          {/* Project Sidebar (25% width) - Comprehensive design */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Button */}
            <motion.button
              onClick={handleBack}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:text-blue-400 hover:border-blue-400/50 transition-all duration-300 group shadow-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Projects</span>
            </motion.button>

            {/* Tech Stack Card */}
            <div className="bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-purple-500/5 animate-pulse" />

              <div className="relative z-10">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-3" />
                  Technologies
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent ml-3" />
                </h4>

                {/* Tech Stack Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {project.tags?.map((tech, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-sm group-hover:blur-none transition-all duration-300" />
                      <div className="relative bg-black/60 border border-white/20 rounded-lg p-3 text-center hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm">
                        <span className="text-white text-xs font-medium block truncate">
                          {tech}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Hover Particles */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
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
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {project.deployed_url && (
                <motion.a
                  href={project.deployed_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:shadow-purple-500/25"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                  <span>Live Demo</span>
                </motion.a>
              )}

              {project.github_url && (
                <motion.a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-zinc-950/70 border border-white/20 text-white rounded-2xl hover:bg-zinc-900/80 hover:border-purple-400/50 transition-all duration-300 font-medium backdrop-blur-md shadow-xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaGithub className="w-4 h-4" />
                  <span>Source Code</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        {/* README Section */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Project Details
            </h3>

            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading project details...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="text-red-400 text-6xl mb-4">⚠️</div>
                <p className="text-red-400 mb-2">Failed to load README</p>
                <p className="text-gray-400 text-sm mb-4">{error}</p>

                {/* Fallback: Show project details from ProjectList */}
                <div className="mt-8 text-left max-w-4xl mx-auto">
                  <h4 className="text-xl font-bold text-white mb-4">
                    Project Overview
                  </h4>
                  <p className="text-gray-300 mb-6">{project.description}</p>

                  {project.points && project.points.length > 0 && (
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-white mb-3">
                        Key Features
                      </h5>
                      <ul className="space-y-2">
                        {project.points.map((point, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <span className="text-blue-400 mt-1">•</span>
                            <span className="text-gray-300 text-sm">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="text-center">
                    <p className="text-gray-300 text-sm mb-4">
                      You can also view the project directly on GitHub:
                    </p>
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
                      >
                        <FaGithub className="w-5 h-5" />
                        <span>View on GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {readme && (
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                <ReactMarkdown
                  components={{
                    // Custom styling for different markdown elements
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-white mb-4 mt-6">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-white mb-3 mt-5">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-white mb-3 mt-4">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-lg font-bold text-white mb-2 mt-3">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 mb-3 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children, ...props }) => {
                      const depth = props.depth || 0;
                      const marginClass = depth > 0 ? "ml-6" : "";
                      return (
                        <ul
                          className={`list-disc text-gray-300 mb-3 space-y-1 ${marginClass}`}
                        >
                          {children}
                        </ul>
                      );
                    },
                    ol: ({ children, ...props }) => {
                      const depth = props.depth || 0;
                      const marginClass = depth > 0 ? "ml-6" : "";
                      return (
                        <ol
                          className={`list-decimal text-gray-300 mb-3 space-y-1 ${marginClass}`}
                        >
                          {children}
                        </ol>
                      );
                    },
                    li: ({ children }) => {
                      // Check if children contains nested lists
                      const hasNestedList = React.Children.toArray(
                        children
                      ).some(
                        (child) =>
                          React.isValidElement(child) &&
                          (child.type === "ul" || child.type === "ol")
                      );

                      return <li className="text-gray-300 ml-4">{children}</li>;
                    },
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <motion.code
                          className="bg-gray-800 text-blue-400 px-1 py-0.5 rounded text-sm font-mono"
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "rgba(31, 41, 55, 0.9)",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {children}
                        </motion.code>
                      ) : (
                        <motion.code
                          className="block bg-gray-800 text-blue-400 p-3 rounded-lg text-sm font-mono overflow-x-auto relative"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          whileHover={{
                            scale: 1.01,
                            backgroundColor: "rgba(31, 41, 55, 0.95)",
                            boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                          }}
                        >
                          {children}
                        </motion.code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-400 mb-3">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-white">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-gray-200">{children}</em>
                    ),
                    hr: () => <hr className="border-gray-600 my-6" />,
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border border-gray-600">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-600 px-4 py-2 text-left text-white font-bold bg-gray-800">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-600 px-4 py-2 text-gray-300">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {readme}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetail;
