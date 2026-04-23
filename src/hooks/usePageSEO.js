import { useEffect } from 'react';

/**
 * usePageSEO - Hook to update document title and meta description dynamically
 */
export const usePageSEO = (title, description) => {
  useEffect(() => {
    const prevTitle = document.title;
    const defaultTitle = "Ayush Patel | Full Stack Developer & AI Engineer";
    
    document.title = title ? `${title} | Ayush Patel` : defaultTitle;
    
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);
};
