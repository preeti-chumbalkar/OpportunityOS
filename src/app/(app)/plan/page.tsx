"use client";

import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import styles from './plan.module.css';

export default function ActionPlan() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Understand core concepts of Advanced SQL', priority: 1, completed: true, progress: 100, target: 'Data Analyst Internship' },
    { id: 2, title: 'Practice SQL JOINs and Window Functions', priority: 1, completed: false, progress: 80, target: 'Data Analyst Internship' },
    { id: 3, title: 'Build a mini data-analysis project', priority: 2, completed: false, progress: 50, target: 'Data Analyst Internship' },
    { id: 4, title: 'Improve resume/project evidence', priority: 3, completed: false, progress: 30, target: 'General Readiness' }
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        return { ...t, completed: !t.completed, progress: t.completed ? (t.progress === 100 ? 50 : t.progress) : 100 };
      }
      return t;
    }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My AI Action Plan</h1>
        <p className={styles.subtitle}>Your personalized roadmap to becoming ready.</p>
      </header>

      <div className={styles.board}>
        <div className={styles.column}>
          <h2 className={styles.colTitle}>THIS WEEK</h2>
          
          <div className={styles.taskList}>
            {tasks.map(task => (
              <div key={task.id} className={`${styles.taskCard} ${task.completed ? styles.taskCompleted : ''}`}>
                <div className={styles.taskHeader}>
                  <span className={`badge ${task.priority === 1 ? 'badge-red' : task.priority === 2 ? 'badge-orange' : 'badge-gray'}`}>
                    Priority {task.priority}
                  </span>
                  <span className={styles.target}>{task.target}</span>
                </div>
                
                <div className={styles.taskBody}>
                  <button className={styles.checkBtn} onClick={() => toggleTask(task.id)}>
                    {task.completed ? <CheckCircle2 size={24} className={styles.checked} /> : <Circle size={24} className={styles.unchecked} />}
                  </button>
                  <h3 className={styles.taskTitle}>{task.title}</h3>
                </div>
                
                <div className={styles.progressContainer}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${task.progress}%` }}></div>
                  </div>
                  <span className={styles.progressText}>{task.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
