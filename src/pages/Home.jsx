import React, { useState } from "react";
import { usePageSEO } from "../hooks/usePageSEO";
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
  const featuredIds = ["web-2", "web-10", "web-11", "web-8"]; // Web Projects: Zoom Trip, StackIt, Zentry, ToDo
  const [chatOpen, setChatOpen] = useState(false);

  usePageSEO(
    "Home",
    "Welcome to the portfolio of Ayush Patel, a Full Stack Developer specializing in premium web experiences and AI engineering."
  );

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
