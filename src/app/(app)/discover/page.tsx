"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, BookmarkPlus, Clock, MapPin } from 'lucide-react';
import { opportunities } from '@/data/opportunities';
import { defaultProfile } from '@/data/profile';
import { calculateMatchAndReadiness, MatchResult } from '@/utils/engine';
import styles from './discover.module.css';

export default function Discover() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<(typeof opportunities[0] & MatchResult)[]>([]);

  useEffect(() => {
    const scored = opportunities.map(opp => ({
      ...opp,
      ...calculateMatchAndReadiness(defaultProfile, opp)
    }));
    
    // Sort by priority score
    scored.sort((a, b) => b.priorityScore - a.priorityScore);
    
    setResults(scored);
  }, []);

  const filtered = results.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    r.organization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Discover Opportunities</h1>
          <p className={styles.subtitle}>Curated based on your skills and goals.</p>
        </div>
      </header>

      <div className={styles.searchBar}>
        <div className={styles.inputWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input 
            type="text" 
            placeholder="Search roles, companies, skills..." 
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <button className="btn btn-secondary">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className={styles.grid}>
        {filtered.map((opp, index) => {
          const daysLeft = Math.max(0, Math.floor((new Date(opp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
          
          let deadlineColor = 'var(--success)';
          if (daysLeft <= 3) deadlineColor = 'var(--danger)';
          else if (daysLeft <= 7) deadlineColor = 'var(--warning)';

          return (
            <div key={opp.id} className={`card ${styles.oppCard}`}>
              {index === 0 && search === '' && (
                <div className={styles.topBadge}>#1 Recommended For You</div>
              )}
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.oppTitle}>{opp.title}</h3>
                  <div className={styles.org}>{opp.organization}</div>
                </div>
                <button className={styles.bookmarkBtn}><BookmarkPlus size={20} /></button>
              </div>
              
              <div className={styles.metaRow}>
                <span className="badge badge-gray">{opp.category}</span>
                <span className={styles.metaItem}><MapPin size={14} /> {opp.location} ({opp.mode})</span>
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
                <div className={styles.scoreCol} style={{ flex: 2, textAlign: 'right' }}>
                  <div className={styles.deadlineInfo} style={{ color: deadlineColor }}>
                    <Clock size={14} />
                    {daysLeft === 0 ? 'Closing Today' : `${daysLeft} Days Left`}
                  </div>
                </div>
              </div>

              <div className={styles.tags}>
                {opp.matchedSkills.slice(0, 3).map(skill => (
                  <span key={skill} className={styles.skillTag}>✓ {skill}</span>
                ))}
                {opp.missingSkills.slice(0, 1).map(skill => (
                  <span key={skill.name} className={`${styles.skillTag} ${styles.skillTagMissing}`}>⚠️ {skill.name}</span>
                ))}
              </div>

              <Link href={`/opportunity/${opp.id}`} className="btn btn-outline" style={{ width: '100%' }}>
                View Opportunity
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
