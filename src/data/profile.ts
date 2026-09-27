export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface Profile {
  name: string;
  degree: string;
  year: string;
  college: string;
  skills: Skill[];
  interests: string[];
  careerGoal: string;
  preferredCategory: string;
  preferredLocation: string;
  preferredMode: string;
}

export const defaultProfile: Profile = {
  name: 'Aarav Sharma',
  degree: 'B.Tech Computer Engineering',
  year: '3rd Year',
  college: 'Flora Institute of Technology',
  skills: [
    { name: 'Python', level: 'Advanced' },
    { name: 'SQL', level: 'Intermediate' },
    { name: 'HTML/CSS', level: 'Advanced' },
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'Git', level: 'Intermediate' },
    { name: 'Data Analysis', level: 'Intermediate' }
  ],
  interests: ['AI', 'Data Analytics', 'Software Development', 'Hackathons'],
  careerGoal: 'Data Analyst / AI Engineer',
  preferredCategory: 'Any',
  preferredLocation: 'Any',
  preferredMode: 'Any'
};
