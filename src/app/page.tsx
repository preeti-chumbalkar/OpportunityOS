import Link from 'next/link';
import { ArrowRight, Zap, Target, Briefcase, GraduationCap } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>OpportunityOS</div>
        <div className={styles.navLinks}>
          <Link href="/dashboard" className="btn btn-outline">See How It Works</Link>
          <Link href="/dashboard" className="btn btn-primary">Try Demo Profile</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroBadge}>
            <span className={styles.pulse}></span>
            Opportunity Readiness Engine™
          </div>
          <h1 className={styles.title}>
            Your next opportunity is <br />
            <span className={styles.highlight}>closer than you think.</span>
          </h1>
          <p className={styles.subtitle}>
            AI-powered opportunity intelligence that helps students discover relevant opportunities — and become ready for them.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/dashboard" className="btn btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '1.1rem' }}>
              Discover My Opportunities <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        <section className={styles.previewSection}>
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <div className={styles.dots}>
                <span></span><span></span><span></span>
              </div>
              <div className={styles.cardTitle}>Data Analyst Internship - FinTech Innovations</div>
            </div>
            <div className={styles.previewBody}>
              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <div className={styles.statValue} style={{ color: 'var(--success)' }}>82%</div>
                  <div className={styles.statLabel}>Match Score</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statValue} style={{ color: 'var(--warning)' }}>68%</div>
                  <div className={styles.statLabel}>Current Readiness</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statValue} style={{ color: 'var(--accent-primary)' }}>94%</div>
                  <div className={styles.statLabel}>Potential</div>
                </div>
              </div>
              <div className={styles.gapWarning}>
                ⚠️ Skill Gap Identified: <strong>Advanced SQL</strong>. 
                <span className={styles.actionLink}> Generate Learning Plan</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.iconBox}><Zap size={24} /></div>
              <h3>DISCOVER</h3>
              <p>Find hidden internships, hackathons, and jobs tailored to your background.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconBox}><Target size={24} /></div>
              <h3>MATCH</h3>
              <p>Understand exactly why you match with our deterministic scoring algorithm.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconBox}><GraduationCap size={24} /></div>
              <h3>IMPROVE</h3>
              <p>Identify what is holding you back and generate a personalized AI action plan.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconBox}><Briefcase size={24} /></div>
              <h3>APPLY</h3>
              <p>Apply with confidence knowing you meet the real requirements.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
