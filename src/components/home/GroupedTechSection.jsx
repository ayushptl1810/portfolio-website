import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../utils/gsapConfig";

function TechItem({ tech }) {
  return (
    <div className="tech-item group flex items-center gap-2 cursor-default">
      <span className="text-base sm:text-lg text-gray-500 transition-colors duration-300 group-hover:text-white">
        <tech.icon />
      </span>
      <span className="relative font-ui text-sm sm:text-[15px] text-gray-300 transition-colors duration-300 group-hover:text-white">
        {tech.name}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/70 transition-all duration-300 group-hover:w-full" />
      </span>
    </div>
  );
}

function GroupSection({ group }) {
  return (
    <div className="group-block">
      <div className="mb-5 flex items-baseline gap-4">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white whitespace-nowrap">
          {group.label}
        </h3>
        <span
          className={`h-px flex-1 bg-gradient-to-r ${group.accent} opacity-50`}
        />
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-3.5 sm:gap-x-6 sm:gap-y-4">
        {group.items.map((tech) => (
          <TechItem key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  );
}

function GroupedTechSection({ groups = [], title, description }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const blocks = containerRef.current.querySelectorAll(".group-block");
      blocks.forEach((block) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(block.querySelector("h3"), {
          opacity: 0,
          x: -16,
          duration: 0.45,
          ease: "power2.out",
        }).from(
          block.querySelectorAll(".tech-item"),
          {
            opacity: 0,
            y: 10,
            duration: 0.35,
            stagger: 0.03,
            ease: "power2.out",
          },
          "-=0.2"
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-full pt-6 pb-12 md:pt-10 md:pb-20 px-4 sm:px-6 md:px-8 overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 font-display">
            {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-body">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 md:gap-x-10 md:gap-y-12">
          {groups.map((group) => (
            <GroupSection key={group.label} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroupedTechSection;
