import React from 'react'
import styles from '../styles/Components.module.css'

function TaskSelector({ tasks, selectedTask, setSelectedTask }) {
  return (
    <div className={styles.taskSelector}>
      {tasks.map(task => (
        <button
          key={task.key}
          className={`${styles.taskButton} ${
            selectedTask === task.key ? styles.active : ''
          }`}
          onClick={() => setSelectedTask(task.key)}
        >
          {task.icon} {task.label}
        </button>
      ))}
    </div>
  )
}

export default TaskSelector
