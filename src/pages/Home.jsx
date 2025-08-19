import React from "react";
import HeroComponent from "../components/heroComponent";
import TechnologiesComponent from "../components/TechnologiesComponent";
import ProjectComponent from "../components/ProjectComponent";
import IncomingTransition from "../transitions/IncomingTransition";

function Home() {
  const featuredIds = [2, 3, 4, 5];

  return (
    <>
      <IncomingTransition />
      <HeroComponent />
      <TechnologiesComponent />
      <ProjectComponent ids={featuredIds} />
    </>
  );
}

export default Home;
