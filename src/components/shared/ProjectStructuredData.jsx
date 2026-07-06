import React from "react";
import { buildProjectSchema } from "../../utils/seoDefaults";

/**
 * ProjectStructuredData - JSON-LD for an individual project page.
 * Uses SoftwareSourceCode since every project here is a code repository,
 * which lets codeRepository/programmingLanguage carry real signal.
 */
const ProjectStructuredData = ({ project, path }) => {
  if (!project) return null;

  const schema = buildProjectSchema(project, path);

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
};

export default ProjectStructuredData;
