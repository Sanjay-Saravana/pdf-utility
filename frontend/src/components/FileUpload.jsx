import React, { useRef } from 'react'
import styles from '../styles/Components.module.css'
import { FaTimes, FaFilePdf, FaUpload } from 'react-icons/fa'

function FileUpload({ files, setFiles, selectedTask }) {
  const fileInputRef = useRef()
  const allowMultiple = selectedTask === 'merge'

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)

    if (!allowMultiple && selectedFiles.length > 1) {
      alert('Only one file allowed for this task.')
      e.target.value = ''
      return
    }

    const allFiles = allowMultiple ? [...files] : []

    selectedFiles.forEach(newFile => {
      const isDuplicate = allFiles.some(
        existing => existing.name === newFile.name && existing.size === newFile.size
      )
      if (!isDuplicate) {
        allFiles.push(newFile)
      }
    })

    setFiles(allFiles)
    e.target.value = ''
  }

  const openFileDialog = () => {
    fileInputRef.current.click()
  }

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, i) => i !== indexToRemove))
  }

  return (
    <div className={styles.uploadCard}>
      <button className={styles.browseButton} onClick={openFileDialog}>
        <FaUpload style={{ marginRight: '8px' }} />
        {allowMultiple ? 'Browse PDFs' : 'Browse PDF'}
      </button>
      <input
        type="file"
        accept="application/pdf"
        multiple={allowMultiple}
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div className={styles.fileTags}>
        {files.map((file, idx) => (
          <div key={idx} className={styles.fileTag}>
            <FaFilePdf className={styles.fileIcon} />
            <span className={styles.fileName}>{file.name}</span>
            <FaTimes
              className={styles.removeIcon}
              onClick={() => removeFile(idx)}
              title="Remove"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileUpload