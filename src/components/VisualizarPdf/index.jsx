import React from "react";

const VisualizarPdf = ({ fileUrl }) => {
  return (
    <div>
      <embed
        src={fileUrl}
        type="application/pdf"
        width="100%"
        height="600px"
      />
    </div>
  );
};

export default VisualizarPdf;