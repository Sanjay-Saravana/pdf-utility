import React from 'react'
import styles from '../styles/Components.module.css'
import { FaArrowUp, FaArrowDown, FaLink } from 'react-icons/fa'

function MergeForm({ files, setFiles }) {
  const handlePageChange = (index, value) => {
    const updated = [...files]
    updated[index].pageRange = value
    setFiles(updated)
  }

  const moveFile = (index, direction) => {
    const updated = [...files]
    const target = index + direction
    if (target < 0 || target >= updated.length) return
    const temp = updated[target]
    updated[target] = updated[index]
    updated[index] = temp
    setFiles(updated)
  }

  const onMerge = async (files) => {
    const formData = new FormData();

    const pageMap = {};
    files.forEach((f, idx) => {
      formData.append("files", f.file);
      pageMap[idx] = f.pageRange?.trim() || "";
    });

    formData.append("pages", JSON.stringify(pageMap));

    try {
      const res = await fetch("http://127.0.0.1:8000/merge/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Merge failed");

      const blob = await res.blob();

      // === Ask user for filename ===
      const defaultFilename = "merged.pdf";
      const filename = prompt("Enter filename to save", defaultFilename);
      if (!filename) return alert("Download cancelled.");

      // === Trigger download ===
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename.endsWith(".pdf") ? filename : filename + ".pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to merge PDFs.");
    }
  };

  const handleMerge = () => {
    if (files.length < 2) return alert("Select at least 2 PDFs.")
    onMerge(files)
  }

  return (
    <div className={styles.mergeForm}>
      {files.map((f, idx) => (
        <div key={idx} className={styles.mergeFileBox}>
          <div className={styles.mergeHeader}>
            <strong>{f.file.name}</strong>
            <div className={styles.arrowButtons}>
                <button className={styles.arrowBtn} onClick={() => moveFile(idx, -1)}>
                    <FaArrowUp size={12} />
                </button>
                <button className={styles.arrowBtn} onClick={() => moveFile(idx, 1)}>
                    <FaArrowDown size={12} />
                </button>
                </div>
          </div>
          <input
            className={styles.rangeInputMerge}
            type="text"
            placeholder="e.g. 1-3,5"
            value={f.pageRange || ''}
            onChange={(e) => handlePageChange(idx, e.target.value)}
          />
        </div>
      ))}

      <button className={styles.mergeSubmit} onClick={handleMerge}>
        <FaLink style={{ marginRight: "6px" }} />
        Merge PDFs
      </button>
    </div>
  )
}

export default MergeForm
