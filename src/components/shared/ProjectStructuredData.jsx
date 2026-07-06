import React from "react";

const SITE_URL = "https://www.ayush.info";

/**
 * ProjectStructuredData - JSON-LD for an individual project page.
 * Uses SoftwareSourceCode since every project here is a code repository,
 * which lets codeRepository/programmingLanguage carry real signal.
 */
const ProjectStructuredData = ({ project, path }) => {
  if (!project) return null;

  // Static hosting may serve this page via a trailing-slash redirect
  // (e.g. "/web/projects/x" -> "/web/projects/x/"); keep the schema URL
  // matching the canonical, no-trailing-slash convention used elsewhere.
  const normalizedPath = path.replace(/\/$/, "") || "/";

  const schema = {
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

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
};

export default ProjectStructuredData;
