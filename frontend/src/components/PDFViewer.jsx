import React, { useEffect, useState } from 'react';

function PDFViewer({ files }) {
  const [fileURL, setFileURL] = useState(null);

  useEffect(() => {
    if (files && files.length > 0 && files[0].file instanceof File) {
      const blobURL = URL.createObjectURL(files[0].file);
      setFileURL(blobURL);

      return () => URL.revokeObjectURL(blobURL);
    }
  }, [files]);

  if (!files || files.length === 0) return <p>No PDF selected.</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <iframe
        src={fileURL}
        width="100%"
        height="600px"
        title="PDF Preview"
        style={{ border: '1px solid #ccc' }}
      />
    </div>
  );
}

export default PDFViewer;
