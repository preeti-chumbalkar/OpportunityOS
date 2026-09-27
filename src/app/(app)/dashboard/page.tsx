"use client";

import Link from 'next/link';
import { ArrowRight, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import styles from './dashboard.module.css';
import { useProfile } from '@/context/ProfileContext';
import { opportunities } from '@/data/opportunities';
import { calculateMatchAndReadiness } from '@/utils/engine';

export default function Dashboard() {
  const { profile } = useProfile();
  
  if (!profile) return null;

  const scored = opportunities.map(opp => ({
    ...opp,
    ...calculateMatchAndReadiness(profile, opp)
  })).sort((a, b) => b.priorityScore - a.priorityScore);

  const topOpp = scored.length > 0 ? scored[0] : null;
  const strongMatches = scored.filter(o => o.matchScore >= 80).length;
  const closingSoon = scored.filter(o => {
    const days = (new Date(o.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days >= 0 && days <= 7;
  }).length;

  const gapCounts: Record<string, number> = {};
  scored.forEach(o => {
    o.missingSkills.forEach(s => {
      gapCounts[s.name] = (gapCounts[s.name] || 0) + 1;
    });
  });
  
  const topGap = Object.entries(gapCounts).sort((a, b) => b[1] - a[1])[0];
  const totalGaps = Object.keys(gapCounts).length;
  
  const firstName = profile.name.split(' ')[0] || 'Student';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>Good morning, {firstName} 👋</h1>
        <p className={styles.subtitle}>Your opportunity intelligence at a glance.</p>
      </header>

      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Opportunities Found</div>
          <div className={styles.kpiValue}>{scored.length}</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Strong Matches</div>
          <div className={styles.kpiValue} style={{ color: 'var(--success)' }}>{strongMatches}</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Closing Soon</div>
          <div className={styles.kpiValue} style={{ color: 'var(--danger)' }}>{closingSoon}</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Skill Gaps</div>
          <div className={styles.kpiValue} style={{ color: 'var(--warning)' }}>{totalGaps}</div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          <div className="card">
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>YOUR READINESS</h2>
              <Activity size={20} className={styles.iconInfo} />
            </div>
            <div className={styles.readinessScore}>{topOpp ? topOpp.readinessScore : 0}%</div>
            <p className={styles.readinessText}>"You're almost ready for your top opportunities."</p>
            
            <div className={styles.divider}></div>
            
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>TOP SKILL TO IMPROVE</h2>
              <TrendingUp size={20} className={styles.iconInfo} />
            </div>
            <div className={styles.skillGap}>
              <span className={styles.skillName}>{topGap ? topGap[0] : 'None!'}</span>
              <span className="badge badge-purple">{topGap ? `Needed by ${topGap[1]} opportunities` : 'You are fully ready'}</span>
            </div>
          </div>
          
          <div className="card" style={{ marginTop: 'var(--spacing-lg)' }}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>RECOMMENDED NEXT ACTION</h2>
              <AlertTriangle size={20} style={{ color: 'var(--warning)' }} />
            </div>
            <div className={styles.actionBox}>
              <p className={styles.actionText}>{topGap ? `"Focus on mastering ${topGap[0]}."` : '"Apply to your top matches!"'}</p>
              <Link href="/plan" className="btn btn-outline" style={{ width: '100%' }}>View Full Action Plan</Link>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className="card">
            <h2 className={styles.cardTitle} style={{ marginBottom: 'var(--spacing-lg)' }}>YOUR TOP OPPORTUNITY</h2>
            {topOpp ? (
              <div className={styles.oppCard}>
                <div className={styles.oppHeader}>
                  <div>
                    <h3 className={styles.oppTitle}>{topOpp.title}</h3>
                    <p className={styles.oppOrg}>{topOpp.organization}</p>
                  </div>
                  <span className="badge badge-green">{topOpp.category}</span>
                </div>
                
                <div className={styles.oppStats}>
                  <div className={styles.oppStat}>
                    <div className={styles.statLabel}>Match</div>
                    <div className={styles.statValue} style={{ color: 'var(--success)' }}>{topOpp.matchScore}%</div>
                  </div>
                  <div className={styles.oppStat}>
                    <div className={styles.statLabel}>Ready</div>
                    <div className={styles.statValue} style={{ color: 'var(--warning)' }}>{topOpp.readinessScore}%</div>
                  </div>
                </div>
                
                <Link href={`/opportunity/${topOpp.id}`} className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>
                  View Intelligence <ArrowRight size={18} />
                </Link>
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)' }}>No opportunities found. Expand your interests!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
