import React, { useState } from "react";
import { usePageSEO } from "../hooks/usePageSEO";
import { useScrollToContact } from "../hooks/useScrollToContact";
import { STATIC_PAGE_META } from "../utils/seoDefaults";
import HeroComponent from "../components/home/HeroComponent";
import GroupedTechSection from "../components/home/GroupedTechSection";
import ProjectComponent from "../components/projects/ProjectComponent";
import ContactSection from "../components/contact/ContactSection";
import IncomingTransition from "../transitions/IncomingTransition";
import ChatButton from "../components/chat/ChatButton";
import ChatWidget from "../components/chat/ChatWidget";

import { AllTechGroups } from "../utils/TechnologyGroups";
import { WebProjectList } from "../utils/ProjectList";

function Home() {
  const featuredIds = ["web-2", "web-10", "web-11", "web-8"]; // Web Projects: Zoom Trip, StackIt, Zentry, ToDo
  const [chatOpen, setChatOpen] = useState(false);

  usePageSEO(STATIC_PAGE_META.home.title, STATIC_PAGE_META.home.description);
  useScrollToContact();

  return (
    <>
      <IncomingTransition />
      <HeroComponent />
      <GroupedTechSection
        groups={AllTechGroups}
        title="Technologies I Work With"
        description="A comprehensive overview of the tools, languages, and frameworks I use to bring ideas to life."
      />
      <ProjectComponent ids={featuredIds} projectList={WebProjectList} />
      <ContactSection />

      {/* Chat Interface */}
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
      <ChatButton open={chatOpen} onToggle={() => setChatOpen((v) => !v)} />
    </>
  );
}

export default Home;
