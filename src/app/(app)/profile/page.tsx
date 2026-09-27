"use client";

import { useState, useEffect } from 'react';
import { User, Book, GraduationCap, MapPin, Target, Briefcase } from 'lucide-react';
import { Profile as ProfileType, SkillLevel } from '@/data/profile';
import { useProfile } from '@/context/ProfileContext';
import styles from './profile.module.css';

export default function Profile() {
  const { profile: globalProfile, setProfile: setGlobalProfile, resetProfile } = useProfile();
  
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('Beginner');

  useEffect(() => {
    if (globalProfile && !isEditing) {
      setProfile(globalProfile);
    }
  }, [globalProfile, isEditing]);

  const handleSave = () => {
    if (profile) {
      setGlobalProfile(profile);
      setIsEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleChange = (field: keyof ProfileType, value: any) => {
    if (!profile) return;
    setProfile(prev => prev ? ({ ...prev, [field]: value }) : prev);
  };
  
  const removeSkill = (index: number) => {
    if (!profile) return;
    setProfile(prev => prev ? {
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    } : prev);
  };
  
  const addSkill = () => {
    if (!profile || !newSkillName.trim()) return;
    setProfile(prev => prev ? {
      ...prev,
      skills: [...prev.skills, { name: newSkillName.trim(), level: newSkillLevel }]
    } : prev);
    setNewSkillName('');
  };

  if (!profile) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Your Profile</h1>
          <p className={styles.subtitle}>Keep this updated for the best AI matches.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isEditing ? (
            <button className="btn btn-primary" onClick={handleSave}>Save Profile</button>
          ) : (
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
          <button className="btn btn-outline" onClick={resetProfile} style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>Reset Profile</button>
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
                {isEditing && (
                  <button onClick={() => removeSkill(index)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', marginLeft: '0.5rem' }}>×</button>
                )}
              </div>
            ))}
            
            {isEditing && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', width: '100%', alignItems: 'center' }}>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="New skill (e.g. React)" 
                  value={newSkillName}
                  onChange={e => setNewSkillName(e.target.value)}
                  style={{ flex: 1 }}
                />
                <select className="input" value={newSkillLevel} onChange={e => setNewSkillLevel(e.target.value as SkillLevel)}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <button className="btn btn-secondary" onClick={addSkill}>Add Skill</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
