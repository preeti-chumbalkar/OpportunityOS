"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, Clock, MapPin } from 'lucide-react';
import { opportunities } from '@/data/opportunities';
import { calculateMatchAndReadiness, MatchResult } from '@/utils/engine';
import styles from '../discover/discover.module.css'; // Reusing discover styles
import { useProfile } from '@/context/ProfileContext';

export default function MyMatches() {
  const { profile } = useProfile();
  const [results, setResults] = useState<(typeof opportunities[0] & MatchResult)[]>([]);
  const [tab, setTab] = useState('All');

  useEffect(() => {
    if (!profile) return;
    const scored = opportunities.map(opp => ({
      ...opp,
      ...calculateMatchAndReadiness(profile, opp)
    }));
    
    // Sort by match score
    scored.sort((a, b) => b.matchScore - a.matchScore);
    
    setResults(scored);
  }, [profile]);

  const filtered = results.filter(r => {
    if (tab === 'High Match') return r.matchScore >= 80;
    if (tab === 'Almost Ready') return r.status === 'ALMOST READY';
    if (tab === 'Closing Soon') return (new Date(r.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24) <= 7;
    return true; // All
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>My Matches</h1>
          <p className={styles.subtitle}>Your personalized opportunity shortlists.</p>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {['All', 'High Match', 'Almost Ready', 'Closing Soon'].map(t => (
          <button 
            key={t}
            onClick={() => setTab(t)}
            className={`btn ${tab === t ? 'btn-primary' : 'btn-secondary'}`}
            style={{ whiteSpace: 'nowrap' }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No opportunities found in this category.
          </div>
        ) : (
          filtered.map(opp => {
            const daysLeft = Math.max(0, Math.floor((new Date(opp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
            let deadlineColor = 'var(--success)';
            if (daysLeft <= 3) deadlineColor = 'var(--danger)';
            else if (daysLeft <= 7) deadlineColor = 'var(--warning)';

            return (
              <div key={opp.id} className={`card ${styles.oppCard}`}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.oppTitle}>{opp.title}</h3>
                    <div className={styles.org}>{opp.organization}</div>
                  </div>
                  <button className={styles.bookmarkBtn} style={{ color: 'var(--accent-primary)' }}><Bookmark size={20} fill="currentColor" /></button>
                </div>
                
                <div className={styles.metaRow}>
                  <span className="badge badge-gray">{opp.category}</span>
                  <span className={styles.metaItem}><MapPin size={14} /> {opp.location}</span>
                </div>

                <div className={styles.scores}>
                  <div className={styles.scoreCol}>
                    <div className={styles.scoreVal} style={{ color: 'var(--success)' }}>{opp.matchScore}%</div>
                    <div className={styles.scoreLabel}>Match</div>
                  </div>
                  <div className={styles.scoreCol}>
                    <div className={styles.scoreVal} style={{ color: 'var(--warning)' }}>{opp.readinessScore}%</div>
                    <div className={styles.scoreLabel}>Ready</div>
                  </div>
                </div>

                <Link href={`/opportunity/${opp.id}`} className="btn btn-outline" style={{ width: '100%', marginTop: 'auto' }}>
                  View Details
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
