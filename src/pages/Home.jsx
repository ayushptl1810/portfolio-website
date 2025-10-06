import React, { useState } from "react";
import HeroComponent from "../components/HeroComponent";
import TechnologiesComponent from "../components/TechnologiesComponent";
import ProjectComponent from "../components/ProjectComponent";
import ContactSection from "../components/ContactSection";
import IncomingTransition from "../transitions/IncomingTransition";
import ChatButton from "../components/ChatButton";
import ChatWidget from "../components/ChatWidget";

function Home() {
  const featuredIds = [2, 3, 4, 5];
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <IncomingTransition />
      <HeroComponent />
      <TechnologiesComponent />
      <ProjectComponent ids={featuredIds} />
      <ContactSection />

      {/* Chat Interface */}
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
      <ChatButton open={chatOpen} onToggle={() => setChatOpen((v) => !v)} />
    </>
  );
}

export default Home;
