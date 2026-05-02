import React from 'react';

/**
 * StructuredData - Component to inject JSON-LD schema into the document head
 */
const StructuredData = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ayush Patel",
    "url": "https://www.ayush.info",
    "jobTitle": "Full Stack Developer & AI Engineer",
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "IIT Madras"
      },
      {
        "@type": "CollegeOrUniversity",
        "name": "Dwarkadas J. Sanghvi College of Engineering"
      }
    ],
    "description": "Full Stack Developer and AI Engineer specialized in premium web experiences and agentic AI workflows.",
    "sameAs": [
      "https://github.com/ayushptl1810",
      "https://www.linkedin.com/in/ayushptl1810/",
      "https://www.instagram.com/ayus_hpatel05/"
    ]
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

export default StructuredData;
