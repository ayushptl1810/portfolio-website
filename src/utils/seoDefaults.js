// Framework-free SEO constants — imported by both the React client code
// (usePageSEO, StructuredData) and the Node-only prerender script, so the
// two never drift out of sync.

export const SITE_URL = "https://www.ayush.info";
export const DEFAULT_TITLE = "Ayush Patel | Full Stack Developer & AI Engineer";
export const DEFAULT_DESCRIPTION =
  "Ayush Patel - Computer Science student at IIT Madras & DJ Sanghvi. Specialized in Full Stack Development, AI Agentic workflows, and GenAI.";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.webp`;
export const HOME_H1 = "Ayush Patel | Full Stack Developer & AI Engineer";

export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ayush Patel",
  url: SITE_URL,
  jobTitle: "Full Stack Developer & AI Engineer",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "IIT Madras" },
    {
      "@type": "CollegeOrUniversity",
      name: "Dwarkadas J. Sanghvi College of Engineering",
    },
  ],
  description:
    "Full Stack Developer and AI Engineer specialized in premium web experiences and agentic AI workflows.",
  sameAs: [
    "https://github.com/ayushptl1810",
    "https://www.linkedin.com/in/ayushptl1810/",
    "https://www.instagram.com/ayus_hpatel05/",
  ],
};

// Static-route titles/descriptions, matching each page's own usePageSEO()
// call exactly — kept here so the prerender script can reuse them verbatim.
export const STATIC_PAGE_META = {
  home: {
    title: "Home",
    description:
      "Welcome to the portfolio of Ayush Patel, a Full Stack Developer specializing in premium web experiences and AI engineering.",
  },
  about: {
    title: "About Me",
    description:
      "Learn more about Ayush Patel, a CS student at IIT Madras with expertise in Full Stack Development and AI.",
  },
  projects: {
    title: "Projects",
    description:
      "Explore the portfolio of Ayush Patel, featuring high-performance web applications, 3D interactive sites, and AI-driven systems.",
  },
};

export function buildProjectSchema(project, pathname) {
  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    url: `${SITE_URL}${normalizedPath}`,
    codeRepository: project.github_url,
    programmingLanguage: project.tags,
    author: {
      "@type": "Person",
      name: "Ayush Patel",
      url: SITE_URL,
    },
  };
}
