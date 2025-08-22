import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useScrollToTop() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the previous path from sessionStorage
    const previousPath = sessionStorage.getItem("previousPath");
    const currentPath = location.pathname;

    // Don't scroll to top if going from projects to home
    if (previousPath === "/projects" && currentPath === "/") {
      // Update the previous path and return early
      sessionStorage.setItem("previousPath", currentPath);
      return;
    }

    // Scroll to top for all other route changes
    window.scrollTo({
      top: 0,
      behavior: "instant", // Use instant to avoid conflicts with page transitions
    });

    // Update the previous path
    sessionStorage.setItem("previousPath", currentPath);
  }, [location.pathname]);
}
