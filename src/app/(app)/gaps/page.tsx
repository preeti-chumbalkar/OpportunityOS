"use client";

import Link from 'next/link';
import { Target, ArrowRight } from 'lucide-react';
import styles from './gaps.module.css';

export default function SkillGaps() {
  const gaps = [
    { name: 'SQL', current: 'Intermediate', required: 'Advanced', opportunitiesUnlocked: 6, aiRec: 'Focus on JOINs, GROUP BY, subqueries and window functions.' },
    { name: 'Power BI', current: 'None', required: 'Intermediate', opportunitiesUnlocked: 3, aiRec: 'Learn data modeling and DAX basics to create interactive dashboards.' },
    { name: 'Statistics', current: 'Beginner', required: 'Intermediate', opportunitiesUnlocked: 2, aiRec: 'Review probability distributions and hypothesis testing.' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Skill Gaps</h1>
        <p className={styles.subtitle}>Skills holding you back from top opportunities.</p>
      </header>

      <div className={styles.grid}>
        {gaps.map(gap => (
          <div key={gap.name} className={`card ${styles.gapCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.skillName}>{gap.name}</h2>
              <span className="badge badge-orange">{gap.opportunitiesUnlocked} Opportunities Unlocked</span>
            </div>
            
            <div className={styles.levelCompare}>
              <div className={styles.levelBox}>
                <div className={styles.levelLabel}>Current Level</div>
                <div className={styles.levelValue}>{gap.current}</div>
              </div>
              <ArrowRight size={20} className={styles.arrow} />
              <div className={styles.levelBox}>
                <div className={styles.levelLabel}>Required Level</div>
                <div className={styles.levelValueReq}>{gap.required}</div>
              </div>
            </div>

            <div className={styles.aiRec}>
              <div className={styles.aiLabel}><Target size={14} /> AI Recommendation</div>
              <p>{gap.aiRec}</p>
            </div>

            <Link href="/plan" className="btn btn-outline" style={{ width: '100%' }}>Generate Learning Plan</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
