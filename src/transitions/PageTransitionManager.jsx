import React from "react";
import { useNavigate } from "react-router-dom";
import { getTransitionConfig } from "./transitionTypes";
import OutgoingTransition from "./OutgoingTransition";

function PageTransitionManager({ children }) {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [transitionConfig, setTransitionConfig] = React.useState(null);

  // Function to trigger a page transition
  const triggerTransition = (targetPath) => {
    const config = getTransitionConfig(targetPath);
    setTransitionConfig({ ...config, path: targetPath });
    setIsTransitioning(true);
  };

  // Handle transition completion
  const handleTransitionComplete = () => {
    if (transitionConfig) {
      // Navigate to the target path with transition state
      navigate(transitionConfig.path, {
        state: { fromTransition: true, label: transitionConfig.label },
      });
      
      // Reset state
      setIsTransitioning(false);
      setTransitionConfig(null);
    }
  };

  // Expose trigger function globally so other components can use it
  React.useEffect(() => {
    window.triggerPageTransition = triggerTransition;
    
    return () => {
      delete window.triggerPageTransition;
    };
  }, []);

  return (
    <>
      {children}
      
      {/* Global outgoing transition */}
      <OutgoingTransition
        isActive={isTransitioning}
        label={transitionConfig?.label || "Loading..."}
        onComplete={handleTransitionComplete}
      />
    </>
  );
}

export default PageTransitionManager;
