import React, { useState } from 'react'
import styles from './styles/App.module.css'
import { FaPlus, FaLock, FaUnlock, FaCut, FaEye, FaFilePdf } from 'react-icons/fa'
import TaskSelector from './components/TaskSelector'
import FileUpload from './components/FileUpload'
import PDFViewer from './components/PDFViewer'
import MergeForm from './components/MergeForm'
import EncryptForm from './components/EncryptForm'
import DecryptForm from './components/DecryptForm'
import SplitForm from './components/SplitForm'
import Footer from './components/Footer'
import { BackendProvider } from './BackendContext'

const tasks = [
  { key: 'merge', label: 'Merge PDF', icon: <FaPlus /> },
  { key: 'encrypt', label: 'Encrypt PDF', icon: <FaLock /> },
  { key: 'decrypt', label: 'Decrypt PDF', icon: <FaUnlock /> },
  { key: 'split', label: 'Split PDF', icon: <FaCut /> },
  { key: 'preview', label: 'Preview PDF', icon: <FaEye /> }
]

function App() {
  const [selectedTask, setSelectedTask] = useState('merge')
  const [files, setFiles] = useState([])

  const handleTaskChange = (taskKey) => {
    setSelectedTask(taskKey)
    setFiles([]) // ❗ Clear all files on task switch
  }

  

  return (
    <BackendProvider>
      <div className={styles.container}>

        <div className={styles.mainContent}>
          <h1 className={styles.title}>
          <FaFilePdf style={{ color: '#dc2626', marginRight: '10px' }} />
          PDF Utility
        </h1>

        <TaskSelector
          tasks={tasks}
          selectedTask={selectedTask}
          setSelectedTask={handleTaskChange}
        />

        <FileUpload
          files={files.map(f => f.file)}  // still send just raw Files to FileUpload
          setFiles={(uploadedFiles) => {
            const wrapped = uploadedFiles.map(file => ({ file, pageRange: '' }))
            setFiles(wrapped)
          }}
          selectedTask={selectedTask}
        />

        {selectedTask === 'preview' && <PDFViewer files={files} />}

        {selectedTask === 'merge' && (
          <MergeForm
            files={files}
            setFiles={setFiles}
          />
        )}

        {selectedTask === "encrypt" && (
          <EncryptForm files={files}/>
        )}
        {selectedTask === "decrypt" && (
        <DecryptForm file={files} />
      )}

      {selectedTask === "split" && (
        <SplitForm files={files} />
      )}
        </div>

      <Footer />

      </div>
    </BackendProvider>
  )
}

export default App
