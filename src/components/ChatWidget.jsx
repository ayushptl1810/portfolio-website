import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes, FaRobot, FaUser } from "react-icons/fa";

export default function ChatWidget({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "Hi! I'm Ayush's personal AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = {
      id: Date.now(),
      from: "user",
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const url = "/api/llm"; // use Vite proxy
      const history = messages
        .slice(-8)
        .map((m) => ({ from: m.from, text: m.text }));
      const payload = { query: trimmed, history };
      console.log("Chat POST", { url, payload });
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.ok) {
        const botMessage = {
          id: Date.now() + 1,
          from: "bot",
          text: data.content,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          from: "bot",
          text: `Sorry, I encountered an error: ${data.error}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Chat POST failed:", error);
      const errorMessage = {
        id: Date.now() + 1,
        from: "bot",
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed bottom-24 right-6 z-[70] w-[24rem] max-w-[90vw] h-[28rem] max-h-[85vh] rounded-2xl border border-white/10 bg-zinc-950/90 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col overflow-x-hidden"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-blue-500/10 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white font-semibold font-ui text-lg">
                  AI Assistant
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-300 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-white/10 cursor-pointer"
                aria-label="Close chat"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="px-6 py-4 space-y-4 flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-zinc-950/50 to-zinc-900/50">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${
                  message.from === "user" ? "justify-end" : "justify-start"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`flex items-start space-x-2 w-full ${
                    message.from === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.from === "user"
                        ? "bg-gradient-to-r from-purple-500 to-blue-500"
                        : "bg-gradient-to-r from-blue-500 to-purple-500"
                    }`}
                  >
                    {message.from === "user" ? (
                      <FaUser className="w-4 h-4 text-white" />
                    ) : (
                      <FaRobot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Message */}
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[80%] overflow-hidden [overflow-wrap:anywhere] break-words ${
                      message.from === "user"
                        ? "bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white"
                        : "bg-white/10 border border-white/15 text-gray-200"
                    }`}
                  >
                    <p className="font-body text-sm leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                      {message.text}
                    </p>
                    <div
                      className={`text-xs mt-2 ${
                        message.from === "user"
                          ? "text-purple-200"
                          : "text-gray-400"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <FaRobot className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/15">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t border-white/10 bg-gradient-to-r from-purple-500/5 to-blue-500/5 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <input
                ref={inputRef}
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-900/70 border border-white/10 text-white placeholder:text-gray-400 outline-none font-body text-sm transition-all duration-200 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <motion.button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-4 py-3 rounded-xl border-2 border-white/20 text-white hover:bg-white hover:text-blue-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaperPlane className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
