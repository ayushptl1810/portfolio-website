import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TerminalWindow = ({
  name = "Project",
  description = "",
  tags = [],
  steps = [],
}) => {
  const [lines, setLines] = useState([]);

  // Determine project type and commands
  const getCommandSequence = () => {
    const tagString = tags.map((t) => t.toLowerCase()).join(" ");

    // agentic / llm
    if (
      ["langchain", "crewai", "openai", "llm", "agent"].some((k) =>
        tagString.includes(k)
      )
    ) {
      return [
        {
          cmd: "pip install -r requirements.txt",
          output: "Installing agent dependencies...",
          delay: 600,
        },
        {
          cmd: "python main.py",
          output: "Orchestrating agents...",
          delay: 800,
        },
        {
          cmd: "init_agents",
          output: "Connecting to VectorDB & LLM...",
          delay: 1200,
        },
        { cmd: "status_check", output: "Agents Ready. [OK]", delay: 400 },
      ];
    }
    // deep learning / cv
    else if (
      [
        "pytorch",
        "tensorflow",
        "keras",
        "cv",
        "computer vision",
        "cnn",
        "transformer",
        "huggingface",
      ].some((k) => tagString.includes(k))
    ) {
      return [
        {
          cmd: "pip install -r requirements.txt",
          output: "Installing torch & cuda libs...",
          delay: 600,
        },
        {
          cmd: "python train.py --eval",
          output: `Loading model weights for ${name}...`,
          delay: 800,
        },
        {
          cmd: "load_weights",
          output: "Model loaded (2.3GB). [DONE]",
          delay: 1500,
        },
        {
          cmd: "inference_mode",
          output: "Ready for inference. [OK]",
          delay: 400,
        },
      ];
    }
    // web / other (fallback for when image is missing in web projects)
    else if (
      ["reactjs", "nextjs", "nodejs", "javascript", "html", "css", "vue"].some(
        (k) => tagString.includes(k)
      )
    ) {
      return [
        {
          cmd: "npm install",
          output: "Installing dependencies...",
          delay: 800,
        },
        {
          cmd: "npm run dev",
          output: `Starting development server...`,
          delay: 800,
        },
        {
          cmd: "build_client",
          output: "Compiling modules... [Done in 1.2s]",
          delay: 1000,
        },
        {
          cmd: "health_check",
          output: "Server running on :3000. [OK]",
          delay: 400,
        },
      ];
    }
    // default python/general
    else {
      return [
        {
          cmd: "pip install -r requirements.txt",
          output: "Installing dependencies...",
          delay: 500,
        },
        { cmd: "uvicorn main:app", output: `Starting ${name}...`, delay: 800 },
        { cmd: "init_system", output: "Initializing Service...", delay: 1200 },
        { cmd: "status_check", output: "System Online. [OK]", delay: 400 },
      ];
    }
  };

  const commandSequence = getCommandSequence();

  // If no steps provided, use tags to generate fake analysis output
  const outputLines =
    steps.length > 0
      ? steps
      : [
          ...tags.map((tag) => `> Loading module: ${tag}... [DONE]`),
          "> Analyzing architecture...",
          `> Description: ${description.substring(0, 40)}...`,
          "> Confidence Score: 99.8%",
          "> Ready for inference.",
        ];

  useEffect(() => {
    let currentIndex = 0;
    let currentSequence = 0;

    // Initial clear
    setLines([]);

    const typeWriter = setInterval(() => {
      if (currentSequence < commandSequence.length) {
        const step = commandSequence[currentSequence];
        // Add Command
        setLines((prev) => [
          ...prev,
          { type: "cmd", text: `user@sys:~$ ${step.cmd}` },
        ]);

        // Add Output after small delay
        setTimeout(() => {
          setLines((prev) => [...prev, { type: "output", text: step.output }]);
        }, step.delay / 2);

        currentSequence++;
      } else if (currentIndex < outputLines.length) {
        // Stream the main output content
        setLines((prev) => [
          ...prev,
          { type: "data", text: outputLines[currentIndex] },
        ]);
        currentIndex++;
      } else {
        // Finish
        clearInterval(typeWriter);
        setLines((prev) => [
          ...prev,
          { type: "success", text: "✨ Execution Complete" },
        ]);
      }
    }, 800);

    return () => clearInterval(typeWriter);
  }, [name]);

  return (
    <div className="w-full max-w-4xl mx-auto font-mono text-sm leading-relaxed shadow-2xl rounded-lg overflow-hidden border border-gray-800 bg-[#0d1117]">
      {/* Terminal Title Bar */}
      <div className="bg-[#161b22] px-4 py-2 flex items-center border-b border-gray-800">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-gray-400 text-xs flex-1 text-center font-mono opacity-60">
          guest@portfolio: ~/{name.toLowerCase().replace(/\s/g, "-")}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 h-[400px] overflow-y-auto w-full text-left bg-[#0d1117] relative">
        <div className="absolute top-0 left-0 w-full h-full bg-scanlines pointer-events-none opacity-5"></div>

        <div className="space-y-2 font-mono">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${
                line.type === "cmd"
                  ? "text-green-400 mt-4"
                  : line.type === "success"
                  ? "text-purple-400 font-bold mt-4"
                  : line.type === "data"
                  ? "text-blue-300 ml-2"
                  : "text-gray-300"
              }`}
            >
              {line.text}
            </motion.div>
          ))}
          {/* Blinking Cursor */}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2.5 h-4 bg-gray-500 ml-1 align-middle"
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;
