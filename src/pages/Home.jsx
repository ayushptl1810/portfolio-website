import React, { useState } from "react";
import HeroComponent from "../components/home/HeroComponent";
import TechnologiesComponent from "../components/home/TechnologiesComponent";
import ProjectComponent from "../components/projects/ProjectComponent";
import ContactSection from "../components/contact/ContactSection";
import IncomingTransition from "../transitions/IncomingTransition";
import ChatButton from "../components/chat/ChatButton";
import ChatWidget from "../components/chat/ChatWidget";

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
