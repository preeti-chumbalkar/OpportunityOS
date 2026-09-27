"use client";

import { useState, useEffect } from 'react';
import { User, Book, GraduationCap, MapPin, Target, Briefcase } from 'lucide-react';
import { defaultProfile, Profile as ProfileType } from '@/data/profile';
import styles from './profile.module.css';

export default function Profile() {
  const [profile, setProfile] = useState<ProfileType>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('oppOS_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('oppOS_profile', JSON.stringify(profile));
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field: keyof ProfileType, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Your Profile</h1>
          <p className={styles.subtitle}>Keep this updated for the best AI matches.</p>
        </div>
        <div>
          {isEditing ? (
            <button className="btn btn-primary" onClick={handleSave}>Save Profile</button>
          ) : (
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </header>

      {saved && <div className={styles.toast}>Profile saved successfully!</div>}

      <div className={styles.grid}>
        <div className="card">
          <h2 className={styles.sectionTitle}><User size={18} /> Basic Information</h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className="label">Name</label>
              <input 
                type="text" 
                className="input" 
                value={profile.name} 
                disabled={!isEditing}
                onChange={e => handleChange('name', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className="label">College</label>
              <input 
                type="text" 
                className="input" 
                value={profile.college} 
                disabled={!isEditing}
                onChange={e => handleChange('college', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className="label">Degree</label>
              <input 
                type="text" 
                className="input" 
                value={profile.degree} 
                disabled={!isEditing}
                onChange={e => handleChange('degree', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className="label">Year</label>
              <input 
                type="text" 
                className="input" 
                value={profile.year} 
                disabled={!isEditing}
                onChange={e => handleChange('year', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className={styles.sectionTitle}><Target size={18} /> Career Goals & Preferences</h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label className="label">Career Goal</label>
              <input 
                type="text" 
                className="input" 
                value={profile.careerGoal} 
                disabled={!isEditing}
                onChange={e => handleChange('careerGoal', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className="label">Preferred Location</label>
              <input 
                type="text" 
                className="input" 
                value={profile.preferredLocation} 
                disabled={!isEditing}
                onChange={e => handleChange('preferredLocation', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className="label">Preferred Mode</label>
              <select 
                className="input" 
                value={profile.preferredMode}
                disabled={!isEditing}
                onChange={e => handleChange('preferredMode', e.target.value)}
              >
                <option value="Any">Any</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h2 className={styles.sectionTitle}><Book size={18} /> Skills</h2>
          <div className={styles.skillsContainer}>
            {profile.skills.map((skill, index) => (
              <div key={index} className={styles.skillBadge}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillLevel}>{skill.level}</span>
              </div>
            ))}
            {isEditing && (
              <button className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>+ Add Skill</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
