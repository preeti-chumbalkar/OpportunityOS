"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, Rocket, Calendar, MapPin, Building, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { opportunities } from '@/data/opportunities';
import { defaultProfile } from '@/data/profile';
import { calculateMatchAndReadiness, MatchResult } from '@/utils/engine';
import styles from './opportunity.module.css';

export default function OpportunityDetail() {
  const { id } = useParams();
  const [opp, setOpp] = useState<typeof opportunities[0] | null>(null);
  const [match, setMatch] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<any>(null);

  useEffect(() => {
    const found = opportunities.find(o => o.id === id);
    if (found) {
      setOpp(found);
      setMatch(calculateMatchAndReadiness(defaultProfile, found));
    }
  }, [id]);

  const generateActionPlan = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: defaultProfile, opportunity: opp, matchResult: match })
      });
      const data = await res.json();
      setInsight(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  if (!opp || !match) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <Link href="/discover" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to Discover
      </Link>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className="card">
            <div className={styles.header}>
              <div className={styles.titleWrap}>
                <h1 className={styles.title}>{opp.title}</h1>
                <span className="badge badge-purple">{opp.category}</span>
              </div>
              <h2 className={styles.org}><Building size={16} /> {opp.organization}</h2>
              
              <div className={styles.meta}>
                <div className={styles.metaItem}><MapPin size={16} /> {opp.location} ({opp.mode})</div>
                <div className={styles.metaItem}><Calendar size={16} /> Deadline: {new Date(opp.deadline).toLocaleDateString()}</div>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Description</h3>
              <p className={styles.text}>{opp.description}</p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Eligibility</h3>
              <p className={styles.text}>{opp.eligibility}</p>
            </div>
          </div>

          <div className={`card ${styles.aiCard}`}>
            <div className={styles.aiHeader}>
              <BrainCircuit size={24} className={styles.aiIcon} />
              <h2>AI OPPORTUNITY INTELLIGENCE</h2>
            </div>
            
            <div className={styles.scoresRow}>
              <div className={styles.scoreBox}>
                <div className={styles.scoreVal} style={{ color: 'var(--success)' }}>{match.matchScore}%</div>
                <div className={styles.scoreLabel}>MATCH</div>
              </div>
              <div className={styles.scoreBox}>
                <div className={styles.scoreVal} style={{ color: 'var(--warning)' }}>{match.readinessScore}%</div>
                <div className={styles.scoreLabel}>CURRENT READINESS</div>
              </div>
              <div className={styles.scoreBox}>
                <div className={styles.scoreVal} style={{ color: 'var(--accent-primary)' }}>{match.potentialScore}%</div>
                <div className={styles.scoreLabel}>POTENTIAL</div>
              </div>
            </div>
            
            <div className={styles.skillsGrid}>
              <div className={styles.skillsCol}>
                <h4 className={styles.skillTitle}>MATCHED SKILLS</h4>
                <ul className={styles.skillList}>
                  {match.matchedSkills.map(s => (
                    <li key={s} className={styles.skillItemGood}><CheckCircle2 size={16} /> {s}</li>
                  ))}
                  {match.matchedSkills.length === 0 && <li className={styles.empty}>None</li>}
                </ul>
              </div>
              <div className={styles.skillsCol}>
                <h4 className={styles.skillTitle}>SKILL GAPS</h4>
                <ul className={styles.skillList}>
                  {match.missingSkills.map(s => (
                    <li key={s.name} className={styles.skillItemBad}><ShieldAlert size={16} /> {s.name} (Need {s.minLevel})</li>
                  ))}
                  {match.missingSkills.length === 0 && <li className={styles.empty}>None! You're fully ready.</li>}
                </ul>
              </div>
            </div>
            
            {!insight ? (
              <div className={styles.ctaBox}>
                <button 
                  className={`btn btn-primary ${styles.ctaBtn}`} 
                  onClick={generateActionPlan}
                  disabled={loading}
                >
                  <Rocket size={20} /> {loading ? 'Analyzing...' : 'IMPROVE MY MATCH 🚀'}
                </button>
                <p className={styles.ctaSub}>Generate a personalized plan to reach {match.potentialScore}% readiness.</p>
              </div>
            ) : (
              <div className={styles.insightBox}>
                <div className={styles.insightSection}>
                  <h5>WHY THIS MATCHES</h5>
                  <p>{insight.why_match}</p>
                </div>
                <div className={styles.insightSection}>
                  <h5>WHAT IS HOLDING YOU BACK?</h5>
                  <p>{insight.main_gap}</p>
                </div>
                
                <div className={styles.actionPlan}>
                  <h4>AI ACTION PLAN</h4>
                  <div className={styles.timeline}>
                    {insight.action_plan.map((step: any, i: number) => (
                      <div key={i} className={styles.timelineItem}>
                        <div className={styles.timelineDot}></div>
                        <div className={styles.timelineContent}>
                          <div className={styles.timelineDay}>{step.day}</div>
                          <div className={styles.timelineTask}>{step.task}</div>
                          <div className={styles.timelineEffort}>Est. effort: {step.effort}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className={styles.strongestStep}>
                    <strong>Your strongest next step:</strong> {insight.next_steps[0]}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
