"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';
import { SkillLevel, Profile } from '@/data/profile';
import styles from './onboarding.module.css';

export default function Onboarding() {
  const router = useRouter();
  const { setProfile, loadDemoProfile } = useProfile();
  
  const [formData, setFormData] = useState<Profile>({
    name: '',
    college: '',
    degree: '',
    year: '1st Year',
    skills: [],
    interests: [],
    careerGoal: '',
    preferredCategory: 'Any',
    preferredLocation: '',
    preferredMode: 'Any'
  });

  const [skillInput, setSkillInput] = useState('');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('Beginner');
  const [interestInput, setInterestInput] = useState('');

  const handleChange = (field: keyof Profile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, { name: skillInput.trim(), level: skillLevel }]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addInterest = () => {
    if (interestInput.trim()) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interestInput.trim()]
      }));
      setInterestInput('');
    }
  };

  const removeInterest = (index: number) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    router.push('/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <h1>Create Your Profile</h1>
          <p>Tell us about yourself to get personalized opportunity matches.</p>
          <p className={styles.privacyNote}>🔒 Your profile is stored securely in your browser's local storage.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.section}>
            <h2>1. Basic Information</h2>
            <div className={styles.grid}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input required type="text" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>College / University</label>
                <input required type="text" value={formData.college} onChange={e => handleChange('college', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>Degree (e.g. B.Tech Computer Science)</label>
                <input required type="text" value={formData.degree} onChange={e => handleChange('degree', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>Year</label>
                <select value={formData.year} onChange={e => handleChange('year', e.target.value)}>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>Graduated</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>2. Skills & Expertise</h2>
            <div className={styles.addRow}>
              <input type="text" placeholder="e.g. Python, SQL" value={skillInput} onChange={e => setSkillInput(e.target.value)} />
              <select value={skillLevel} onChange={e => setSkillLevel(e.target.value as SkillLevel)}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button type="button" className="btn btn-secondary" onClick={addSkill}>Add</button>
            </div>
            <div className={styles.tagsContainer}>
              {formData.skills.map((s, i) => (
                <div key={i} className={styles.tag}>
                  {s.name} ({s.level}) <button type="button" onClick={() => removeSkill(i)}>×</button>
                </div>
              ))}
              {formData.skills.length === 0 && <span className={styles.emptyText}>No skills added yet.</span>}
            </div>
          </div>

          <div className={styles.section}>
            <h2>3. Career Goals</h2>
            <div className={styles.grid}>
              <div className={styles.formGroup}>
                <label>Career Goal (e.g. Data Scientist)</label>
                <input required type="text" value={formData.careerGoal} onChange={e => handleChange('careerGoal', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>Preferred Work Mode</label>
                <select value={formData.preferredMode} onChange={e => handleChange('preferredMode', e.target.value)}>
                  <option value="Any">Any</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Preferred Location</label>
                <input type="text" placeholder="e.g. Bangalore, Any" value={formData.preferredLocation} onChange={e => handleChange('preferredLocation', e.target.value)} />
              </div>
            </div>
            
            <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
              <label>Interests</label>
              <div className={styles.addRow}>
                <input type="text" placeholder="e.g. AI, FinTech" value={interestInput} onChange={e => setInterestInput(e.target.value)} />
                <button type="button" className="btn btn-secondary" onClick={addInterest}>Add</button>
              </div>
              <div className={styles.tagsContainer}>
                {formData.interests.map((int, i) => (
                  <div key={i} className={styles.tag}>
                    {int} <button type="button" onClick={() => removeInterest(i)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className="btn btn-outline" onClick={loadDemoProfile}>
              Try Demo Profile Instead
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem' }}>
              Create Profile & Discover Opportunities
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
