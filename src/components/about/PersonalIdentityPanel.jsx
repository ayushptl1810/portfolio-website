import React from "react";
import { motion } from "framer-motion";
import { FaSpotify, FaInstagram, FaWhatsapp } from "react-icons/fa";
import meImage from "../../assets/Me.jpeg";

const PersonalIdentityPanel = ({
  isActive,
  links,
  role = "Full Stack Developer",
}) => {
  return (
    <motion.div
      className="relative bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl transition-all duration-300"
      whileHover={{
        scale: 1.03,
        borderColor: "rgba(147, 51, 234, 0.5)",
        boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.25)",
      }}
    >
      {/* Holographic Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Photo Section */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            {/* Profile Photo */}
            <div className="w-41 h-41 rounded-full overflow-hidden shadow-2xl shadow-purple-500/30 border-4 border-white/20">
              <img
                src={meImage}
                alt="Ayush Patel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Identity Information */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2 font-display">
            Ayush Patel
          </h3>
          <div className="text-lg text-purple-400 mb-4 font-semibold font-display">
            {role}
          </div>

          {/* Location with icon */}
          <div className="flex items-center justify-center space-x-2 text-gray-300 mb-6 font-body">
            <div className="w-4 h-4 bg-blue-400 rounded-full" />
            <span className="font-body">Mumbai, India</span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="mt-6 flex items-center justify-center space-x-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {[
            {
              key: "spotify",
              Icon: FaSpotify,
              href: links?.spotify,
              hoverBorder: "rgba(34, 197, 94, 0.8)",
              hoverGlow: "0 0 20px rgba(34, 197, 94, 0.4)",
            },
            {
              key: "instagram",
              Icon: FaInstagram,
              href: links?.instagram,
              hoverBorder: "rgba(236, 72, 153, 0.8)",
              hoverGlow: "0 0 20px rgba(236, 72, 153, 0.4)",
            },
            {
              key: "whatsapp",
              Icon: FaWhatsapp,
              href: links?.whatsapp,
              hoverBorder: "rgba(16, 185, 129, 0.8)",
              hoverGlow: "0 0 20px rgba(16, 185, 129, 0.4)",
            },
          ].map(({ key, Icon, href, hoverBorder, hoverGlow }) => (
            <motion.a
              key={key}
              whileHover={{
                scale: href ? 1.1 : 1,
                rotate: href ? 360 : 0,
                borderColor: href ? hoverBorder : undefined,
                boxShadow: href ? hoverGlow : undefined,
              }}
              animate={{ rotate: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                rotate: { duration: 0.6, ease: "easeInOut" },
              }}
              href={href || undefined}
              target={href ? "_blank" : undefined}
              rel={href ? "noopener noreferrer" : undefined}
              aria-disabled={!href}
              className={`w-12 h-12 border-2 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                href
                  ? "border-white text-white hover:bg-white hover:text-blue-900"
                  : "border-white/30 text-white/40 cursor-not-allowed"
              }`}
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Holographic Scan Lines */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Status Particles */}
      {isActive && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              initial={{
                x: Math.random() * 200,
                y: Math.random() * 100,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 200,
                y: Math.random() * 100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PersonalIdentityPanel;
