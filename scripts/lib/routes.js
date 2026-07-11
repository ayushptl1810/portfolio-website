import { getProjects, slugify } from "./projects.js";

export { slugify };

export const STATIC_ROUTES = ["/", "/about", "/projects"];

export function getProjectRoutes() {
  const { web, ai } = getProjects();
  return [...web, ...ai].map((project) => `/projects/${project.slug}`);
}

export function getAllRoutes() {
  return [...STATIC_ROUTES, ...getProjectRoutes()];
}
