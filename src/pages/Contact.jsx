import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import IncomingTransition from "../transitions/IncomingTransition";
import RoleChips from "../components/RoleChips";
import TransmitButton from "../components/TransmitButton";
import SegmentedToggle from "../components/SegmentedToggle";
import { FaDownload } from "react-icons/fa";
import TransmissionBlast from "../components/TransmissionBlast";

function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [linkedinUrl, setLinkedinUrl] = React.useState("");
  const [role, setRole] = React.useState("General");
  const [message, setMessage] = React.useState("");
  const [replyVia, setReplyVia] = React.useState("Email");
  const [submitting, setSubmitting] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [blastActive, setBlastActive] = React.useState(false);
  const [showTxBanner, setShowTxBanner] = React.useState(false);
  const [pageReturning, setPageReturning] = React.useState(true);

  // Track the in-flight request for diagnostics
  const sendRef = React.useRef(null);

  const roleToSubject = {
    General: "General Inquiry",
    Freelance: "Freelance Project",
    Engineer: "Engineering Chat",
  };

  const subject = roleToSubject[role] || "Message";

  const isEmailValid = replyVia === "Email" ? /.+@.+\..+/.test(email) : true;
  const isLinkedInValid =
    replyVia === "LinkedIn"
      ? /https?:\/\/(www\.)?linkedin\.com\//i.test(linkedinUrl)
      : true;
  const isMessageValid = message.trim().length > 0;
  const formValid = isEmailValid && isLinkedInValid && isMessageValid;

  const handleCommit = async () => {
    if (submitting || !formValid) return;
    setSubmitting(true);
    setBlastActive(true);

    // Start request in parallel with animation (do not await here)
    const startedAt = performance.now();
    const payload = {
      name,
      email,
      linkedinUrl,
      role,
      subject,
      message,
      replyVia,
      meta: {
        ua: navigator.userAgent,
        ts: Date.now(),
      },
    };

    sendRef.current = fetch("http://localhost:3001/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const ok = res.ok;
        const ms = Math.round(performance.now() - startedAt);
        if (!ok)
          throw new Error(`Contact send failed (${res.status}) in ${ms}ms`);
        // Reset form on success
        setName("");
        setEmail("");
        setLinkedinUrl("");
        setMessage("");
        console.log(`Contact sent successfully in ${ms}ms`);
      })
      .catch((err) => {
        const ms = Math.round(performance.now() - startedAt);
        console.error(`Contact send error after ${ms}ms:`, err);
      })
      .finally(() => {
        setSubmitting(false);
        setProgress(0);
      });
  };

  return (
    <>
      <IncomingTransition />
      <TransmissionBlast
        active={blastActive}
        src="/src/assets/chainless_rocket.riv"
        showFlash={false}
        onDone={() => {
          setBlastActive(false);
          // Show banner immediately when animation completes (independent of network)
          setShowTxBanner(true);
          setPageReturning(false);

          // Hide banner after delay, then bring page back
          const BANNER_MS = 2500;
          const GAP_MS = 1000;
          window.setTimeout(() => {
            setShowTxBanner(false);
            window.setTimeout(() => {
              setPageReturning(true);
            }, GAP_MS);
          }, BANNER_MS);
        }}
      />
      <AnimatePresence>
        {showTxBanner && (
          <motion.div
            key="tx-banner"
            className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: -240 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <motion.span
                className="text-white font-bold text-center font-ui block"
                style={{ fontSize: "3.5rem", letterSpacing: "0.08em" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                MESSAGE
              </motion.span>
              <motion.span
                className="text-white font-bold text-center font-ui block"
                style={{ fontSize: "3.5rem", letterSpacing: "0.08em" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              >
                TRANSMITTED
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="w-full h-screen px-6 py-8"
        key={blastActive ? "contact-out" : "contact-in"}
        initial={pageReturning ? { opacity: 0, y: 40 } : { opacity: 0, y: 80 }}
        animate={pageReturning ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ pointerEvents: pageReturning ? "auto" : "none" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <motion.h1
              className="text-6xl md:text-7xl font-bold text-white mb-6 font-display"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              Contact Me
            </motion.h1>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-6"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <motion.p
              className="text-xl text-gray-300 mb-8 font-body"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
            >
              Let's discuss your next project or just have a chat about
              technology.
            </motion.p>

            <RoleChips
              value={role}
              onChange={setRole}
              options={["General", "Freelance", "Engineer"]}
            />

            {/* Preference toggle + resume */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <SegmentedToggle
                value={replyVia}
                options={["Email", "LinkedIn"]}
                onChange={(opt) => setReplyVia(opt)}
              />
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="/src/assets/Resume.pdf"
                download="Ayush_Patel_Resume.pdf"
                className="flex items-center space-x-2 px-5 py-2 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-900 transition-colors duration-300 text-base cursor-pointer"
              >
                <FaDownload className="w-5 h-5" />
                <span className="font-ui">Download Resume</span>
              </motion.a>
            </div>
          </div>

          {/* Right: Console/Form with animated border */}
          <div className="relative rounded-2xl">
            {/* Gradient border overlay */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{ height: `${Math.round(progress * 100)}%` }}
              >
                <div
                  className="h-full w-full rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(124,58,237,0.85), rgba(59,130,246,0.85))",
                  }}
                />
              </div>
            </div>

            <motion.div
              className="relative bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg overflow-hidden m-[2px]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1 font-ui">
                    Name
                  </label>
                  <motion.input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/70 border border-white/10 text-white placeholder:text-gray-400 outline-none resize-none"
                    placeholder="Your name"
                    autoComplete="name"
                    whileFocus={{
                      scale: 1.02,
                      borderColor: "rgba(147, 51, 234, 0.8)",
                      boxShadow: "0 0 20px rgba(147, 51, 234, 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {replyVia === "Email" ? (
                  <div>
                    <label className="block text-sm text-gray-300 mb-1 font-ui">
                      Email
                    </label>
                    <motion.input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/70 border border-white/10 text-white placeholder:text-gray-400 outline-none resize-none"
                      placeholder="you@example.com"
                      autoComplete="email"
                      type="email"
                      required
                      whileFocus={{
                        scale: 1.02,
                        borderColor: "rgba(59, 130, 246, 0.8)",
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm text-gray-300 mb-1 font-ui">
                      LinkedIn URL
                    </label>
                    <motion.input
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/70 border border-white/10 text-white placeholder:text-gray-400 outline-none resize-none"
                      placeholder="https://www.linkedin.com/in/your-handle"
                      type="url"
                      pattern="https?://(www\.)?linkedin\.com/.*"
                      required
                      whileFocus={{
                        scale: 1.02,
                        borderColor: "rgba(236, 72, 153, 0.8)",
                        boxShadow: "0 0 20px rgba(236, 72, 153, 0.2)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-300 mb-1 font-ui">
                    Subject
                  </label>
                  <input
                    value={subject}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/70 border border-white/10 text-white outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-300 mb-1 font-ui">
                    Message
                  </label>
                  <motion.textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/70 border border-white/10 text-white placeholder:text-gray-400 outline-none resize-none"
                    placeholder="Tell me about your idea..."
                    whileFocus={{
                      scale: 1.01,
                      borderColor: "rgba(34, 197, 94, 0.8)",
                      boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="md:col-span-2 mt-6 flex items-center justify-center">
                  <TransmitButton
                    label={submitting ? "TRANSMITTING..." : "HOLD TO TRANSMIT"}
                    onCommit={handleCommit}
                    disabled={!formValid || submitting}
                    onProgress={(v) => setProgress(v)}
                  />
                </div>

                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-8 font-body">
          <motion.button
            type="button"
            onClick={() => {
              if (window.triggerPageTransition) {
                window.triggerPageTransition("/");
              } else {
                window.location.href = "/";
              }
            }}
            className="inline-flex items-center space-x-3 px-8 py-4 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-900 transition-colors duration-300 text-lg cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-ui">Back to Home</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

export default Contact;
