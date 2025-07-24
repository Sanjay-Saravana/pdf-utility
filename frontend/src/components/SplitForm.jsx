import React, { useState } from 'react';
import styles from '../styles/Components.module.css';
import { FaCut } from 'react-icons/fa';
import { useBackend } from '../BackendContext';

function SplitForm({ files }) {
  const [pageRange, setPageRange] = useState('');
  const [multipleFiles, setMultipleFiles] = useState(true);
  const backendUrl = useBackend();

  const handleSplit = async () => {
    if (files.length === 0) return alert("Upload a PDF first.");
    if (!pageRange.trim()) return alert("Enter page range.");

    const formData = new FormData();
    formData.append("file", files[0].file);
    formData.append("pages", pageRange.trim());
    formData.append("multiple", multipleFiles.toString());

    try {
      const res = await fetch(`${backendUrl}/split/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Split failed");

      const blob = await res.blob();
      const filename = multipleFiles ? "split_parts.zip" : "split_part.pdf";
      const saveAs = prompt("Enter filename to save", filename);
      if (!saveAs) return;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = saveAs.endsWith(".zip") || saveAs.endsWith(".pdf")
        ? saveAs
        : saveAs + (multipleFiles ? ".zip" : ".pdf");
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to split PDF.");
    }
  };

  return (
    <div className={styles.splitForm}>
      <input
        type="text"
        placeholder="Page ranges e.g. 1-3, 5"
        value={pageRange}
        onChange={(e) => setPageRange(e.target.value)}
        className={styles.rangeInput}
      />
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={multipleFiles}
          onChange={(e) => setMultipleFiles(e.target.checked)}
        />
        Split into multiple files
      </label>
      <button className={styles.splitBtn} onClick={handleSplit}>
        <FaCut /> Split PDF
      </button>
    </div>
  );
}

export default SplitForm;
