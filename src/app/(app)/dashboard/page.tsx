"use client";

import Link from 'next/link';
import { ArrowRight, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import styles from './dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>Good morning, Aarav 👋</h1>
        <p className={styles.subtitle}>Your opportunity intelligence at a glance.</p>
      </header>

      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Opportunities Found</div>
          <div className={styles.kpiValue}>15</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Strong Matches</div>
          <div className={styles.kpiValue} style={{ color: 'var(--success)' }}>7</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Closing Soon</div>
          <div className={styles.kpiValue} style={{ color: 'var(--danger)' }}>3</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Skill Gaps</div>
          <div className={styles.kpiValue} style={{ color: 'var(--warning)' }}>4</div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          <div className="card">
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>YOUR READINESS</h2>
              <Activity size={20} className={styles.iconInfo} />
            </div>
            <div className={styles.readinessScore}>68%</div>
            <p className={styles.readinessText}>"You're almost ready for your top opportunities."</p>
            
            <div className={styles.divider}></div>
            
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>TOP SKILL TO IMPROVE</h2>
              <TrendingUp size={20} className={styles.iconInfo} />
            </div>
            <div className={styles.skillGap}>
              <span className={styles.skillName}>SQL (Advanced)</span>
              <span className="badge badge-purple">Needed by 6 opportunities</span>
            </div>
          </div>
          
          <div className="card" style={{ marginTop: 'var(--spacing-lg)' }}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>RECOMMENDED NEXT ACTION</h2>
              <AlertTriangle size={20} style={{ color: 'var(--warning)' }} />
            </div>
            <div className={styles.actionBox}>
              <p className={styles.actionText}>"Practice SQL JOINs for 45 minutes."</p>
              <Link href="/plan" className="btn btn-outline" style={{ width: '100%' }}>View Full Action Plan</Link>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className="card">
            <h2 className={styles.cardTitle} style={{ marginBottom: 'var(--spacing-lg)' }}>YOUR TOP OPPORTUNITY</h2>
            <div className={styles.oppCard}>
              <div className={styles.oppHeader}>
                <div>
                  <h3 className={styles.oppTitle}>Data Analyst Internship</h3>
                  <p className={styles.oppOrg}>FinTech Innovations</p>
                </div>
                <span className="badge badge-green">Internship</span>
              </div>
              
              <div className={styles.oppStats}>
                <div className={styles.oppStat}>
                  <div className={styles.statLabel}>Match</div>
                  <div className={styles.statValue} style={{ color: 'var(--success)' }}>82%</div>
                </div>
                <div className={styles.oppStat}>
                  <div className={styles.statLabel}>Ready</div>
                  <div className={styles.statValue} style={{ color: 'var(--warning)' }}>68%</div>
                </div>
              </div>
              
              <Link href="/opportunity/opp-1" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>
                View Intelligence <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
