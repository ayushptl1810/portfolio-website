import React from "react";
import { PERSON_SCHEMA } from "../../utils/seoDefaults";

/**
 * StructuredData - Component to inject JSON-LD schema into the document head
 */
const StructuredData = () => {
  return (
    <script type="application/ld+json">
      {JSON.stringify(PERSON_SCHEMA)}
    </script>
  );
};

export default StructuredData;
