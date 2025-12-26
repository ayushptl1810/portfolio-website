import React, { useState } from "react";
import HeroComponent from "../components/HeroComponent";
import TechnologiesComponent from "../components/TechnologiesComponent";
import ProjectComponent from "../components/ProjectComponent";
import ContactSection from "../components/ContactSection";
import IncomingTransition from "../transitions/IncomingTransition";
import ChatButton from "../components/ChatButton";
import ChatWidget from "../components/ChatWidget";

import { WebTechStack } from "../utils/TechnologyList";
import { WebProjectList } from "../utils/ProjectList";

function Home() {
  const featuredIds = ["web-2", "web-3", "web-5", "web-8"]; // Web Projects: Zoom Trip, StackIt, Zentry, ToDo
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <IncomingTransition />
      <HeroComponent />
      <TechnologiesComponent technologies={WebTechStack} />
      <ProjectComponent ids={featuredIds} projectList={WebProjectList} />
      <ContactSection />

      {/* Chat Interface */}
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
      <ChatButton open={chatOpen} onToggle={() => setChatOpen((v) => !v)} />
    </>
  );
}

export default Home;
