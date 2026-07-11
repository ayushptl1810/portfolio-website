import { getProjects, slugify } from "./projects.js";

export { slugify };

export const STATIC_ROUTES = [
  "/",
  "/web",
  "/ai",
  "/web/about",
  "/ai/about",
  "/web/projects",
];

export function getProjectRoutes() {
  const { web, ai } = getProjects();
  return {
    web: web.map((project) => `/web/projects/${project.slug}`),
    ai: ai.map((project) => `/ai/projects/${project.slug}`),
  };
}

export function getAllRoutes() {
  const { web, ai } = getProjectRoutes();
  return [...STATIC_ROUTES, ...web, ...ai];
}
