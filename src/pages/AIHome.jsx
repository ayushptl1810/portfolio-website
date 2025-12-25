import React, { useState } from "react";
import AIHeroComponent from "../components/AIHeroComponent";
import TechnologiesComponent from "../components/TechnologiesComponent";
import ProjectComponent from "../components/ProjectComponent";
import ContactSection from "../components/ContactSection";
import IncomingTransition from "../transitions/IncomingTransition";
import ChatButton from "../components/ChatButton";
import ChatWidget from "../components/ChatWidget";

function AIHome() {
  const featuredIds = [2, 3, 4, 5]; // reusing same featured projects for now
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <IncomingTransition />

      {/* AI Specific Hero */}
      <AIHeroComponent />

      {/* Reused Components */}
      {/* Note: These currently use the global styles/colors. 
          In a future iteration, we could wrap them in a ThemeProvider 
          to automatically swap purple for emerald. */}
      <TechnologiesComponent />

      <ProjectComponent ids={featuredIds} />

      <ContactSection />

      {/* Chat Interface */}
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
      <ChatButton open={chatOpen} onToggle={() => setChatOpen((v) => !v)} />
    </>
  );
}

export default AIHome;
