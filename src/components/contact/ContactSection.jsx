import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../utils/gsapConfig";
import { FaEnvelope, FaLinkedin, FaGithub, FaDownload } from "react-icons/fa";
import resumePdf from "../../assets/Resume.pdf";

function ContactSection({ theme = "default" }) {
  const isEmerald = theme === "emerald";
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const formValid = /.+@.+\..+/.test(email) && message.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role: "General",
          subject: "Portfolio Inquiry",
          message,
          replyVia: "Email",
          meta: { ua: navigator.userAgent, ts: Date.now() },
        }),
      });
      if (!res.ok) throw new Error("Send failed");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  useGSAP(
    () => {
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const accentText = isEmerald ? "text-emerald-400" : "text-purple-400";
  const accentBorder = isEmerald
    ? "focus:border-emerald-400/70"
    : "focus:border-purple-400/70";

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div ref={contentRef} className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 font-display">
            Get In Touch
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 md:mb-12 max-w-2xl mx-auto font-body">
            Open to full-time roles and select freelance work — the fastest
            way to reach me is directly below.
          </p>

          {/* Tier 1 — primary, fast path */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-4">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={resumePdf}
              download="Ayush_Patel_Resume.pdf"
              className="flex items-center space-x-3 px-6 py-3 md:px-8 md:py-4 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-900 transition-colors duration-300 text-base md:text-lg cursor-pointer"
            >
              <FaDownload className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-ui">Download Resume</span>
            </motion.a>

            <div className="flex space-x-3 md:space-x-4">
              <motion.a
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  borderColor: isEmerald
                    ? "rgba(16, 185, 129, 0.8)"
                    : "rgba(147, 51, 234, 0.8)",
                  boxShadow: isEmerald
                    ? "0 0 20px rgba(16, 185, 129, 0.4)"
                    : "0 0 20px rgba(147, 51, 234, 0.4)",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                href="mailto:ayushptl1810@gmail.com"
                className="w-12 h-12 md:w-14 md:h-14 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 cursor-pointer"
                aria-label="Email"
              >
                <FaEnvelope className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>
              <motion.a
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  borderColor: isEmerald
                    ? "rgba(16, 185, 129, 0.8)"
                    : "rgba(147, 51, 234, 0.8)",
                  boxShadow: isEmerald
                    ? "0 0 20px rgba(16, 185, 129, 0.4)"
                    : "0 0 20px rgba(147, 51, 234, 0.4)",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                href="https://www.linkedin.com/in/ayushptl1810/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 cursor-pointer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>
              <motion.a
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  borderColor: isEmerald
                    ? "rgba(16, 185, 129, 0.8)"
                    : "rgba(147, 51, 234, 0.8)",
                  boxShadow: isEmerald
                    ? "0 0 20px rgba(16, 185, 129, 0.4)"
                    : "0 0 20px rgba(147, 51, 234, 0.4)",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                href="https://github.com/ayushptl1810"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 cursor-pointer"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>
            </div>
          </div>

          {/* Tier 2 — quiet, optional */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className={`font-body text-sm text-gray-400 hover:${accentText} underline underline-offset-4 decoration-gray-600 hover:decoration-current transition-colors cursor-pointer`}
            >
              {showForm ? "Hide message form" : "Prefer to send a message instead?"}
            </button>

            <AnimatePresence>
              {showForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onSubmit={handleSubmit}
                  className="mt-6 max-w-md mx-auto text-left overflow-hidden"
                >
                  <div className="space-y-3">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      className={`w-full px-4 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-white text-sm placeholder:text-gray-500 outline-none ${accentBorder} transition-colors`}
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      type="email"
                      autoComplete="email"
                      required
                      className={`w-full px-4 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-white text-sm placeholder:text-gray-500 outline-none ${accentBorder} transition-colors`}
                    />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What's this about?"
                      rows={4}
                      required
                      className={`w-full px-4 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-white text-sm placeholder:text-gray-500 outline-none resize-none ${accentBorder} transition-colors`}
                    />
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={!formValid || status === "sending"}
                      className="px-5 py-2 rounded-lg bg-white/10 border border-white/15 text-white text-sm font-ui hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      {status === "sending" ? "Sending…" : "Send message"}
                    </button>
                    {status === "sent" && (
                      <span className="text-sm text-emerald-400 font-body">
                        Sent — I'll get back to you soon.
                      </span>
                    )}
                    {status === "error" && (
                      <span className="text-sm text-red-400 font-body">
                        Something went wrong — try the email link instead.
                      </span>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
