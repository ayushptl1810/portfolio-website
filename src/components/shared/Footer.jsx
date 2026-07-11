import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = ({ theme = "purple", basePath = "/web" }) => {
  const isEmerald = theme === "emerald";
  const accentColor = isEmerald ? "text-emerald-400" : "text-purple-400";
  // Increased opacity from /10 to /20 for better visibility
  const borderColor = isEmerald ? "border-emerald-500/20" : "border-purple-500/20";
  const hoverColor = isEmerald ? "hover:text-emerald-300" : "hover:text-purple-300";
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = () => {
    const homePath = basePath || "/web";
    const isHome =
      location.pathname === homePath || location.pathname === `${homePath}/`;

    if (isHome) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollToContact", "1");
      if (window.triggerPageTransition) {
        window.triggerPageTransition(homePath);
      } else {
        navigate(homePath);
      }
    }
  };

  return (
    <footer className={`w-full py-8 px-6 md:px-20 border-t ${borderColor} bg-transparent mt-20`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Branding & Status */}
        <div className="flex items-center space-x-4">
          <span className={`text-sm font-display font-bold tracking-tight text-white`}>
            Ayush Patel
          </span>
          <span className="h-1 w-1 bg-gray-500 rounded-full" />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            {isEmerald ? "AI Engineering" : "Full Stack Dev"}
          </span>
        </div>

        {/* Minimal Nav */}
        <div className="flex items-center space-x-8">
          <button
            type="button"
            onClick={handleContactClick}
            className={`text-xs font-ui uppercase tracking-widest text-gray-300 ${hoverColor} transition-colors cursor-pointer`}
          >
            Contact
          </button>
          <div className="flex items-center space-x-5">
            <a href="https://github.com/ayushptl1810" target="_blank" rel="noopener noreferrer" className={`text-gray-400 ${hoverColor} transition-all`}>
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/ayushptl1810" target="_blank" rel="noopener noreferrer" className={`text-gray-400 ${hoverColor} transition-all`}>
              <FaLinkedin size={18} />
            </a>
            <a href="mailto:ayushptl1810@gmail.com" className={`text-gray-400 ${hoverColor} transition-all`}>
              <FaEnvelope size={18} />
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="text-xs font-mono text-gray-500">
          © {new Date().getFullYear()} • MUMBAI, IN
        </div>
      </div>
    </footer>
  );
};

export default Footer;
