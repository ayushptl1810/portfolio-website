import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PersonalIdentityPanel from "../components/PersonalIdentityPanel";
import SoftSkillsPanel from "../components/SoftSkillsPanel";
import CurrentStatusPanel from "../components/CurrentStatusPanel";
import QuickFactsPanel from "../components/QuickFactsPanel";
import WorkStylePanel from "../components/WorkStylePanel";

const About = () => {
  const [activePanel, setActivePanel] = useState(null);

  const panels = [
    {
      id: "personal",
      component: PersonalIdentityPanel,
      title: "Personal Identity",
    },
    { id: "skills", component: SoftSkillsPanel, title: "Core Skills" },
    { id: "status", component: CurrentStatusPanel, title: "Current Status" },
  ];

  return (
    <section className="w-full min-h-screen py-24 relative overflow-hidden">
      {/* Background Quantum Field */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">
            About Me
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Exploring the frontiers of development, one innovation at a time
          </p>
        </motion.div>

        {/* Quantum Identity Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Personal Identity + Additional Content */}
          <motion.div
            className="lg:col-span-1 flex flex-col h-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex-1 space-y-6">
              <PersonalIdentityPanel />

              {/* Education Container */}
              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 flex-1 flex flex-col justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(147, 51, 234, 0.5)",
                  boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.25)",
                }}
              >
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold text-white mb-2">
                    Education
                  </h4>
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto" />
                </div>

                <div className="space-y-4">
                  {/* IIT Madras */}
                  <div className="text-left">
                    <div className="flex items-start justify-between mb-1">
                      <h5 className="text-white font-semibold text-sm">
                        IIT Madras
                      </h5>
                      <span className="text-purple-400 text-xs font-mono bg-purple-400/10 px-2 py-1 rounded">
                        CGPA: 7.99
                      </span>
                    </div>
                    <p className="text-blue-400 text-xs font-medium mb-1">
                      BS in Data Science • 2023 - Present
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/10" />

                  {/* DJ Sanghvi */}
                  <div className="text-left">
                    <div className="flex items-start justify-between mb-1">
                      <h5 className="text-white font-semibold text-sm">
                        Dwarkadas J. Sanghvi College
                      </h5>
                      <span className="text-green-400 text-xs font-mono bg-green-400/10 px-2 py-1 rounded">
                        CGPA: 9.32
                      </span>
                    </div>
                    <p className="text-blue-400 text-xs font-medium mb-1">
                      BTech CSE (Data Science) • 2023 - Present
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-xs font-medium">
                      Currently Enrolled
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Center - Main About Me Content */}
          <motion.div
            className="lg:col-span-1 flex items-stretch"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl transition-all duration-300 w-full flex flex-col justify-center"
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(147, 51, 234, 0.5)",
                boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.25)",
              }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">About Me</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4" />
              </div>

              <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                <p>
                  I'm a passionate Full Stack Developer with a love for creating
                  elegant, user-centric web applications. My journey in tech
                  started with curiosity and has evolved into a deep
                  appreciation for clean code and innovative solutions.
                </p>

                <p>
                  When I'm not coding, you'll find me exploring new
                  technologies, contributing to open source projects, or diving
                  into the latest development trends. I believe in continuous
                  learning and pushing the boundaries of what's possible on the
                  web.
                </p>

                <p>
                  My approach combines technical expertise with creative
                  problem-solving, always keeping the end user in mind. Every
                  project is an opportunity to learn, grow, and create something
                  meaningful.
                </p>
              </div>

              {/* Tech Stack Preview */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="text-white font-semibold mb-3 text-center">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    "React",
                    "Node.js",
                    "Next.js",
                    "Flask",
                    "MongoDB",
                    "Deployment",
                  ].map((tech, index) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Panel - Content Matrix */}
          <motion.div
            className="lg:col-span-1 flex flex-col h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex-1 space-y-6">
              {panels.slice(1).map((panel, index) => (
                <motion.div
                  key={panel.id}
                  className="flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  onHoverStart={() => setActivePanel(panel.id)}
                  onHoverEnd={() => setActivePanel(null)}
                >
                  <panel.component isActive={activePanel === panel.id} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row - Additional Panels */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <QuickFactsPanel isActive={activePanel === "facts"} />
          <WorkStylePanel isActive={activePanel === "workstyle"} />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
